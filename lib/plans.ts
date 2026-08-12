export type Plan = {
  key: "free" | "pro";
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  /** Stripe price ID. Undefined for the free plan or when env is not set. */
  priceId?: string;
};

export const plans: Plan[] = [
  {
    key: "free",
    name: "Atelier",
    price: "$0",
    cadence: "forever",
    blurb: "For evaluating the cut and cloth. No card required.",
    features: [
      "Full source access",
      "Auth + realtime database",
      "1 project",
      "Community support",
    ],
  },
  {
    key: "pro",
    name: "Collection",
    price: "$20",
    cadence: "per month",
    blurb: "The full wardrobe. Everything unlocked, billed via Stripe.",
    features: [
      "Everything in Atelier",
      "Unlimited projects",
      "Priority support",
      "Cancel anytime in the portal",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  },
];

export const proPlan = plans[1];
