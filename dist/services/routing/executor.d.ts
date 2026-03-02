import { type CostBreakdown } from '../payments/fees.js';
import type { ScoredProvider } from '../routing/selector.js';
import type { Hash } from 'viem';
export interface ExecutionRequest {
    agentId: string;
    provider: ScoredProvider;
    input: Record<string, unknown>;
    routingFeePct: number;
}
export interface ExecutionResult {
    result: unknown;
    httpStatus: number;
    payment: {
        providerTxHash: Hash | null;
        feeTxHash: Hash | null;
        costs: CostBreakdown;
        from: `0x${string}` | null;
        chain: 'base' | 'base-sepolia';
        settled: boolean;
        mode: 'x402' | 'direct' | 'mock';
    };
    latencyMs: number;
}
/**
 * Execute a request against a provider.
 *
 * Tries in order:
 * 1. x402 flow (if agent has wallet + balance)
 * 2. Direct USDC transfer + HTTP call (fallback)
 * 3. Mock execution (no wallet / no balance / testnet)
 */
export declare function executeProvider(req: ExecutionRequest): Promise<ExecutionResult>;
//# sourceMappingURL=executor.d.ts.map