/**
 * MCP (Model Context Protocol) tool definitions for Fabric.
 * These are served at GET /mcp/tools and used by Claude, GPT, Gemini, etc.
 *
 * Each tool maps 1:1 to a REST endpoint:
 *   fabric_discover   → GET  /v1/discover
 *   fabric_route      → POST /v1/route
 *   fabric_evaluate   → GET  /v1/evaluate/:id
 *   fabric_feedback   → POST /v1/feedback
 *   fabric_budget     → GET  /v1/budget (list) / POST /v1/budget (create)
 *   fabric_favorites  → GET/POST/DELETE /v1/favorites
 */
export interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: {
        type: 'object';
        properties: Record<string, any>;
        required?: string[];
    };
}
export declare const FABRIC_MCP_TOOLS: McpToolDefinition[];
//# sourceMappingURL=tools.d.ts.map