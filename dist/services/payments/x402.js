import { parseUnits } from 'viem';
import { publicClient } from '../chain/client.js';
import { getAgentWalletClient } from './wallets.js';
import { ERC20_ABI } from '../chain/abis.js';
import { USDC_ADDRESS, FABRIC_FEE_WALLET } from '../../config.js';
import { calculateCosts } from './fees.js';
const USDC_DECIMALS = 6;
/**
 * Execute the x402 payment flow:
 *
 * 1. Call provider endpoint → expect 402 Payment Required
 * 2. Parse payment details from 402 response
 * 3. Execute USDC transfer to provider on Base L2
 * 4. Execute routing fee transfer to Fabric fee wallet
 * 5. Re-call provider with payment proof → expect 200 OK
 * 6. Return result + payment receipt
 *
 * If the provider doesn't support x402 (returns 200 immediately),
 * we still record the payment as a direct USDC transfer.
 */
export async function executeX402(request) {
    const startTime = Date.now();
    const walletClient = await getAgentWalletClient(request.agentId);
    if (!walletClient?.account) {
        throw new Error(`No managed wallet for agent ${request.agentId}`);
    }
    const fromAddress = walletClient.account.address;
    // ─── Calculate costs ───
    const costs = await calculateCosts(request.price, request.routingFeePct, true);
    // ─── Step 1: Initial request (expect 402) ───
    let initialResponse;
    try {
        initialResponse = await fetch(request.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Fabric-Agent': request.agentId,
                'X-Fabric-Wallet': fromAddress,
            },
            body: JSON.stringify(request.payload),
            signal: AbortSignal.timeout(10_000),
        });
    }
    catch (err) {
        throw new Error(`Provider unreachable: ${err.message}`);
    }
    // ─── If provider returns 200 directly (no x402), handle as pre-paid ───
    if (initialResponse.ok) {
        const result = await safeParseJson(initialResponse);
        // Still execute payment (provider trusts us to pay)
        const paymentResult = await executePayment(request.agentId, walletClient, request.payTo, costs);
        return {
            result,
            httpStatus: 200,
            payment: {
                providerTxHash: paymentResult.providerTxHash,
                feeTxHash: paymentResult.feeTxHash,
                costs,
                from: fromAddress,
                chain: 'base',
                settled: paymentResult.settled,
            },
            latencyMs: Date.now() - startTime,
        };
    }
    // ─── Step 2: Parse 402 Payment Required ───
    if (initialResponse.status !== 402) {
        const errorText = await initialResponse.text().catch(() => 'Unknown error');
        throw new Error(`Provider returned ${initialResponse.status}: ${errorText.slice(0, 200)}`);
    }
    // Parse x402 payment requirements from response headers
    const requiredAmount = parseFloat(initialResponse.headers.get('X-Payment-Amount') || String(request.price));
    const requiredToken = initialResponse.headers.get('X-Payment-Token') || USDC_ADDRESS;
    const requiredChain = initialResponse.headers.get('X-Payment-Chain') || 'base';
    const paymentId = initialResponse.headers.get('X-Payment-Id') || '';
    // Verify provider isn't overcharging
    if (requiredAmount > request.price * 1.05) {
        throw new Error(`Provider demands $${requiredAmount} but listed price is $${request.price}`);
    }
    // ─── Step 3 & 4: Execute payment ───
    const paymentResult = await executePayment(request.agentId, walletClient, request.payTo, costs);
    if (!paymentResult.settled) {
        throw new Error('Payment failed — USDC transfer did not confirm');
    }
    // ─── Step 5: Re-call provider with payment proof ───
    let paidResponse;
    try {
        paidResponse = await fetch(request.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Fabric-Agent': request.agentId,
                'X-Fabric-Wallet': fromAddress,
                'X-Payment-Proof': paymentResult.providerTxHash || '',
                'X-Payment-Id': paymentId,
                'X-Payment-Chain': requiredChain,
            },
            body: JSON.stringify(request.payload),
            signal: AbortSignal.timeout(30_000), // longer timeout for execution
        });
    }
    catch (err) {
        // Payment went through but provider failed to respond
        // The payment is settled — this is a provider-side failure
        throw new Error(`Provider failed after payment (tx: ${paymentResult.providerTxHash}): ${err.message}`);
    }
    if (!paidResponse.ok) {
        const errorText = await paidResponse.text().catch(() => 'Unknown error');
        throw new Error(`Provider rejected paid request (${paidResponse.status}): ${errorText.slice(0, 200)}`);
    }
    const result = await safeParseJson(paidResponse);
    return {
        result,
        httpStatus: paidResponse.status,
        payment: {
            providerTxHash: paymentResult.providerTxHash,
            feeTxHash: paymentResult.feeTxHash,
            costs,
            from: fromAddress,
            chain: 'base',
            settled: true,
        },
        latencyMs: Date.now() - startTime,
    };
}
// ─── Internal helpers ───
async function executePayment(agentId, walletClient, providerAddress, costs) {
    let providerTxHash = null;
    let feeTxHash = null;
    let settled = false;
    try {
        // Transfer to provider
        const providerAmount = parseUnits(costs.providerCost.toFixed(USDC_DECIMALS), USDC_DECIMALS);
        providerTxHash = await walletClient.writeContract({
            address: USDC_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [providerAddress, providerAmount],
        });
        const receipt = await publicClient.waitForTransactionReceipt({
            hash: providerTxHash,
            confirmations: 1,
        });
        settled = receipt.status === 'success';
        // Collect routing fee (non-blocking, non-fatal)
        if (settled &&
            costs.routingFee >= 0.000001 &&
            FABRIC_FEE_WALLET !== '0x0000000000000000000000000000000000000000') {
            try {
                const feeAmount = parseUnits(costs.routingFee.toFixed(USDC_DECIMALS), USDC_DECIMALS);
                feeTxHash = await walletClient.writeContract({
                    address: USDC_ADDRESS,
                    abi: ERC20_ABI,
                    functionName: 'transfer',
                    args: [FABRIC_FEE_WALLET, feeAmount],
                });
                await publicClient.waitForTransactionReceipt({
                    hash: feeTxHash,
                    confirmations: 1,
                });
            }
            catch (err) {
                console.error('[x402] Fee collection failed:', err.message);
                // Don't fail the route — provider already paid
            }
        }
    }
    catch (err) {
        console.error('[x402] Payment failed:', err.message);
    }
    return { providerTxHash, feeTxHash, settled };
}
async function safeParseJson(response) {
    const text = await response.text();
    try {
        return JSON.parse(text);
    }
    catch {
        return { _raw: text };
    }
}
//# sourceMappingURL=x402.js.map