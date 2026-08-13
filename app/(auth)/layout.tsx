import Image from "next/image";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { assets } from "@/lib/assets";

// Rendered per-request so builds succeed before Clerk keys exist.
export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <div className="grid min-h-svh grid-cols-2 max-md:grid-cols-1">
        <div className="relative overflow-hidden bg-tan max-md:hidden">
          <Image
            src={assets.atelier}
            alt=""
            fill
            sizes="50vw"
            priority
            className="img-grey object-cover"
          />
          <Link
            href="/"
            className="heading-sable absolute left-10 top-10 z-10 bg-ink px-5 py-3 text-[20px] text-bone"
          >
            Sable
          </Link>
          <p className="label-sable absolute bottom-10 left-10 z-10 bg-bone px-4 py-2">
            Considered essentials for shipping SaaS
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 px-[var(--gutter)] py-16">
          <Link href="/" className="heading-sable text-[22px] md:hidden">
            Sable
          </Link>
          {children}
          <Link href="/" className="btn-line">
            Back to site
          </Link>
        </div>
      </div>
    </ClerkProvider>
  );
}
