import { FastifyInstance } from 'fastify';
/**
 * Security headers middleware.
 * Adds production security headers beyond what Helmet provides.
 */
declare function securityPluginFn(app: FastifyInstance): Promise<void>;
export declare const securityPlugin: typeof securityPluginFn;
export {};
//# sourceMappingURL=security.d.ts.map