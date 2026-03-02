/**
 * WebMCP Execution Bridge
 *
 * Executes WebMCP tool calls through Fabric's trust + payment layer.
 *
 * Flow:
 * 1. Agent requests tool execution via Fabric API
 * 2. Bridge resolves tool → provider → trust score
 * 3. Budget check (if applicable)
 * 4. Payment settlement via x402 or direct USDC
 * 5. Proxied execution to origin (or client-side callback)
 * 6. Record transaction + update trust metrics
 *
 * Two execution modes:
 * - Server-proxied: Fabric calls the origin's WebMCP endpoint
 * - Client-delegated: Fabric authorises payment, browser executes locally
 */
import type { WebMCPExecutionRequest, WebMCPExecutionResult, RegisteredWebMCPTool } from './types.js';
export interface WebMCPBridgeContext {
    accountId: string;
    routingFeePct: number;
    canRoute: boolean;
}
/**
 * Execute a WebMCP tool through Fabric's trust + payment layer.
 */
export declare function executeWebMCPTool(req: WebMCPExecutionRequest, ctx: WebMCPBridgeContext): Promise<WebMCPExecutionResult>;
/**
 * Generate a payment authorisation token for client-side execution.
 * The browser SDK calls this before executing the tool locally.
 */
export declare function authoriseWebMCPExecution(req: WebMCPExecutionRequest, ctx: WebMCPBridgeContext): Promise<{
    authorised: boolean;
    token: string;
    tool: RegisteredWebMCPTool;
    trust: {
        score: number;
        verified: boolean;
    };
    payment: {
        amount: number;
        mode: 'x402' | 'direct' | 'free';
    };
    expiresAt: string;
}>;
//# sourceMappingURL=bridge.d.ts.map