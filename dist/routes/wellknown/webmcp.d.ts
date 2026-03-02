/**
 * /.well-known/webmcp routes
 *
 * Standard endpoints for WebMCP interoperability:
 *   GET  /.well-known/webmcp          — Tool manifest for this gateway
 *   GET  /.well-known/webmcp/tools    — List all registered tools
 *   POST /.well-known/webmcp/execute  — Execute a tool (used by Fabric bridge)
 */
import { FastifyInstance } from 'fastify';
export declare function wellKnownWebMCPRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=webmcp.d.ts.map