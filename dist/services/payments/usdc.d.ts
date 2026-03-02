import { type Hash } from 'viem';
export interface TransferResult {
    txHash: Hash;
    from: `0x${string}`;
    to: `0x${string}`;
    amount: number;
    amountRaw: bigint;
    confirmed: boolean;
    blockNumber: bigint;
    gasUsed: bigint;
}
/**
 * Transfer USDC from an agent's managed wallet to a destination.
 * This is the core payment primitive used by x402 and direct transfers.
 */
export declare function transferUsdc(agentId: string, to: `0x${string}`, amountUsd: number): Promise<TransferResult>;
/**
 * Execute a split payment: provider gets their cut, Fabric gets the routing fee.
 * Both transfers happen in sequence (could be batched via multicall in future).
 */
export declare function splitPayment(agentId: string, providerAddress: `0x${string}`, feeAddress: `0x${string}`, providerAmount: number, routingFee: number): Promise<{
    providerTx: TransferResult;
    feeTx: TransferResult | null;
}>;
/**
 * Check USDC allowance and approve if needed.
 * Used when Fabric needs to spend USDC on behalf of an agent via transferFrom.
 */
export declare function ensureAllowance(agentId: string, spender: `0x${string}`, amount: number): Promise<Hash | null>;
//# sourceMappingURL=usdc.d.ts.map