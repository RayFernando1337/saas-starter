import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/marketing/parallax";
import { assets } from "@/lib/assets";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-sable relative flex min-h-[calc(100svh-var(--nav-height)-40px)] flex-col justify-center py-16">
        {/* Floating context labels */}
        <div className="hv absolute left-[var(--gutter)] top-10 z-30" style={{ "--hv-delay": "0.55s" } as React.CSSProperties}>
          <p className="label-sable">Starter — Edition 01</p>
          <p className="label-sable text-mid mt-1.5">Next.js · Convex · Clerk · Stripe</p>
        </div>
        <div className="hv absolute bottom-10 right-[var(--gutter)] z-30 text-right max-sm:hidden" style={{ "--hv-delay": "0.65s" } as React.CSSProperties}>
          <p className="label-sable">Considered essentials</p>
          <p className="label-sable text-mid mt-1.5">For founders who ship</p>
        </div>

        {/* Layer 1: massive wordmark behind the model */}
        <div className="pointer-events-none relative z-10 flex items-center justify-center">
          <Parallax speed={-0.06}>
            <h1
              aria-hidden="true"
              className="hv heading-sable select-none text-center leading-[0.8] tracking-[-0.02em]"
              style={{ fontSize: "clamp(96px, 22vw, 300px)", "--hv-delay": "0.1s" } as React.CSSProperties}
            >
              Sable
            </h1>
          </Parallax>
          <span className="sr-only">SABLE — the considered SaaS starter</span>
        </div>

        {/* Layer 2: model cutout in front of the type */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
          <Parallax speed={0.03}>
            <div className="hv" style={{ "--hv-delay": "0.3s" } as React.CSSProperties}>
              <Image
                src={assets.heroModel}
                alt=""
                width={560}
                height={740}
                priority
                className="img-grey h-[min(66svh,620px)] w-auto object-contain drop-shadow-[0_26px_46px_rgba(16,16,16,0.22)]"
              />
            </div>
          </Parallax>
        </div>

        {/* CTA cluster, bottom-left */}
        <div
          className="hv absolute bottom-10 left-[var(--gutter)] z-30 flex flex-col gap-5"
          style={{ "--hv-delay": "0.45s" } as React.CSSProperties}
        >
          <p className="max-w-[300px] text-[15px] leading-relaxed text-foreground/80">
            Auth, billing, and a realtime backend — already tailored. Clone the
            repo, add your keys, ship your product.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/sign-up" className="btn-ink">
              Start free
            </Link>
            <Link href="/pricing" className="btn-line">
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
