import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";
import { plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Two plans. Start free, upgrade when the product earns it.",
};

const faqs = [
  {
    q: "How does billing work?",
    a: "Stripe Checkout handles payment, the Convex Stripe component syncs every webhook into your database, and the in-app billing page reads subscription state in realtime.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. The Stripe Customer Portal is one click away from the billing page — cancel, resume, or change payment method without emailing anyone.",
  },
  {
    q: "Is this a real product?",
    a: "SABLE is the demo brand of an open-source SaaS starter. Clone the repository, swap the copy and prices, and this page sells your product instead.",
  },
  {
    q: "What happens after checkout?",
    a: "Stripe redirects back to your dashboard, the webhook lands in Convex, and the subscription appears in the billing page — usually before the redirect finishes.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-sable py-24">
          <Reveal>
            <p className="label-sable text-mid">Pricing</p>
            <h1 className="heading-sable mt-4 text-[clamp(48px,8vw,120px)]">
              Priced like
              <br />
              essentials
            </h1>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-foreground/75">
              Start free. Upgrade when your product earns it. Subscriptions are
              managed entirely in-app through Stripe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-sable py-20">
          <div className="grid grid-cols-2 gap-px border border-line bg-line max-md:grid-cols-1">
            {plans.map((plan, i) => (
              <Reveal key={plan.key} delay={i * 120} className="bg-background">
                <article className="flex h-full flex-col p-10 max-md:p-7">
                  <div className="flex items-baseline justify-between">
                    <h2 className="heading-sable text-[26px]">{plan.name}</h2>
                    <p className="label-sable text-mid">{plan.key === "pro" ? "Pro" : "Free"}</p>
                  </div>
                  <p
                    className="heading-sable mt-8 text-[72px]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {plan.price}
                    <span className="label-sable ml-3 align-middle text-mid">{plan.cadence}</span>
                  </p>
                  <p className="mt-5 text-[13.5px] leading-relaxed text-mid">{plan.blurb}</p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[13.5px]">
                        <span className="h-px w-4 bg-ink" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-up"
                    className={
                      plan.key === "pro" ? "btn-ink mt-10 self-start" : "btn-line mt-10 self-start"
                    }
                  >
                    {plan.key === "pro" ? "Start with Collection" : "Start free"}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="label-sable mt-8 text-mid">
            Already subscribed? Manage everything from the{" "}
            <Link href="/billing" className="text-ink underline underline-offset-4">
              billing page
            </Link>
            .
          </p>
        </div>
      </section>

      <section>
        <div className="container-sable grid grid-cols-12 gap-10 py-24 max-md:grid-cols-1">
          <div className="col-span-4 max-md:col-span-1">
            <Reveal>
              <p className="label-sable text-mid">Questions</p>
              <h2 className="heading-sable mt-4 text-[clamp(30px,3.6vw,48px)]">
                Asked and
                <br />
                answered
              </h2>
            </Reveal>
          </div>
          <div className="col-span-8 max-md:col-span-1">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 80}>
                <div className="border-t border-line py-7 last:border-b">
                  <h3 className="text-[15px] font-bold uppercase tracking-[-0.01em]">{faq.q}</h3>
                  <p className="mt-3 max-w-[560px] text-[13.5px] leading-relaxed text-mid">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
