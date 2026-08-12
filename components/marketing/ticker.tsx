const items = [
  "SABLE — the considered SaaS starter",
  "Next.js App Router",
  "Convex realtime backend",
  "Clerk authentication",
  "Stripe billing built in",
  "Clone. Configure. Ship.",
];

export function Ticker() {
  const row = (ariaHidden: boolean) => (
    <div className="ticker-track" aria-hidden={ariaHidden || undefined}>
      {items.map((item) => (
        <span key={item} className="label-sable px-8 py-2.5 inline-flex items-center gap-8">
          {item}
          <span aria-hidden="true">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker bg-ink text-bone" role="marquee" aria-label="Announcements">
      {row(false)}
      {row(true)}
    </div>
  );
}
