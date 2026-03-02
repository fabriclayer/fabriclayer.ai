/**
 * Register an agent on-chain via FabricRegistry.registerAgent().
 * Uses the operator wallet to submit the transaction.
 * Returns the on-chain agentId and transaction hash.
 */
export declare function registerAgentOnChain(name: string, category: string, endpoint: string): Promise<{
    onChainId: bigint;
    txHash: string;
} | null>;
/**
 * Update on-chain reputation for a single agent.
 */
export declare function updateReputationOnChain(agentId: bigint, score: number, additionalInteractions: number): Promise<string | null>;
/**
 * Batch update reputation for multiple agents in one tx.
 */
export declare function batchUpdateReputationOnChain(updates: {
    agentId: bigint;
    score: number;
    interactions: number;
}[]): Promise<string | null>;
/**
 * Mint an identity NFT for a registered agent.
 */
export declare function mintIdentityOnChain(toAddress: `0x${string}`, registryId: bigint): Promise<{
    tokenId: bigint;
    txHash: string;
} | null>;
/**
 * Read total registered agents from chain.
 */
export declare function getTotalAgentsOnChain(): Promise<number | null>;
//# sourceMappingURL=writer.d.ts.map