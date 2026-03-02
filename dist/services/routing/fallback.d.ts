import type { ScoredProvider } from './selector.js';
export type CircuitState = 'closed' | 'open' | 'half-open';
interface CircuitInfo {
    state: CircuitState;
    failures: number;
    lastFailure: number | null;
}
/**
 * Check if a provider's circuit breaker is open (i.e. should be skipped).
 */
export declare function isCircuitOpen(providerId: string): Promise<boolean>;
/**
 * Record a failure for a provider. Opens circuit after threshold.
 */
export declare function recordFailure(providerId: string): Promise<void>;
/**
 * Record a success. Resets circuit to closed.
 */
export declare function recordSuccess(providerId: string): Promise<void>;
/**
 * Get circuit breaker info for debugging/evaluate endpoint.
 */
export declare function getCircuitInfo(providerId: string): Promise<CircuitInfo>;
/**
 * Filter out providers with open circuits, returning healthy candidates in order.
 * If all circuits are open, returns the original list (degraded mode).
 */
export declare function filterHealthy(providers: ScoredProvider[]): Promise<ScoredProvider[]>;
/**
 * Select the next fallback from a ranked list, skipping tripped circuits.
 * Returns null if no viable fallback exists.
 */
export declare function selectFallback(candidates: ScoredProvider[], excludeIds: Set<string>): Promise<ScoredProvider | null>;
export {};
//# sourceMappingURL=fallback.d.ts.map