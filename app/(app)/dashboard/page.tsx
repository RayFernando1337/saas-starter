"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { currentSubscription, formatStripeDate, isEntitled } from "@/lib/subscription";
import { proPlan } from "@/lib/plans";

const checklist = [
  {
    title: "Run the backend",
    body: "npx convex dev pushes your schema and functions, and keeps types fresh.",
    href: "https://docs.convex.dev/quickstart/nextjs",
    external: true,
  },
  {
    title: "Connect Stripe",
    body: "Add STRIPE_SECRET_KEY + webhook, then subscribe with the 4242 test card.",
    href: "/billing",
  },
  {
    title: "Make it yours",
    body: "Swap the SABLE brand, plans, and landing copy. The README shows where.",
    href: "https://github.com/RayFernando1337/saas-starter#customizing",
    external: true,
  },
];

export default function DashboardPage() {
  const user = useQuery(api.users.current);
  const subscriptions = useQuery(api.billing.listMySubscriptions);
  const subscription = currentSubscription(subscriptions);
  const entitled = subscription !== null && isEntitled(subscription);

  return (
    <div className="space-y-12">
      <div>
        <p className="label-sable text-mid">Workspace</p>
        {user === undefined ? (
          <Skeleton className="mt-4 h-12 w-72" />
        ) : (
          <h1 className="heading-sable mt-3 text-[clamp(32px,4.4vw,56px)]">
            {user?.name ? `Hello, ${user.name.split(" ")[0]}` : "Hello"}
          </h1>
        )}
        <p className="mt-3 max-w-[480px] text-[13.5px] text-mid">
          This is your product&apos;s home. Everything below is live Convex data —
          open a second tab and watch it stay in sync.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-px border border-line bg-line max-md:grid-cols-1">
        <section className="bg-background p-7">
          <p className="label-sable text-mid">Plan</p>
          {subscriptions === undefined ? (
            <Skeleton className="mt-4 h-8 w-40" />
          ) : (
            <>
              <p className="heading-sable mt-3 text-[26px]">
                {entitled ? proPlan.name : "Atelier"}
              </p>
              <Badge variant={entitled ? "default" : "outline"} className="label-sable mt-3">
                {subscription ? subscription.status.replace("_", " ") : "free tier"}
              </Badge>
            </>
          )}
          <Link href="/billing" className="btn-line mt-6 inline-flex">
            Manage billing
          </Link>
        </section>

        <section className="bg-background p-7">
          <p className="label-sable text-mid">Renewal</p>
          {subscriptions === undefined ? (
            <Skeleton className="mt-4 h-8 w-40" />
          ) : subscription && entitled ? (
            <>
              <p className="heading-sable mt-3 text-[26px]">
                {formatStripeDate(subscription.currentPeriodEnd)}
              </p>
              <p className="mt-3 text-[13.5px] text-mid">
                {subscription.cancelAtPeriodEnd
                  ? "Cancels at period end."
                  : "Renews automatically."}
              </p>
            </>
          ) : (
            <>
              <p className="heading-sable mt-3 text-[26px]">—</p>
              <p className="mt-3 text-[13.5px] text-mid">
                No subscription yet. The free tier never expires.
              </p>
            </>
          )}
        </section>

        <section className="bg-background p-7">
          <p className="label-sable text-mid">Account</p>
          {user === undefined ? (
            <Skeleton className="mt-4 h-8 w-40" />
          ) : (
            <>
              <p className="heading-sable mt-3 truncate text-[26px]">
                {user?.email ?? "Synced"}
              </p>
              <p className="mt-3 text-[13.5px] text-mid">
                Stored in Convex <code className="text-[12px]">users</code> table via Clerk JWT.
              </p>
            </>
          )}
          <Link href="/settings" className="btn-line mt-6 inline-flex">
            Settings
          </Link>
        </section>
      </div>

      <section>
        <p className="label-sable text-mid">Getting started</p>
        <div className="mt-5 border-t border-line">
          {checklist.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="arrow-link grid grid-cols-[44px_1fr_auto] items-baseline gap-6 border-b border-line py-5 transition-colors hover:bg-muted/60"
            >
              <span className="label-sable text-mid" style={{ fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-[15px] font-bold uppercase tracking-[-0.01em]">
                  {item.title}
                </span>
                <span className="mt-1 block text-[13.5px] text-mid">{item.body}</span>
              </span>
              <span className="arrow label-sable" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
