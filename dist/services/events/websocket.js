import websocket from '@fastify/websocket';
import { WebSocket } from 'ws';
const clients = new Map();
/**
 * Emit an event to all connected clients (or filtered by API key).
 */
export function emitEvent(event, apiKey) {
    const payload = JSON.stringify({ ...event, timestamp: Date.now() });
    for (const [, client] of clients) {
        // Filter by API key if specified
        if (apiKey && client.apiKey !== apiKey)
            continue;
        // Filter by subscription
        if (client.subscribedEvents.size > 0 && !client.subscribedEvents.has(event.type) && !client.subscribedEvents.has('*')) {
            continue;
        }
        if (client.ws.readyState === WebSocket.OPEN) {
            try {
                client.ws.send(payload);
            }
            catch { }
        }
    }
}
/**
 * Broadcast to ALL connected clients (system events).
 */
export function broadcastEvent(event) {
    emitEvent(event);
}
/**
 * Get count of connected clients.
 */
export function getConnectedClients() {
    return clients.size;
}
// ─── Fastify plugin ───
export async function websocketRoutes(app) {
    await app.register(websocket);
    app.get('/ws', { websocket: true }, (socket, req) => {
        // Extract API key from query or headers
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const apiKey = url.searchParams.get('key') || req.headers['x-api-key'] || '';
        const client = {
            ws: socket,
            apiKey,
            subscribedEvents: new Set(['*']), // Subscribe to all by default
        };
        clients.set(socket, client);
        // Send welcome
        try {
            socket.send(JSON.stringify({
                type: 'connected',
                timestamp: Date.now(),
                message: 'Connected to Fabric event stream',
            }));
        }
        catch { }
        // Handle incoming messages (subscriptions)
        socket.on('message', (raw) => {
            try {
                const msg = JSON.parse(raw.toString());
                if (msg.type === 'subscribe' && Array.isArray(msg.events)) {
                    client.subscribedEvents = new Set(msg.events);
                    socket.send(JSON.stringify({
                        type: 'subscribed',
                        events: msg.events,
                        timestamp: Date.now(),
                    }));
                }
                if (msg.type === 'ping') {
                    socket.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
                }
            }
            catch { }
        });
        // Cleanup on close
        socket.on('close', () => {
            clients.delete(socket);
        });
        socket.on('error', () => {
            clients.delete(socket);
        });
    });
    // SSE fallback for environments that don't support WebSockets
    app.get('/events', async (request, reply) => {
        const apiKey = request.query.key || request.headers['x-api-key'] || '';
        reply.raw.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no',
        });
        reply.raw.write(`data: ${JSON.stringify({ type: 'connected', timestamp: Date.now() })}\n\n`);
        // Create a pseudo-client for SSE
        const pseudoWs = {
            readyState: WebSocket.OPEN,
            send: (data) => {
                try {
                    reply.raw.write(`data: ${data}\n\n`);
                }
                catch { }
            },
        };
        const client = {
            ws: pseudoWs,
            apiKey,
            subscribedEvents: new Set(['*']),
        };
        clients.set(pseudoWs, client);
        // Heartbeat
        const heartbeat = setInterval(() => {
            try {
                reply.raw.write(`: heartbeat\n\n`);
            }
            catch { }
        }, 30000);
        request.raw.on('close', () => {
            clearInterval(heartbeat);
            clients.delete(pseudoWs);
        });
    });
}
//# sourceMappingURL=websocket.js.map