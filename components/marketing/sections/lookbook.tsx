import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import { assets } from "@/lib/assets";

export function Lookbook() {
  return (
    <section className="border-b border-line">
      <div className="container-sable grid grid-cols-12 gap-6 py-24 max-md:grid-cols-1">
        <div className="col-span-4 flex flex-col justify-between max-md:col-span-1">
          <Reveal>
            <p className="label-sable text-mid">The finish</p>
            <h2 className="heading-sable mt-4 text-[clamp(34px,4vw,56px)]">
              Details you&apos;d
              <br />
              build anyway
            </h2>
            <p className="mt-6 max-w-[360px] text-[15px] leading-relaxed text-foreground/75">
              Styled auth screens, a dashboard shell, billing states, empty
              states. The unglamorous 20% that takes 80% of the week — pressed
              and ready.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <figure className="mt-12">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Reveal variant="clip" className="absolute inset-0">
                  <Image
                    src={assets.look2}
                    alt="Greyscale lookbook photograph, detail study"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="img-grey object-cover"
                  />
                </Reveal>
              </div>
              <figcaption className="label-sable mt-4 flex justify-between text-mid">
                <span>02 — Account area</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>/settings</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="col-span-8 max-md:col-span-1">
          <Reveal delay={80}>
            <figure>
              <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                <Reveal variant="clip" className="absolute inset-0">
                  <Image
                    src={assets.look1}
                    alt="Greyscale lookbook photograph, full composition"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="img-grey object-cover"
                  />
                </Reveal>
              </div>
              <figcaption className="label-sable mt-4 flex justify-between text-mid">
                <span>01 — Authenticated dashboard</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>/dashboard</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
