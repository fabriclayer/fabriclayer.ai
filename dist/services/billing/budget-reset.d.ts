/**
 * Reset budgets that have passed their resetAt date.
 * Runs periodically (every 5 minutes).
 */
export declare function resetExpiredBudgets(): Promise<number>;
/**
 * Start the budget reset timer.
 */
export declare function startBudgetResetJob(): void;
/**
 * Stop the budget reset timer.
 */
export declare function stopBudgetResetJob(): void;
//# sourceMappingURL=budget-reset.d.ts.map