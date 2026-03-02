// ─── Custom Error Classes ───
export class FabricError extends Error {
    statusCode;
    code;
    constructor(message, statusCode, code) {
        super(message);
        this.name = 'FabricError';
        this.statusCode = statusCode;
        this.code = code;
    }
}
export class AuthError extends FabricError {
    constructor(message = 'Invalid or missing API key') {
        super(message, 401, 'AUTH_INVALID');
    }
}
export class PlanLimitError extends FabricError {
    constructor(message = 'Daily request limit exceeded') {
        super(message, 429, 'PLAN_LIMIT_EXCEEDED');
    }
}
export class PlanFeatureError extends FabricError {
    constructor(feature) {
        super(`Your plan does not include ${feature}. Upgrade at fabric.computer/pricing`, 403, 'PLAN_FEATURE_UNAVAILABLE');
    }
}
export class BudgetExceededError extends FabricError {
    constructor(budgetId) {
        super(`Budget ${budgetId} hard cap exceeded`, 402, 'BUDGET_EXCEEDED');
    }
}
export class ProviderError extends FabricError {
    constructor(message) {
        super(message, 502, 'PROVIDER_ERROR');
    }
}
export class NotFoundError extends FabricError {
    constructor(resource) {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}
export class ValidationError extends FabricError {
    constructor(message) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}
export function toErrorResponse(err) {
    return {
        error: {
            code: err instanceof FabricError ? err.code : 'INTERNAL_ERROR',
            message: err.message,
        },
    };
}
//# sourceMappingURL=errors.js.map