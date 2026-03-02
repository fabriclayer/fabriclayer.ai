import 'dotenv/config';
export declare const PORT: number;
export declare const HOST: string;
export declare const NODE_ENV: string;
export declare const IS_PROD: boolean;
export declare const LOG_LEVEL: string;
export declare const DATABASE_URL: string;
export declare const REDIS_URL: string;
export declare const CHAIN_RPC_URL: string;
export declare const CHAIN_ID: number;
export declare const USE_TESTNET: boolean;
export declare const USDC_ADDRESS: `0x${string}`;
export declare const FABRIC_IDENTITY_ADDRESS: `0x${string}`;
export declare const FABRIC_REGISTRY_ADDRESS: `0x${string}`;
export declare const FABRIC_OPERATOR_KEY: string;
export declare const FABRIC_FEE_WALLET: `0x${string}`;
export declare const ESTIMATED_GAS_USD = 0.00025;
export declare const GAS_BUFFER_MULTIPLIER = 1.2;
export declare const API_KEY_PREFIX: string;
export declare const CORS_ORIGIN: string;
export declare const PLAN_CONFIG: {
    readonly FREE: {
        readonly dailyLimit: 50;
        readonly routingFeePct: 0;
        readonly canRoute: false;
        readonly canBudget: false;
        readonly canFeedback: false;
        readonly canFavorites: false;
        readonly maxWallets: 0;
        readonly customWeights: false;
    };
    readonly BUILDER: {
        readonly dailyLimit: 5000;
        readonly routingFeePct: 0.5;
        readonly canRoute: true;
        readonly canBudget: true;
        readonly canFeedback: true;
        readonly canFavorites: true;
        readonly maxWallets: 3;
        readonly customWeights: false;
    };
    readonly PRO: {
        readonly dailyLimit: 15000;
        readonly routingFeePct: 0.4;
        readonly canRoute: true;
        readonly canBudget: true;
        readonly canFeedback: true;
        readonly canFavorites: true;
        readonly maxWallets: 10;
        readonly customWeights: true;
    };
    readonly TEAM: {
        readonly dailyLimit: 50000;
        readonly routingFeePct: 0.3;
        readonly canRoute: true;
        readonly canBudget: true;
        readonly canFeedback: true;
        readonly canFavorites: true;
        readonly maxWallets: 50;
        readonly customWeights: true;
    };
};
export type PlanName = keyof typeof PLAN_CONFIG;
export declare const OVERAGE_COST_PER_REQUEST = 0.001;
export declare const STRIPE_SECRET_KEY: string;
export declare const STRIPE_WEBHOOK_SECRET: string;
export declare const STRIPE_PRICE_IDS: {
    readonly BUILDER: string;
    readonly PRO: string;
    readonly TEAM: string;
};
export declare const STRIPE_OVERAGE_PRICE_ID: string;
export declare const PLAN_PRICES_USD: {
    readonly FREE: 0;
    readonly BUILDER: 9;
    readonly PRO: 39;
    readonly TEAM: 149;
};
export declare const TRUST_SCORE_TTL = 300;
export declare const TRUST_SCORE_PREFIX = "trust:score:";
export declare const RATE_LIMIT_WINDOW = 60000;
export declare const RATE_LIMIT_MAX = 100;
export declare const BRAVE_API_KEY: string;
//# sourceMappingURL=config.d.ts.map