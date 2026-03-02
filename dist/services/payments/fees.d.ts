export interface CostBreakdown {
    providerCost: number;
    routingFee: number;
    gasCost: number;
    totalCost: number;
    routingFeePct: number;
}
/**
 * Calculate the full cost breakdown for a route.
 *
 * @param providerPrice - Provider's base price in USD
 * @param routingFeePct - Account's routing fee percentage (0.3, 0.4, or 0.5)
 * @param useEstimatedGas - If true, use live gas estimation; if false, use constant
 */
export declare function calculateCosts(providerPrice: number, routingFeePct: number, useEstimatedGas?: boolean): Promise<CostBreakdown>;
/**
 * Calculate routing fee only.
 */
export declare function calculateRoutingFee(providerCost: number, feePct: number): number;
/**
 * Validate that a payment amount is reasonable.
 */
export declare function validatePaymentAmount(amount: number): {
    valid: boolean;
    reason?: string;
};
//# sourceMappingURL=fees.d.ts.map