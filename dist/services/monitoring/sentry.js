import fp from 'fastify-plugin';
const SENTRY_DSN = process.env.SENTRY_DSN || '';
let sentry = null;
/**
 * Initialize Sentry for error tracking.
 * Uses a lightweight wrapper — swap for @sentry/node in production.
 */
export function initSentry() {
    if (!SENTRY_DSN) {
        console.log('[Sentry] No DSN configured — error tracking disabled');
        return;
    }
    // In production, replace with:
    // import * as Sentry from '@sentry/node';
    // Sentry.init({ dsn: SENTRY_DSN, tracesSampleRate: 0.1 });
    // sentry = Sentry;
    sentry = {
        captureException(err, context) {
            console.error('[Sentry]', err.message, context);
        },
        captureMessage(msg, level = 'info') {
            console.log(`[Sentry:${level}]`, msg);
        },
        setTag(key, value) {
            // no-op in stub
        },
    };
    console.log('[Sentry] Error tracking initialized');
}
/**
 * Capture an exception to Sentry.
 */
export function captureException(err, context) {
    sentry?.captureException(err, context);
}
/**
 * Capture a message to Sentry.
 */
export function captureMessage(msg, level = 'info') {
    sentry?.captureMessage(msg, level);
}
/**
 * Fastify error handler plugin — sends unhandled errors to Sentry.
 */
async function sentryPluginFn(app) {
    app.addHook('onError', async (request, reply, error) => {
        captureException(error, {
            url: request.url,
            method: request.method,
            accountId: request.account?.id,
            statusCode: reply.statusCode,
        });
    });
}
export const sentryPlugin = fp(sentryPluginFn, {
    name: 'fabric-sentry',
});
//# sourceMappingURL=sentry.js.map