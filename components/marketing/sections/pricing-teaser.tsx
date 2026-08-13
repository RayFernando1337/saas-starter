import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";
import { plans } from "@/lib/plans";

export function PricingTeaser() {
  return (
    <section className="border-b border-line">
      <div className="container-sable py-24">
        <Reveal>
          <div className="flex items-end justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <div>
              <p className="label-sable text-mid">Pricing</p>
              <h2 className="heading-sable mt-4 text-[clamp(34px,4.4vw,58px)]">
                Two cuts, no fine print
              </h2>
            </div>
            <Link href="/pricing" className="btn-line">
              Full pricing
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-px border border-line bg-line max-md:grid-cols-1">
          {plans.map((plan, i) => (
            <Reveal key={plan.key} delay={i * 120} className="bg-background">
              <article className="flex h-full flex-col p-10 max-md:p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="heading-sable text-[24px]">{plan.name}</h3>
                  <p className="label-sable text-mid">{plan.key === "pro" ? "Pro" : "Free"}</p>
                </div>
                <p
                  className="heading-sable mt-8 text-[64px]"
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
                  className={plan.key === "pro" ? "btn-ink mt-10 self-start" : "btn-line mt-10 self-start"}
                >
                  {plan.key === "pro" ? "Start with Collection" : "Start free"}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
