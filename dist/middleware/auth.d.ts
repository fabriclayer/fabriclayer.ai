import { FastifyInstance } from 'fastify';
import { PLAN_CONFIG, type PlanName } from '../config.js';
declare module 'fastify' {
    interface FastifyRequest {
        account?: {
            id: string;
            email: string | null;
            plan: PlanName;
            apiKey: string;
            dailyLimit: number;
            routingFeePct: number;
            config: (typeof PLAN_CONFIG)[PlanName];
        };
    }
}
declare function authPluginFn(app: FastifyInstance): Promise<void>;
export declare const authPlugin: typeof authPluginFn;
export {};
//# sourceMappingURL=auth.d.ts.map