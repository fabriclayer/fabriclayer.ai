/**
 * Generate a billing summary for the current period.
 * Does NOT create a Stripe invoice — that happens via Stripe's subscription billing.
 * This creates a local record for display/reference.
 */
export declare function generatePeriodSummary(accountId: string, periodStart: Date, periodEnd: Date): Promise<{
    subscriptionCost: number;
    overageCount: number;
    overageCost: number;
    routingFees: number;
    totalCost: number;
    transactionCount: number;
}>;
/**
 * Create a local invoice record (mirrors Stripe invoice).
 */
export declare function createInvoiceRecord(accountId: string, stripeInvoiceId: string | null, periodStart: Date, periodEnd: Date, subscriptionUsd: number, overageUsd: number, overageCount: number, routingFeesUsd: number, totalUsd: number, status?: 'DRAFT' | 'OPEN' | 'PAID' | 'VOID'): Promise<{
    id: string;
    createdAt: Date;
    accountId: string;
    stripeInvoiceId: string | null;
    periodStart: Date;
    periodEnd: Date;
    subscriptionUsd: number;
    overageUsd: number;
    overageCount: number;
    routingFeesUsd: number;
    totalUsd: number;
    status: import("@prisma/client").$Enums.InvoiceStatus;
    paidAt: Date | null;
}>;
/**
 * List invoices for an account.
 */
export declare function listInvoices(accountId: string, limit?: number): Promise<Array<{
    id: string;
    periodStart: Date;
    periodEnd: Date;
    subscriptionUsd: number;
    overageUsd: number;
    overageCount: number;
    routingFeesUsd: number;
    totalUsd: number;
    status: string;
    paidAt: Date | null;
    createdAt: Date;
}>>;
/**
 * Get upcoming invoice estimate.
 */
export declare function getUpcomingEstimate(accountId: string): Promise<{
    periodStart: Date;
    periodEnd: Date;
    daysRemaining: number;
    projectedOverageCount: number;
    projectedOverageCost: number;
    projectedTotal: number;
    subscriptionCost: number;
    overageCount: number;
    overageCost: number;
    routingFees: number;
    totalCost: number;
    transactionCount: number;
} | null>;
//# sourceMappingURL=invoices.d.ts.map