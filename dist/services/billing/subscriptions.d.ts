import { type PlanName } from '../../config.js';
/**
 * Get or create a Stripe customer for an account.
 */
export declare function ensureStripeCustomer(accountId: string): Promise<string>;
/**
 * Create a Stripe Checkout session for subscribing to a plan.
 * Returns the checkout URL.
 */
export declare function createCheckoutSession(accountId: string, plan: PlanName, successUrl: string, cancelUrl: string): Promise<{
    url: string;
    sessionId: string;
}>;
/**
 * Create a billing portal session for self-service management.
 */
export declare function createPortalSession(accountId: string, returnUrl: string): Promise<{
    url: string;
}>;
/**
 * Upgrade or downgrade a subscription.
 * Prorated by default — charges/credits the difference immediately.
 */
export declare function changePlan(accountId: string, newPlan: PlanName): Promise<{
    subscription: any;
    prorationAmount: number;
}>;
/**
 * Cancel a subscription at period end.
 */
export declare function cancelSubscription(accountId: string): Promise<{
    subscription: any;
    prorationAmount: number;
}>;
/**
 * Reactivate a subscription that was set to cancel at period end.
 */
export declare function reactivateSubscription(accountId: string): Promise<{
    subscription: any;
}>;
/**
 * Get subscription details for an account.
 */
export declare function getSubscription(accountId: string): Promise<{
    id: string;
    plan: import("@prisma/client").$Enums.Plan;
    status: import("@prisma/client").$Enums.SubscriptionStatus;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    trialEnd: Date | null;
    overageEnabled: boolean;
} | null>;
//# sourceMappingURL=subscriptions.d.ts.map