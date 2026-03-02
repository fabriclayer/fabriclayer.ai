import { FastifyInstance } from 'fastify';
/**
 * Prometheus-compatible metrics endpoint.
 * Exports all in-memory counters + system stats in OpenMetrics format.
 */
export declare function metricsRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=metrics.d.ts.map