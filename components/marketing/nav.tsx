import Link from "next/link";

const links = [
  { href: "/#platform", label: "Platform" },
  { href: "/#stack", label: "Stack" },
  { href: "/pricing", label: "Pricing" },
];

export function MarketingNav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{
        background: "rgba(239, 237, 232, 0.82)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="container-sable grid h-[var(--nav-height)] grid-cols-[1fr_auto_1fr] items-center max-md:h-[72px]">
        <nav className="flex items-center gap-7 max-md:gap-4" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="heading-sable text-[22px] tracking-[0.08em] px-6 max-md:px-3"
          aria-label="SABLE home"
        >
          Sable
        </Link>

        <div className="flex items-center justify-end gap-7 max-md:gap-4">
          <Link href="/sign-in" className="nav-link max-md:hidden">
            Sign in
          </Link>
          <Link href="/sign-up" className="btn-ink !px-6 !py-3">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
