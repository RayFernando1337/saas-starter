export type SubscriptionSummary = {
  stripeSubscriptionId: string;
  status: string;
  priceId: string;
  quantity?: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  cancelAt?: number;
};

const ENTITLED_STATUSES = new Set(["active", "trialing", "past_due"]);

export function isEntitled(subscription: SubscriptionSummary): boolean {
  return ENTITLED_STATUSES.has(subscription.status);
}

export function currentSubscription(
  subscriptions: SubscriptionSummary[] | undefined,
): SubscriptionSummary | null {
  if (!subscriptions) return null;
  return subscriptions.find(isEntitled) ?? subscriptions[0] ?? null;
}

/** Stripe timestamps are unix seconds. */
export function formatStripeDate(seconds: number): string {
  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Stripe amounts are cents. Invoice currency defaults to USD in this template. */
export function formatAmount(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
