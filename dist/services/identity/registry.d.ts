export interface OnChainAgent {
    id: number;
    owner: string;
    endpoint: string;
    category: string;
    name: string;
    reputationScore: number;
    totalInteractions: number;
    registeredAt: number;
    active: boolean;
}
/**
 * Read a single agent from the ERC-8004 registry.
 * Falls back to local DB if contract not deployed.
 */
export declare function getRegistryAgent(agentId: number | string): Promise<OnChainAgent | null>;
/**
 * Read agents by category from registry.
 */
export declare function getRegistryAgentsByCategory(category: string, offset?: number, limit?: number): Promise<OnChainAgent[]>;
/**
 * Read on-chain reputation for a provider.
 */
export declare function getOnChainReputation(agentId: number): Promise<{
    score: number;
    interactions: number;
    lastUpdated: number;
} | null>;
/**
 * Get total agents registered on-chain.
 */
export declare function getTotalRegisteredAgents(): Promise<number>;
//# sourceMappingURL=registry.d.ts.map