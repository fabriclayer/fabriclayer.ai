/**
 * Queue a provider reputation update.
 */
export declare function queueReputationUpdate(providerId: string, onChainId: number | null, feedbackScore: number): Promise<void>;
/**
 * Flush the reputation queue — update DB + on-chain.
 */
export declare function flushReputationBatch(): Promise<{
    processed: number;
    txHash: string | null;
}>;
/**
 * Start the periodic batch flush timer.
 */
export declare function startReputationBatcher(): void;
/**
 * Stop the periodic batch flush timer.
 */
export declare function stopReputationBatcher(): void;
/**
 * Get current queue depth (for monitoring).
 */
export declare function getQueueDepth(): Promise<number>;
//# sourceMappingURL=reputation.d.ts.map