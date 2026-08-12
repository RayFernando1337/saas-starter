import { httpRouter } from "convex/server";
import { registerRoutes } from "@convex-dev/stripe";
import { components } from "./_generated/api";

const http = httpRouter();

/**
 * Stripe webhook receiver. Point Stripe at:
 *   https://<your-deployment>.convex.site/stripe/webhook
 * (note .convex.site, not .convex.cloud — see README "Stripe setup").
 */
registerRoutes(http, components.stripe, {
  webhookPath: "/stripe/webhook",
});

export default http;
