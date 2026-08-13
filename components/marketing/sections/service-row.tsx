import { Reveal } from "@/components/marketing/reveal";

const guarantees = [
  {
    title: "Open source",
    body: "MIT licensed. Fork it, rename it, sell it. No attribution theatre.",
  },
  {
    title: "No secrets committed",
    body: "Every credential lives in env vars. The example file documents all of them.",
  },
  {
    title: "Type-safe seams",
    body: "Schema to component, one type system. Refactors fail in CI, not production.",
  },
  {
    title: "Self-serve billing",
    body: "Customers subscribe, upgrade, and cancel without you touching a dashboard.",
  },
];

export function ServiceRow() {
  return (
    <section>
      <div className="container-sable grid grid-cols-4 gap-10 py-16 max-md:grid-cols-2 max-sm:grid-cols-1">
      {guarantees.map((item, i) => (
        <Reveal key={item.title} delay={i * 80}>
          <div className="border-t border-ink pt-5">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em]">{item.title}</h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-mid">{item.body}</p>
          </div>
        </Reveal>
      ))}
      </div>
    </section>
  );
}
