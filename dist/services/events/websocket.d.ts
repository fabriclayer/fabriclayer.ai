import { FastifyInstance } from 'fastify';
export type FabricEvent = {
    type: 'route.completed';
    data: {
        routeId: string;
        providerId: string;
        providerName: string;
        cost: number;
        latencyMs: number;
        paymentMode: string;
        txHash?: string;
    };
} | {
    type: 'route.failed';
    data: {
        routeId: string;
        providerId: string;
        error: string;
    };
} | {
    type: 'trust.updated';
    data: {
        providerId: string;
        providerName: string;
        oldScore: number;
        newScore: number;
    };
} | {
    type: 'budget.warning';
    data: {
        budgetId: string;
        label: string;
        spentUsd: number;
        limitUsd: number;
        pct: number;
    };
} | {
    type: 'budget.exceeded';
    data: {
        budgetId: string;
        label: string;
        spentUsd: number;
        limitUsd: number;
    };
} | {
    type: 'provider.registered';
    data: {
        providerId: string;
        name: string;
        category: string;
        txHash?: string;
    };
} | {
    type: 'overage.triggered';
    data: {
        count: number;
        costUsd: number;
    };
} | {
    type: 'wallet.funded';
    data: {
        walletId: string;
        address: string;
        amount: number;
        txHash: string;
    };
} | {
    type: 'health.changed';
    data: {
        component: string;
        status: string;
        latencyMs?: number;
    };
};
/**
 * Emit an event to all connected clients (or filtered by API key).
 */
export declare function emitEvent(event: FabricEvent, apiKey?: string): void;
/**
 * Broadcast to ALL connected clients (system events).
 */
export declare function broadcastEvent(event: FabricEvent): void;
/**
 * Get count of connected clients.
 */
export declare function getConnectedClients(): number;
export declare function websocketRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=websocket.d.ts.map