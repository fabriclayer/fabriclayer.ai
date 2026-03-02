import fp from 'fastify-plugin';
import { prisma } from '../db/client.js';
import { AuthError, toErrorResponse } from '../utils/errors.js';
import { PLAN_CONFIG } from '../config.js';
// ─── Public routes that don't need auth ───
const PUBLIC_PATHS = new Set([
    '/', '/health', '/healthz', '/ready',
    '/discover', '/search', // prefix-stripped (inside /v1 scope)
    '/v1/discover', '/v1/search', // full path (direct access)
    '/web-search', '/v1/web-search', // Brave web search proxy
]);
async function authPluginFn(app) {
    app.addHook('onRequest', async (request, reply) => {
        // Skip auth for public paths
        if (PUBLIC_PATHS.has(request.url.split('?')[0]))
            return;
        const authHeader = request.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            reply.status(401).send(toErrorResponse(new AuthError()));
            return;
        }
        const apiKey = authHeader.slice(7).trim();
        if (!apiKey) {
            reply.status(401).send(toErrorResponse(new AuthError()));
            return;
        }
        // Look up account by API key
        const account = await prisma.account.findUnique({
            where: { apiKey },
            select: {
                id: true,
                email: true,
                plan: true,
                apiKey: true,
                dailyLimit: true,
                routingFeePct: true,
            },
        });
        if (!account) {
            reply.status(401).send(toErrorResponse(new AuthError()));
            return;
        }
        const plan = account.plan;
        request.account = {
            ...account,
            plan,
            config: PLAN_CONFIG[plan],
        };
    });
}
export const authPlugin = fp(authPluginFn, {
    name: 'fabric-auth',
});
//# sourceMappingURL=auth.js.map