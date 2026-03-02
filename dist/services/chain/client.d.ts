import { type PublicClient, type WalletClient, type Chain, type Account } from 'viem';
declare const chain: Chain;
export declare const publicClient: PublicClient;
declare let operatorAccount: Account | null;
declare let operatorWalletClient: WalletClient | null;
export { operatorAccount, operatorWalletClient };
/**
 * Create a wallet client for an agent's managed wallet.
 * Used for signing x402 payments on behalf of an agent.
 */
export declare function createAgentWalletClient(privateKey: `0x${string}`): WalletClient;
/**
 * Get current block number.
 */
export declare function getBlockNumber(): Promise<bigint>;
/**
 * Get current gas price in gwei.
 */
export declare function getGasPrice(): Promise<bigint>;
/**
 * Estimate gas cost in USD for a transaction.
 * Base L2 gas is very cheap — typically ~$0.00025.
 */
export declare function estimateGasCostUsd(gasUnits?: bigint): Promise<number>;
export { chain };
//# sourceMappingURL=client.d.ts.map