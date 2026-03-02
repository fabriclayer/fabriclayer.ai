export interface TrustWeightConfig {
    successRate: number;
    latency: number;
    uptime: number;
    feedback: number;
    onChainRep: number;
    longevity: number;
    volumeConsistency: number;
}
export declare const DEFAULT_WEIGHTS: TrustWeightConfig;
/**
 * Validate and normalise custom weights.
 * All values must be >= 0 and sum should be > 0.
 */
export declare function normaliseWeights(custom: Partial<TrustWeightConfig>): TrustWeightConfig;
//# sourceMappingURL=weights.d.ts.map