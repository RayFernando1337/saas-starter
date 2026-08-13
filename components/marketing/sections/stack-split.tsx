import Image from "next/image";
import { Parallax } from "@/components/marketing/parallax";
import { Reveal } from "@/components/marketing/reveal";
import { assets } from "@/lib/assets";

const layers = [
  { name: "Next.js App Router", role: "Rendering, routing, and the marketing shell" },
  { name: "Clerk", role: "Identity — sessions, JWTs, and styled auth flows" },
  { name: "Convex", role: "Database, server functions, realtime sync" },
  { name: "Stripe component", role: "Checkout, portal, webhooks in your backend" },
];

export function StackSplit() {
  return (
    <section id="stack" className="border-b border-line">
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="flex flex-col justify-center px-[var(--gutter)] py-24">
          <Reveal>
            <p className="label-sable text-mid">The stack</p>
            <h2 className="heading-sable mt-4 text-[clamp(34px,4.4vw,58px)]">
              Four layers,
              <br />
              one seam
            </h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-foreground/75">
              Every layer speaks the next one&apos;s language. Clerk issues the JWT,
              Convex verifies it, Stripe events land in your database. No glue
              code to write, no drift to babysit.
            </p>
          </Reveal>
          <div className="mt-12 border-t border-line">
            {layers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 90}>
                <div className="grid grid-cols-[44px_1fr] items-baseline gap-6 border-b border-line py-5">
                  <span className="label-sable text-mid" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-700 font-bold uppercase tracking-[-0.01em]">
                      {layer.name}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-mid">{layer.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden bg-tan max-md:min-h-[420px]">
          <Parallax speed={0.05} className="absolute inset-0">
            <Image
              src={assets.season}
              alt="Greyscale editorial photograph"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="img-grey scale-[1.12] object-cover"
            />
          </Parallax>
          <p className="label-sable absolute bottom-8 left-8 z-10 bg-ink px-4 py-2 text-bone">
            Wired end-to-end
          </p>
        </div>
      </div>
    </section>
  );
}
