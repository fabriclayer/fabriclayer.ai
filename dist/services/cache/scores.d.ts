export interface CachedScoredProvider {
    id: string;
    registryId: string;
    name: string;
    category: string;
    endpoint: string;
    pricingModel: string;
    basePrice: number;
    currency: string;
    walletAddress: string | null;
    trustScore: number;
    compositeScore: number;
    trustBreakdown: any;
    successRate: number;
    avgLatencyMs: number;
    uptimePercent: number;
    totalRequests: number;
    isFavorite: boolean;
    favoritePriority: number;
}
/**
 * Get cached scored providers for a category.
 * Returns null on miss or Redis failure.
 */
export declare function getCachedScores(category: string): Promise<CachedScoredProvider[] | null>;
/**
 * Store scored providers in cache with TTL.
 */
export declare function setCachedScores(category: string, providers: CachedScoredProvider[]): Promise<void>;
/**
 * Invalidate cache for a category (e.g. after new feedback or latency update).
 */
export declare function invalidateScores(category: string): Promise<void>;
/**
 * Invalidate ALL category caches (e.g. after bulk update).
 */
export declare function invalidateAllScores(): Promise<void>;
//# sourceMappingURL=scores.d.ts.map