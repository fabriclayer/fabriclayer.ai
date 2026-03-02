import { type Hash } from 'viem';
import { type CostBreakdown } from './fees.js';
export interface X402PaymentRequest {
    /** Provider's endpoint URL */
    url: string;
    /** Provider's wallet address for payment */
    payTo: `0x${string}`;
    /** Provider's price in USD */
    price: number;
    /** Agent making the payment */
    agentId: string;
    /** Account's routing fee percentage */
    routingFeePct: number;
    /** Request payload to send to provider */
    payload: Record<string, unknown>;
}
export interface X402PaymentResult {
    /** Provider's response data */
    result: unknown;
    /** HTTP status from provider */
    httpStatus: number;
    /** Payment details */
    payment: {
        providerTxHash: Hash | null;
        feeTxHash: Hash | null;
        costs: CostBreakdown;
        from: `0x${string}`;
        chain: 'base' | 'base-sepolia';
        settled: boolean;
    };
    /** Total execution time including payment */
    latencyMs: number;
}
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
export declare function executeX402(request: X402PaymentRequest): Promise<X402PaymentResult>;
//# sourceMappingURL=x402.d.ts.map