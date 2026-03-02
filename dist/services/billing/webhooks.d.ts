import type Stripe from 'stripe';
type StripeEvent = Stripe.Event;
/**
 * Process a Stripe webhook event.
 * Returns the event type for logging.
 */
export declare function handleWebhookEvent(event: StripeEvent): Promise<string>;
export {};
//# sourceMappingURL=webhooks.d.ts.map