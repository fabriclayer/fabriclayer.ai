import { executeX402 } from '../payments/x402.js';
import { transferUsdc } from '../payments/usdc.js';
import { calculateCosts } from '../payments/fees.js';
import { hasSufficientBalance, getAgentWalletAddress } from '../payments/wallets.js';
import { FABRIC_FEE_WALLET } from '../../config.js';
/**
 * Execute a request against a provider.
 *
 * Tries in order:
 * 1. x402 flow (if agent has wallet + balance)
 * 2. Direct USDC transfer + HTTP call (fallback)
 * 3. Mock execution (no wallet / no balance / testnet)
 */
export async function executeProvider(req) {
    const startTime = Date.now();
    // Check if agent has a wallet
    const walletAddress = await getAgentWalletAddress(req.agentId);
    if (walletAddress) {
        // Check balance
        const balanceCheck = await hasSufficientBalance(req.agentId, req.provider.basePrice * 1.01 // 1% buffer for gas
        );
        if (balanceCheck.sufficient) {
            // ─── Try x402 flow ───
            try {
                const x402Result = await executeX402({
                    url: req.provider.endpoint,
                    payTo: req.provider.walletAddress,
                    price: req.provider.basePrice,
                    agentId: req.agentId,
                    routingFeePct: req.routingFeePct,
                    payload: req.input,
                });
                return {
                    result: x402Result.result,
                    httpStatus: x402Result.httpStatus,
                    payment: {
                        ...x402Result.payment,
                        mode: 'x402',
                    },
                    latencyMs: Date.now() - startTime,
                };
            }
            catch (err) {
                // x402 failed — try direct payment
                console.warn('[Executor] x402 failed, trying direct:', err.message);
                try {
                    return await executeDirectPayment(req, walletAddress, startTime);
                }
                catch (directErr) {
                    // Both failed — fall through to mock
                    console.warn('[Executor] Direct payment failed:', directErr.message);
                }
            }
        }
    }
    // ─── Mock execution (no wallet, insufficient balance, or payment failed) ───
    return executeMock(req, walletAddress, startTime);
}
/**
 * Direct payment: transfer USDC first, then call provider with proof.
 */
async function executeDirectPayment(req, walletAddress, startTime) {
    const costs = await calculateCosts(req.provider.basePrice, req.routingFeePct);
    // Transfer to provider
    const providerTx = await transferUsdc(req.agentId, req.provider.walletAddress, costs.providerCost);
    // Collect routing fee
    let feeTxHash = null;
    if (costs.routingFee >= 0.000001 &&
        FABRIC_FEE_WALLET !== '0x0000000000000000000000000000000000000000') {
        try {
            const feeTx = await transferUsdc(req.agentId, FABRIC_FEE_WALLET, costs.routingFee);
            feeTxHash = feeTx.txHash;
        }
        catch { }
    }
    // Call provider with payment proof
    let result = null;
    let httpStatus = 0;
    try {
        const response = await fetch(req.provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Fabric-Agent': req.agentId,
                'X-Fabric-Wallet': walletAddress,
                'X-Payment-Proof': providerTx.txHash,
                'X-Payment-Chain': 'base',
            },
            body: JSON.stringify(req.input),
            signal: AbortSignal.timeout(30_000),
        });
        httpStatus = response.status;
        const text = await response.text();
        try {
            result = JSON.parse(text);
        }
        catch {
            result = { _raw: text };
        }
    }
    catch (err) {
        // Provider call failed but payment settled
        throw new Error(`Provider unreachable after payment (tx: ${providerTx.txHash}): ${err.message}`);
    }
    return {
        result,
        httpStatus,
        payment: {
            providerTxHash: providerTx.txHash,
            feeTxHash,
            costs,
            from: walletAddress,
            chain: 'base',
            settled: providerTx.confirmed,
            mode: 'direct',
        },
        latencyMs: Date.now() - startTime,
    };
}
/**
 * Mock execution — used when no wallet or insufficient balance.
 * Records the cost but doesn't settle on-chain.
 */
async function executeMock(req, walletAddress, startTime) {
    const costs = await calculateCosts(req.provider.basePrice, req.routingFeePct);
    return {
        result: {
            _mock: true,
            message: `Mock response from ${req.provider.name}`,
            note: walletAddress
                ? 'Insufficient USDC balance for on-chain settlement'
                : 'No managed wallet — create one via POST /v1/wallets',
            input: req.input,
        },
        httpStatus: 200,
        payment: {
            providerTxHash: null,
            feeTxHash: null,
            costs,
            from: walletAddress,
            chain: 'base',
            settled: false,
            mode: 'mock',
        },
        latencyMs: Date.now() - startTime,
    };
}
//# sourceMappingURL=executor.js.map