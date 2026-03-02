/**
 * WebMCP Registry — indexes WebMCP tool contracts from browser origins
 * and maps them into Fabric's trust + discovery layer.
 *
 * Tools registered here are discoverable alongside traditional MCP providers,
 * but execute through the browser-native navigator.modelContext API with
 * Fabric trust scoring and x402 payment wrapping.
 */
import type { WebMCPRegistrationRequest, WebMCPRegistrationResult, WebMCPDiscoveryQuery, RegisteredWebMCPTool } from './types.js';
export declare function registerWebMCPTools(req: WebMCPRegistrationRequest, accountId: string): Promise<WebMCPRegistrationResult>;
export declare function registerFromManifest(manifestUrl: string, accountId: string): Promise<WebMCPRegistrationResult>;
export declare function discoverWebMCPTools(query: WebMCPDiscoveryQuery): Promise<RegisteredWebMCPTool[]>;
export declare function getWebMCPTool(toolIdOrName: string): Promise<RegisteredWebMCPTool | null>;
export declare function recordWebMCPExecution(toolId: string, success: boolean, latencyMs: number): Promise<void>;
export declare function deactivateOriginTools(origin: string): Promise<number>;
//# sourceMappingURL=registry.d.ts.map