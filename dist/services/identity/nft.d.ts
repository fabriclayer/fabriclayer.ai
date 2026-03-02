export interface AgentIdentity {
    tokenId: string;
    owner: string;
    agentName: string;
    registryId: string;
    createdAt: number;
}
/**
 * Mint a new agent identity NFT.
 * Called when a new agent is registered with Fabric.
 * Returns the token ID or null if minting isn't available.
 */
export declare function mintAgentIdentity(toAddress: `0x${string}`, agentName: string, registryId: string): Promise<{
    tokenId: string;
    txHash: string;
} | null>;
/**
 * Read agent data from an identity NFT.
 */
export declare function getAgentIdentity(tokenId: string): Promise<AgentIdentity | null>;
/**
 * Get total number of agent identities minted.
 */
export declare function getTotalIdentities(): Promise<number>;
//# sourceMappingURL=nft.d.ts.map