import { z } from 'zod';
// ─── Discover ───
export const discoverQuerySchema = z.object({
    category: z.string().min(1).max(100).optional(),
    limit: z.coerce.number().int().min(1).max(50).default(5),
    minTrustScore: z.coerce.number().min(0).max(5).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
});
// ─── Search ───
export const searchBodySchema = z.object({
    query: z.string().min(1).max(500),
    category: z.string().min(1).max(100).optional(),
    limit: z.number().int().min(1).max(50).default(10),
    minTrustScore: z.number().min(0).max(5).optional(),
    maxPrice: z.number().min(0).optional(),
});
// ─── Evaluate ───
export const evaluateParamsSchema = z.object({
    providerId: z.string().min(1),
});
// ─── Route ───
export const routeBodySchema = z.object({
    agentId: z.string().min(1),
    category: z.string().min(1).max(100),
    input: z.record(z.unknown()), // flexible — depends on provider
    preferences: z
        .object({
        maxPrice: z.number().min(0).optional(),
        minTrustScore: z.number().min(0).max(5).optional(),
        preferredProviders: z.array(z.string()).optional(),
        maxLatencyMs: z.number().int().min(0).optional(),
    })
        .optional(),
    budget: z.string().optional(), // budget ID
});
// ─── Feedback ───
export const feedbackBodySchema = z.object({
    transactionId: z.string().min(1),
    score: z.number().int().min(1).max(5),
    tags: z.array(z.string().max(50)).max(10).optional(),
    comment: z.string().max(1000).optional(),
});
// ─── Budget ───
export const budgetCreateSchema = z.object({
    agentId: z.string().optional(), // omit for account-level budget
    limitUsd: z.number().min(0.01),
    periodType: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
    hardCap: z.boolean().default(false),
    alertThreshold: z.number().min(0).max(1).default(0.8),
});
// ─── Favorites ───
export const favoriteCreateSchema = z.object({
    agentId: z.string().min(1),
    providerId: z.string().min(1),
    priority: z.number().int().min(0).max(100).default(0),
});
// ─── Trust Weights (custom) ───
export const trustWeightsSchema = z.object({
    successRate: z.number().min(0).max(1),
    latency: z.number().min(0).max(1),
    feedback: z.number().min(0).max(1),
    onChainRep: z.number().min(0).max(1),
    uptime: z.number().min(0).max(1),
    longevity: z.number().min(0).max(1).optional(),
    volumeConsistency: z.number().min(0).max(1).optional(),
});
// ─── Web Search ───
export const webSearchBodySchema = z.object({
    query: z.string().min(1).max(500),
    count: z.number().int().min(1).max(20).default(10),
});
//# sourceMappingURL=validation.js.map