import { publicClient, operatorWalletClient, operatorAccount, chain } from '../chain/client.js';
import { FABRIC_IDENTITY_ABI } from '../chain/abis.js';
import { FABRIC_IDENTITY_ADDRESS } from '../../config.js';
/**
 * Mint a new agent identity NFT.
 * Called when a new agent is registered with Fabric.
 * Returns the token ID or null if minting isn't available.
 */
export async function mintAgentIdentity(toAddress, agentName, registryId) {
    if (!operatorWalletClient || !operatorAccount) {
        return null; // No operator key — skip minting
    }
    if (FABRIC_IDENTITY_ADDRESS === '0x0000000000000000000000000000000000000000') {
        return null; // Contract not deployed
    }
    try {
        // Convert registryId string to uint256 for on-chain call
        const registryIdBigInt = registryId.startsWith('0x')
            ? BigInt(registryId)
            : BigInt(`0x${Buffer.from(registryId).toString('hex')}`);
        const txHash = await operatorWalletClient.writeContract({
            chain,
            account: operatorAccount,
            address: FABRIC_IDENTITY_ADDRESS,
            abi: FABRIC_IDENTITY_ABI,
            functionName: 'mintIdentity',
            args: [toAddress, registryIdBigInt],
        });
        // Wait for confirmation
        const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
            confirmations: 1,
        });
        // Extract token ID from logs (Transfer event)
        // The token ID is the 4th topic in the Transfer event for ERC-721
        const transferLog = receipt.logs.find((log) => log.address.toLowerCase() === FABRIC_IDENTITY_ADDRESS.toLowerCase());
        const tokenId = transferLog?.topics[3] ?? '0x0';
        return {
            tokenId: BigInt(tokenId).toString(),
            txHash,
        };
    }
    catch (err) {
        console.error('[Identity] Failed to mint agent NFT:', err.message);
        return null;
    }
}
/**
 * Read agent data from an identity NFT.
 */
export async function getAgentIdentity(tokenId) {
    if (FABRIC_IDENTITY_ADDRESS === '0x0000000000000000000000000000000000000000') {
        return null;
    }
    try {
        const registryId = (await publicClient.readContract({
            address: FABRIC_IDENTITY_ADDRESS,
            abi: FABRIC_IDENTITY_ABI,
            functionName: 'registryIdOf',
            args: [BigInt(tokenId)],
        }));
        const owner = (await publicClient.readContract({
            address: FABRIC_IDENTITY_ADDRESS,
            abi: FABRIC_IDENTITY_ABI,
            functionName: 'ownerOf',
            args: [BigInt(tokenId)],
        }));
        return {
            tokenId,
            owner,
            agentName: '',
            registryId: `0x${registryId.toString(16)}`,
            createdAt: 0,
        };
    }
    catch {
        return null;
    }
}
/**
 * Get total number of agent identities minted.
 */
export async function getTotalIdentities() {
    if (FABRIC_IDENTITY_ADDRESS === '0x0000000000000000000000000000000000000000') {
        return 0;
    }
    try {
        const total = (await publicClient.readContract({
            address: FABRIC_IDENTITY_ADDRESS,
            abi: FABRIC_IDENTITY_ABI,
            functionName: 'totalSupply',
        }));
        return Number(total);
    }
    catch {
        return 0;
    }
}
//# sourceMappingURL=nft.js.map