export declare class FabricError extends Error {
    statusCode: number;
    code: string;
    constructor(message: string, statusCode: number, code: string);
}
export declare class AuthError extends FabricError {
    constructor(message?: string);
}
export declare class PlanLimitError extends FabricError {
    constructor(message?: string);
}
export declare class PlanFeatureError extends FabricError {
    constructor(feature: string);
}
export declare class BudgetExceededError extends FabricError {
    constructor(budgetId: string);
}
export declare class ProviderError extends FabricError {
    constructor(message: string);
}
export declare class NotFoundError extends FabricError {
    constructor(resource: string);
}
export declare class ValidationError extends FabricError {
    constructor(message: string);
}
export interface ErrorResponse {
    error: {
        code: string;
        message: string;
    };
}
export declare function toErrorResponse(err: FabricError | Error): ErrorResponse;
//# sourceMappingURL=errors.d.ts.map