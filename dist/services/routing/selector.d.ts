import { type TrustBreakdown } from '../trust/scorer.js';
import { type TrustWeightConfig } from '../trust/weights.js';
export interface SelectionPreferences {
    maxPrice?: number;
    minTrustScore?: number;
    preferredProviders?: string[];
    maxLatencyMs?: number;
}
export interface SelectionResult {
    provider: ScoredProvider;
    candidates: ScoredProvider[];
    selectionReason: string;
}
export interface ScoredProvider {
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
    trustBreakdown: TrustBreakdown;
    successRate: number;
    avgLatencyMs: number;
    uptimePercent: number;
    totalRequests: number;
    isFavorite: boolean;
    favoritePriority: number;
}
/**
 * Discover and score providers for a category.
 * Uses Redis cache on the hot path, falls back to DB + live scoring.
 */
export declare function discoverAndScore(category?: string, options?: {
    limit?: number;
    minTrustScore?: number;
    maxPrice?: number;
    weights?: Partial<TrustWeightConfig>;
}): Promise<ScoredProvider[]>;
/**
 * Full provider selection for routing.
 * Applies trust scoring, preferences, favorites boost, and returns the best pick.
 */
export declare function selectProvider(category: string, agentId: string, accountId: string, preferences?: SelectionPreferences, customWeights?: Partial<TrustWeightConfig>): Promise<SelectionResult | null>;
//# sourceMappingURL=selector.d.ts.map