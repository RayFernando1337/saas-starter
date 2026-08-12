"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAction, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoicesTable } from "@/components/app/billing/invoices-table";
import { plans, proPlan } from "@/lib/plans";
import { currentSubscription, formatStripeDate, isEntitled } from "@/lib/subscription";

function CheckoutBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const checkout = searchParams.get("checkout");
  if (!checkout) return null;

  const success = checkout === "success";
  return (
    <div
      role="status"
      className={`flex items-center justify-between border px-6 py-4 ${
        success ? "border-ink bg-ink text-bone" : "border-line bg-muted"
      }`}
    >
      <div>
        <p className="label-sable">{success ? "Payment received" : "Checkout canceled"}</p>
        <p className={`mt-1 text-[13.5px] ${success ? "text-bone/70" : "text-mid"}`}>
          {success
            ? "Stripe is confirming your subscription — this page updates the moment the webhook lands."
            : "No charge was made. Pick a plan whenever you're ready."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => router.replace("/billing")}
        className="label-sable underline underline-offset-4"
      >
        Dismiss
      </button>
    </div>
  );
}

export function BillingView() {
  const subscriptions = useQuery(api.billing.listMySubscriptions);
  const invoices = useQuery(api.billing.listMyInvoices);
  const subscription = currentSubscription(subscriptions);
  const entitled = subscription !== null && isEntitled(subscription);

  const createCheckout = useAction(api.billing.createSubscriptionCheckout);
  const createPortal = useAction(api.billing.createCustomerPortalSession);
  const cancel = useAction(api.billing.cancelSubscription);
  const reactivate = useAction(api.billing.reactivateSubscription);
  const [pending, setPending] = useState<string | null>(null);

  const run = async (key: string, fn: () => Promise<void>) => {
    setPending(key);
    try {
      await fn();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setPending(null);
    }
  };

  const subscribe = () =>
    run("subscribe", async () => {
      if (!proPlan.priceId) {
        throw new Error(
          "NEXT_PUBLIC_STRIPE_PRICE_PRO is not set. Add your Stripe price ID to .env.local.",
        );
      }
      const { url } = await createCheckout({ priceId: proPlan.priceId });
      if (!url) throw new Error("Stripe did not return a checkout URL");
      window.location.assign(url);
    });

  const openPortal = () =>
    run("portal", async () => {
      const { url } = await createPortal();
      window.location.assign(url);
    });

  return (
    <div className="space-y-12">
      <div>
        <p className="label-sable text-mid">Billing</p>
        <h1 className="heading-sable mt-3 text-[clamp(32px,4.4vw,56px)]">Your plan</h1>
      </div>

      <CheckoutBanner />

      <section className="border border-line p-8 max-md:p-6">
        <div className="flex items-start justify-between gap-8 max-md:flex-col">
          <div>
            <p className="label-sable text-mid">Current subscription</p>
            {subscriptions === undefined ? (
              <Skeleton className="mt-4 h-9 w-56" />
            ) : subscription ? (
              <>
                <div className="mt-3 flex items-center gap-4">
                  <p className="heading-sable text-[30px]">{entitled ? proPlan.name : "Atelier"}</p>
                  <Badge variant={entitled ? "default" : "outline"} className="label-sable">
                    {subscription.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="mt-3 text-[13.5px] text-mid">
                  {!entitled
                    ? `Ended ${formatStripeDate(subscription.currentPeriodEnd)}. Upgrade below to resubscribe.`
                    : subscription.cancelAtPeriodEnd
                      ? `Access ends ${formatStripeDate(subscription.currentPeriodEnd)}.`
                      : `Renews ${formatStripeDate(subscription.currentPeriodEnd)}.`}
                </p>
              </>
            ) : (
              <>
                <p className="heading-sable mt-3 text-[30px]">Atelier</p>
                <p className="mt-3 text-[13.5px] text-mid">
                  You&apos;re on the free tier. Upgrade below to unlock everything.
                </p>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {subscription && (
              <Button
                variant="outline"
                className="label-sable h-auto px-6 py-3.5"
                disabled={pending !== null}
                onClick={openPortal}
              >
                {pending === "portal" ? "Opening…" : "Customer portal"}
              </Button>
            )}
            {subscription && entitled && !subscription.cancelAtPeriodEnd && (
              <Button
                variant="ghost"
                className="label-sable h-auto px-6 py-3.5 text-destructive"
                disabled={pending !== null}
                onClick={() =>
                  run("cancel", async () => {
                    await cancel({ stripeSubscriptionId: subscription.stripeSubscriptionId });
                    toast.success("Subscription will cancel at period end");
                  })
                }
              >
                {pending === "cancel" ? "Canceling…" : "Cancel"}
              </Button>
            )}
            {subscription && entitled && subscription.cancelAtPeriodEnd && (
              <Button
                className="label-sable h-auto px-6 py-3.5"
                disabled={pending !== null}
                onClick={() =>
                  run("reactivate", async () => {
                    await reactivate({ stripeSubscriptionId: subscription.stripeSubscriptionId });
                    toast.success("Subscription reactivated");
                  })
                }
              >
                {pending === "reactivate" ? "Resuming…" : "Resume subscription"}
              </Button>
            )}
          </div>
        </div>
      </section>

      <section>
        <p className="label-sable text-mid">Plans</p>
        <div className="mt-5 grid grid-cols-2 gap-px border border-line bg-line max-md:grid-cols-1">
          {plans.map((plan) => {
            const isCurrent = plan.key === "pro" ? entitled : !entitled;
            return (
              <article key={plan.key} className="flex flex-col bg-background p-8 max-md:p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="heading-sable text-[22px]">{plan.name}</h2>
                  {isCurrent && <Badge className="label-sable">Current</Badge>}
                </div>
                <p
                  className="heading-sable mt-6 text-[44px]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {plan.price}
                  <span className="label-sable ml-2 align-middle text-mid">{plan.cadence}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[13.5px]">
                      <span className="h-px w-4 bg-ink" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.key === "pro" ? (
                  <div className="mt-8">
                    <Button
                      className="label-sable h-auto w-full px-6 py-4"
                      disabled={entitled || pending !== null}
                      onClick={subscribe}
                    >
                      {entitled
                        ? "You're subscribed"
                        : pending === "subscribe"
                          ? "Redirecting to Stripe…"
                          : "Upgrade to Collection"}
                    </Button>
                    {!proPlan.priceId && (
                      <p className="mt-3 text-[12px] text-mid">
                        Checkout is disabled until{" "}
                        <code className="text-[11px]">NEXT_PUBLIC_STRIPE_PRICE_PRO</code> is set.
                        See README → Stripe setup.
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="label-sable mt-8 py-4 text-mid">Included with every account</p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <p className="label-sable text-mid">Invoices</p>
        <div className="mt-5">
          <InvoicesTable invoices={invoices} />
        </div>
      </section>
    </div>
  );
}
