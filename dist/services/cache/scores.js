import { redis } from './redis.js';
import { TRUST_SCORE_TTL, TRUST_SCORE_PREFIX } from '../../config.js';
/**
 * Get cached scored providers for a category.
 * Returns null on miss or Redis failure.
 */
export async function getCachedScores(category) {
    try {
        const key = `${TRUST_SCORE_PREFIX}${category}`;
        const cached = await redis.get(key);
        if (!cached)
            return null;
        return JSON.parse(cached);
    }
    catch {
        return null;
    }
}
/**
 * Store scored providers in cache with TTL.
 */
export async function setCachedScores(category, providers) {
    try {
        const key = `${TRUST_SCORE_PREFIX}${category}`;
        await redis.set(key, JSON.stringify(providers), 'EX', TRUST_SCORE_TTL);
    }
    catch {
        // Cache write failure is non-fatal
    }
}
/**
 * Invalidate cache for a category (e.g. after new feedback or latency update).
 */
export async function invalidateScores(category) {
    try {
        const key = `${TRUST_SCORE_PREFIX}${category}`;
        await redis.del(key);
    }
    catch {
        // Non-fatal
    }
}
/**
 * Invalidate ALL category caches (e.g. after bulk update).
 */
export async function invalidateAllScores() {
    try {
        const keys = await redis.keys(`${TRUST_SCORE_PREFIX}*`);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
    }
    catch {
        // Non-fatal
    }
}
//# sourceMappingURL=scores.js.map