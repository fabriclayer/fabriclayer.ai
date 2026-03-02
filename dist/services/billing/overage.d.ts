import { type PlanName } from '../../config.js';
/**
 * Check if a request is an overage and track it.
 * Returns true if the request is within the plan limit, false if overage.
 */
export declare function checkAndTrackOverage(accountId: string, plan: PlanName, currentCount: number): Promise<{
    allowed: boolean;
    isOverage: boolean;
    overageCount: number;
}>;
/**
 * Get overage count for an account today.
 */
export declare function getDailyOverageCount(accountId: string): Promise<number>;
/**
 * Report overage usage to Stripe for metered billing.
 * Called periodically (e.g. every hour or at end of day).
 */
export declare function reportOverageToStripe(accountId: string, overageCount: number): Promise<{
    reported: boolean;
    usageRecordId?: string;
}>;
/**
 * Calculate overage cost for a period.
 */
export declare function calculateOverageCost(overageCount: number): number;
/**
 * Get overage summary for the current billing period.
 */
export declare function getOverageSummary(accountId: string): Promise<{
    dailyLimit: number;
    todayTotal: number;
    todayOverage: number;
    overageCost: number;
    periodOverageTotal: number;
    periodOverageCost: number;
}>;
//# sourceMappingURL=overage.d.ts.map