import { Counter } from "@/components/marketing/counter";
import { Reveal } from "@/components/marketing/reveal";

const stats = [
  { value: 4, suffix: "", label: "Services wired together" },
  { value: 0, suffix: "", label: "Servers for you to manage" },
  { value: 14, suffix: "", label: "Stripe events handled" },
  { value: 100, suffix: "%", label: "TypeScript, end to end" },
];

export function Stats() {
  return (
    <section className="border-b border-line bg-tan">
      <div className="container-sable grid grid-cols-4 gap-10 py-20 max-md:grid-cols-2">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90}>
            <div>
              <p className="heading-sable text-[clamp(44px,6vw,84px)]">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="label-sable mt-3 text-foreground/70">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
