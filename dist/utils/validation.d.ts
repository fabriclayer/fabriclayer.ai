import { z } from 'zod';
export declare const discoverQuerySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    minTrustScore: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    category?: string | undefined;
    minTrustScore?: number | undefined;
    maxPrice?: number | undefined;
}, {
    category?: string | undefined;
    limit?: number | undefined;
    minTrustScore?: number | undefined;
    maxPrice?: number | undefined;
}>;
export type DiscoverQuery = z.infer<typeof discoverQuerySchema>;
export declare const searchBodySchema: z.ZodObject<{
    query: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    minTrustScore: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    query: string;
    limit: number;
    category?: string | undefined;
    minTrustScore?: number | undefined;
    maxPrice?: number | undefined;
}, {
    query: string;
    category?: string | undefined;
    limit?: number | undefined;
    minTrustScore?: number | undefined;
    maxPrice?: number | undefined;
}>;
export type SearchBody = z.infer<typeof searchBodySchema>;
export declare const evaluateParamsSchema: z.ZodObject<{
    providerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    providerId: string;
}, {
    providerId: string;
}>;
export declare const routeBodySchema: z.ZodObject<{
    agentId: z.ZodString;
    category: z.ZodString;
    input: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    preferences: z.ZodOptional<z.ZodObject<{
        maxPrice: z.ZodOptional<z.ZodNumber>;
        minTrustScore: z.ZodOptional<z.ZodNumber>;
        preferredProviders: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        maxLatencyMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        minTrustScore?: number | undefined;
        maxPrice?: number | undefined;
        preferredProviders?: string[] | undefined;
        maxLatencyMs?: number | undefined;
    }, {
        minTrustScore?: number | undefined;
        maxPrice?: number | undefined;
        preferredProviders?: string[] | undefined;
        maxLatencyMs?: number | undefined;
    }>>;
    budget: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    agentId: string;
    category: string;
    input: Record<string, unknown>;
    budget?: string | undefined;
    preferences?: {
        minTrustScore?: number | undefined;
        maxPrice?: number | undefined;
        preferredProviders?: string[] | undefined;
        maxLatencyMs?: number | undefined;
    } | undefined;
}, {
    agentId: string;
    category: string;
    input: Record<string, unknown>;
    budget?: string | undefined;
    preferences?: {
        minTrustScore?: number | undefined;
        maxPrice?: number | undefined;
        preferredProviders?: string[] | undefined;
        maxLatencyMs?: number | undefined;
    } | undefined;
}>;
export type RouteBody = z.infer<typeof routeBodySchema>;
export declare const feedbackBodySchema: z.ZodObject<{
    transactionId: z.ZodString;
    score: z.ZodNumber;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    comment: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    transactionId: string;
    score: number;
    tags?: string[] | undefined;
    comment?: string | undefined;
}, {
    transactionId: string;
    score: number;
    tags?: string[] | undefined;
    comment?: string | undefined;
}>;
export type FeedbackBody = z.infer<typeof feedbackBodySchema>;
export declare const budgetCreateSchema: z.ZodObject<{
    agentId: z.ZodOptional<z.ZodString>;
    limitUsd: z.ZodNumber;
    periodType: z.ZodDefault<z.ZodEnum<["daily", "weekly", "monthly"]>>;
    hardCap: z.ZodDefault<z.ZodBoolean>;
    alertThreshold: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limitUsd: number;
    periodType: "daily" | "weekly" | "monthly";
    hardCap: boolean;
    alertThreshold: number;
    agentId?: string | undefined;
}, {
    limitUsd: number;
    agentId?: string | undefined;
    periodType?: "daily" | "weekly" | "monthly" | undefined;
    hardCap?: boolean | undefined;
    alertThreshold?: number | undefined;
}>;
export type BudgetCreate = z.infer<typeof budgetCreateSchema>;
export declare const favoriteCreateSchema: z.ZodObject<{
    agentId: z.ZodString;
    providerId: z.ZodString;
    priority: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    agentId: string;
    providerId: string;
    priority: number;
}, {
    agentId: string;
    providerId: string;
    priority?: number | undefined;
}>;
export type FavoriteCreate = z.infer<typeof favoriteCreateSchema>;
export declare const trustWeightsSchema: z.ZodObject<{
    successRate: z.ZodNumber;
    latency: z.ZodNumber;
    feedback: z.ZodNumber;
    onChainRep: z.ZodNumber;
    uptime: z.ZodNumber;
    longevity: z.ZodOptional<z.ZodNumber>;
    volumeConsistency: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    feedback: number;
    successRate: number;
    latency: number;
    onChainRep: number;
    uptime: number;
    longevity?: number | undefined;
    volumeConsistency?: number | undefined;
}, {
    feedback: number;
    successRate: number;
    latency: number;
    onChainRep: number;
    uptime: number;
    longevity?: number | undefined;
    volumeConsistency?: number | undefined;
}>;
export type TrustWeights = z.infer<typeof trustWeightsSchema>;
export declare const webSearchBodySchema: z.ZodObject<{
    query: z.ZodString;
    count: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    query: string;
    count: number;
}, {
    query: string;
    count?: number | undefined;
}>;
export type WebSearchBody = z.infer<typeof webSearchBodySchema>;
//# sourceMappingURL=validation.d.ts.map