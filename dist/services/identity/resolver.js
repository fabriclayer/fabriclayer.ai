import { prisma } from '../../db/client.js';
import { getAgentIdentity } from './nft.js';
import { getRegistryAgent } from './registry.js';
/**
 * Resolve an agent's full identity from DB + on-chain sources.
 */
export async function resolveAgent(agentId) {
    const agent = await prisma.agent.findUnique({
        where: { id: agentId },
    });
    if (!agent)
        return null;
    // Try to fetch on-chain identity if NFT exists
    let registryAgent = null;
    if (agent.identityNft) {
        const nftData = await getAgentIdentity(agent.identityNft);
        if (nftData?.registryId) {
            registryAgent = await getRegistryAgent(nftData.registryId);
        }
    }
    return {
        agentId: agent.id,
        name: agent.name,
        walletAddress: agent.walletAddress,
        identityNft: agent.identityNft,
        registryAgent,
    };
}
/**
 * Resolve a wallet address to an agent.
 */
export async function resolveByAddress(walletAddress) {
    const agent = await prisma.agent.findFirst({
        where: { walletAddress },
    });
    if (!agent)
        return null;
    return resolveAgent(agent.id);
}
//# sourceMappingURL=resolver.js.map