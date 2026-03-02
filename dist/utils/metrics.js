/**
 * Simple in-memory metrics for Phase 1.
 * TODO: Replace with prom-client for Prometheus export in Phase 6.
 */
const counters = {};
const histograms = {};
export function increment(name, value = 1) {
    counters[name] = (counters[name] || 0) + value;
}
export function observe(name, value) {
    if (!histograms[name])
        histograms[name] = [];
    histograms[name].push(value);
    // Keep last 1000 observations
    if (histograms[name].length > 1000) {
        histograms[name] = histograms[name].slice(-1000);
    }
}
export function getCounter(name) {
    return counters[name] || 0;
}
export function getHistogram(name) {
    const values = histograms[name] || [];
    if (values.length === 0)
        return { count: 0, avg: 0, p99: 0 };
    const sorted = [...values].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    return {
        count: sorted.length,
        avg: Math.round(sum / sorted.length),
        p99: sorted[Math.floor(sorted.length * 0.99)] || 0,
    };
}
export function getAllMetrics() {
    return {
        counters: { ...counters },
        histograms: Object.fromEntries(Object.entries(histograms).map(([k, _]) => [k, getHistogram(k)])),
    };
}
export function getCounters() {
    return { ...counters };
}
export function getAll() {
    return getAllMetrics();
}
//# sourceMappingURL=metrics.js.map