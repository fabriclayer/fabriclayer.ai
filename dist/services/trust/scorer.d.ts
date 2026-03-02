import { type TrustWeightConfig } from './weights.js';
interface ProviderMetrics {
    trustScore: number;
    successRate: number;
    avgLatencyMs: number;
    uptimePercent: number;
    totalRequests: number;
    lastSeen: Date | null;
    createdAt: Date;
}
export interface TrustBreakdown {
    total: number;
    signals: Record<string, {
        weight: number;
        raw: number;
        weighted: number;
    }>;
    penalties: string[];
}
/**
 * Compute a trust score from 0–5 based on weighted signals.
 *
 * TrustScore = Σ(weight_i × normalised_signal_i) / Σ(weight_i) × 5
 */
export declare function computeTrustScore(provider: ProviderMetrics, weights?: TrustWeightConfig, feedbackAvg?: number): TrustBreakdown;
export {};
//# sourceMappingURL=scorer.d.ts.map