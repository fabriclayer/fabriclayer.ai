/**
 * Simple in-memory metrics for Phase 1.
 * TODO: Replace with prom-client for Prometheus export in Phase 6.
 */
export declare function increment(name: string, value?: number): void;
export declare function observe(name: string, value: number): void;
export declare function getCounter(name: string): number;
export declare function getHistogram(name: string): {
    count: number;
    avg: number;
    p99: number;
};
export declare function getAllMetrics(): Record<string, any>;
export declare function getCounters(): Record<string, number>;
export declare function getAll(): Record<string, any>;
//# sourceMappingURL=metrics.d.ts.map