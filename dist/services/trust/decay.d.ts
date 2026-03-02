/**
 * Apply time-decay to a feedback score.
 *
 * - < 90 days: full weight (1.0×)
 * - 90–180 days: half weight (0.5×)
 * - > 180 days: 20% weight (0.2×)
 */
export declare function applyDecay(score: number, createdAt: Date): number;
/**
 * Compute weighted average of feedback scores with time-decay.
 */
export declare function decayedFeedbackAvg(feedback: Array<{
    score: number;
    createdAt: Date;
}>): number;
//# sourceMappingURL=decay.d.ts.map