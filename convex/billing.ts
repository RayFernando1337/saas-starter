import { action, query } from "./_generated/server";
import type { ActionCtx } from "./_generated/server";
import { components } from "./_generated/api";
import { StripeSubscriptions } from "@convex-dev/stripe";
import { v } from "convex/values";
import { requireIdentity } from "./lib/auth";
import { isEntitled } from "../lib/subscription";

const stripe = new StripeSubscriptions(components.stripe, {});

/** Where Stripe redirects back to. No fallback: a wrong value silently strands
 * paying customers on a dead URL after checkout. */
function siteUrl(): string {
  const url = process.env.SITE_URL;
  if (!url) {
    throw new Error(
      "SITE_URL is not set on the Convex deployment. Run `npx convex env set SITE_URL http://localhost:3000` (or your production URL).",
    );
  }
  return url;
}

/** The only price checkout sells. Set STRIPE_PRICE_PRO on the Convex deployment. */
function proPriceId(): string {
  const priceId = process.env.STRIPE_PRICE_PRO;
  if (!priceId) {
    throw new Error(
      "STRIPE_PRICE_PRO is not set. Run `npx convex env set STRIPE_PRICE_PRO price_...`.",
    );
  }
  return priceId;
}

export const subscriptionValidator = v.object({
  stripeSubscriptionId: v.string(),
  status: v.string(),
  priceId: v.string(),
  quantity: v.optional(v.number()),
  currentPeriodEnd: v.number(),
  cancelAtPeriodEnd: v.boolean(),
  cancelAt: v.optional(v.number()),
});

const invoiceValidator = v.object({
  stripeInvoiceId: v.string(),
  status: v.string(),
  amountDue: v.number(),
  amountPaid: v.number(),
  created: v.number(),
});

/** Start a Stripe Checkout session for a subscription price. */
export const createSubscriptionCheckout = action({
  args: { priceId: v.string() },
  returns: v.object({
    sessionId: v.string(),
    url: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);

    if (args.priceId !== proPriceId()) {
      throw new Error("Unknown price");
    }

    const subscriptions = await ctx.runQuery(
      components.stripe.public.listSubscriptionsByUserId,
      { userId: identity.subject },
    );
    if (subscriptions.some(isEntitled)) {
      throw new Error("You already have an active subscription");
    }

    const customer = await stripe.getOrCreateCustomer(ctx, {
      userId: identity.subject,
      email: identity.email,
      name: identity.name,
    });

    return await stripe.createCheckoutSession(ctx, {
      priceId: args.priceId,
      customerId: customer.customerId,
      mode: "subscription",
      successUrl: `${siteUrl()}/billing?checkout=success`,
      cancelUrl: `${siteUrl()}/billing?checkout=canceled`,
      subscriptionMetadata: { userId: identity.subject },
      params: { allow_promotion_codes: true },
    });
  },
});

/** Open the Stripe Customer Portal for the signed-in user. */
export const createCustomerPortalSession = action({
  args: {},
  returns: v.object({ url: v.string() }),
  handler: async (ctx) => {
    const identity = await requireIdentity(ctx);

    const customer = await stripe.getOrCreateCustomer(ctx, {
      userId: identity.subject,
      email: identity.email,
      name: identity.name,
    });

    return await stripe.createCustomerPortalSession(ctx, {
      customerId: customer.customerId,
      returnUrl: `${siteUrl()}/billing`,
    });
  },
});

/** Subscriptions for the signed-in user, synced by the Stripe webhook. */
export const listMySubscriptions = query({
  args: {},
  returns: v.array(subscriptionValidator),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const subscriptions = await ctx.runQuery(
      components.stripe.public.listSubscriptionsByUserId,
      { userId: identity.subject },
    );

    return subscriptions.map((sub) => ({
      stripeSubscriptionId: sub.stripeSubscriptionId,
      status: sub.status,
      priceId: sub.priceId,
      quantity: sub.quantity,
      currentPeriodEnd: sub.currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
      cancelAt: sub.cancelAt,
    }));
  },
});

/** Invoice history for the signed-in user, newest first. */
export const listMyInvoices = query({
  args: {},
  returns: v.array(invoiceValidator),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const invoices = await ctx.runQuery(
      components.stripe.public.listInvoicesByUserId,
      { userId: identity.subject },
    );

    return invoices
      .map((invoice) => ({
        stripeInvoiceId: invoice.stripeInvoiceId,
        status: invoice.status,
        amountDue: invoice.amountDue,
        amountPaid: invoice.amountPaid,
        created: invoice.created,
      }))
      .sort((a, b) => b.created - a.created);
  },
});

async function requireOwnedSubscription(
  ctx: ActionCtx,
  stripeSubscriptionId: string,
  userId: string,
) {
  const subscription = await ctx.runQuery(
    components.stripe.public.getSubscription,
    { stripeSubscriptionId },
  );
  if (!subscription || subscription.userId !== userId) {
    throw new Error("Subscription not found");
  }
  return subscription;
}

/** Cancel at period end (customer keeps access until then). */
export const cancelSubscription = action({
  args: { stripeSubscriptionId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    await requireOwnedSubscription(ctx, args.stripeSubscriptionId, identity.subject);

    await stripe.cancelSubscription(ctx, {
      stripeSubscriptionId: args.stripeSubscriptionId,
      cancelAtPeriodEnd: true,
    });
    return null;
  },
});

/** Undo a pending cancellation before the period ends. */
export const reactivateSubscription = action({
  args: { stripeSubscriptionId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    await requireOwnedSubscription(ctx, args.stripeSubscriptionId, identity.subject);

    await stripe.reactivateSubscription(ctx, {
      stripeSubscriptionId: args.stripeSubscriptionId,
    });
    return null;
  },
});
