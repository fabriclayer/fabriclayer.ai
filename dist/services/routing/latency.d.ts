/**
 * Record a latency observation for a provider.
 * Updates both the Redis rolling window and the Postgres cached metric.
 */
export declare function recordLatency(providerId: string, category: string, latencyMs: number, success: boolean): Promise<void>;
/**
 * Get rolling latency stats from Redis.
 */
export declare function getLatencyStats(providerId: string): Promise<{
    count: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
} | null>;
//# sourceMappingURL=latency.d.ts.map