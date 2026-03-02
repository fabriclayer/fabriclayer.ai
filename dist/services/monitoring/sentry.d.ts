import { FastifyInstance } from 'fastify';
/**
 * Initialize Sentry for error tracking.
 * Uses a lightweight wrapper — swap for @sentry/node in production.
 */
export declare function initSentry(): void;
/**
 * Capture an exception to Sentry.
 */
export declare function captureException(err: Error, context?: Record<string, any>): void;
/**
 * Capture a message to Sentry.
 */
export declare function captureMessage(msg: string, level?: string): void;
/**
 * Fastify error handler plugin — sends unhandled errors to Sentry.
 */
declare function sentryPluginFn(app: FastifyInstance): Promise<void>;
export declare const sentryPlugin: typeof sentryPluginFn;
export {};
//# sourceMappingURL=sentry.d.ts.map