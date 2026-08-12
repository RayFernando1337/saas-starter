import Link from "next/link";
import { CurrentYear } from "@/components/marketing/current-year";

export function MarketingFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-sable grid grid-cols-4 gap-10 py-20 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <p className="label-sable text-mid mb-5">Studio</p>
          <address className="not-italic text-[13.5px] leading-7 text-bone/80">
            SABLE Systems
            <br />
            Built on Next.js, Convex,
            <br />
            Clerk &amp; Stripe
          </address>
        </div>
        <div>
          <p className="label-sable text-mid mb-5">Product</p>
          <ul className="space-y-3 text-[13.5px]">
            <li><Link className="hover:underline underline-offset-4" href="/#platform">Platform</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/#stack">Stack</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <p className="label-sable text-mid mb-5">Account</p>
          <ul className="space-y-3 text-[13.5px]">
            <li><Link className="hover:underline underline-offset-4" href="/sign-in">Sign in</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/sign-up">Start free</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="label-sable text-mid mb-5">Source</p>
          <ul className="space-y-3 text-[13.5px]">
            <li>
              <a
                className="hover:underline underline-offset-4"
                href="https://github.com/RayFernando1337/saas-starter"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="hover:underline underline-offset-4"
                href="https://github.com/get-convex/stripe"
                target="_blank"
                rel="noreferrer"
              >
                Stripe component
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-sable flex items-center justify-between border-t border-bone/15 py-8 max-sm:flex-col max-sm:gap-4">
        <span className="heading-sable text-[30px]" aria-hidden="true">
          Sable
        </span>
        <p className="label-sable text-mid">
          © <CurrentYear /> — MIT licensed template. Make it yours.
        </p>
      </div>
    </footer>
  );
}
