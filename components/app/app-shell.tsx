"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { useStoreUser } from "@/hooks/use-store-user";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/billing", label: "Billing" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useStoreUser();

  return (
    <div className="flex min-h-svh flex-col">
      <header
        className="sticky top-0 z-50 border-b border-line"
        style={{
          background: "rgba(239, 237, 232, 0.82)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="container-sable flex h-[72px] items-center justify-between">
          <div className="flex items-center gap-10 max-md:gap-5">
            <Link href="/dashboard" className="heading-sable text-[19px]" aria-label="SABLE dashboard">
              Sable
            </Link>
            <nav className="flex items-center gap-7 max-md:gap-4" aria-label="Workspace">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={pathname.startsWith(item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="nav-link max-md:hidden">
              Marketing site
            </Link>
            <UserButton
              appearance={{
                elements: { userButtonAvatarBox: { width: "34px", height: "34px" } },
              }}
            />
          </div>
        </div>
      </header>
      <main className="container-sable flex-1 py-12">{children}</main>
      <footer className="border-t border-line">
        <div className="container-sable flex items-center justify-between py-6">
          <span className="label-sable text-mid">SABLE — workspace</span>
          <span className="label-sable text-mid">Built on Convex · Clerk · Stripe</span>
        </div>
      </footer>
    </div>
  );
}
