/**
 * WebMCP API Routes
 *
 * POST /v1/webmcp/register    — Register tools from an origin
 * POST /v1/webmcp/manifest    — Register tools from a manifest URL
 * GET  /v1/webmcp/discover    — Discover registered WebMCP tools
 * GET  /v1/webmcp/tools/:id   — Get a single tool by ID
 * POST /v1/webmcp/execute     — Execute a tool through Fabric trust+payment
 * POST /v1/webmcp/authorise   — Get payment auth for client-side execution
 * DELETE /v1/webmcp/origin    — Deactivate all tools from an origin
 */
import { FastifyInstance } from 'fastify';
export declare function webmcpRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=webmcp.d.ts.map