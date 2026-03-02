import { type OnChainAgent } from './registry.js';
export interface ResolvedIdentity {
    agentId: string;
    name: string;
    walletAddress: string | null;
    identityNft: string | null;
    registryAgent: OnChainAgent | null;
}
/**
 * Resolve an agent's full identity from DB + on-chain sources.
 */
export declare function resolveAgent(agentId: string): Promise<ResolvedIdentity | null>;
/**
 * Resolve a wallet address to an agent.
 */
export declare function resolveByAddress(walletAddress: string): Promise<ResolvedIdentity | null>;
//# sourceMappingURL=resolver.d.ts.map