import { Hero } from "@/components/marketing/sections/hero";
import { FeatureStrip } from "@/components/marketing/sections/feature-strip";
import { StackSplit } from "@/components/marketing/sections/stack-split";
import { Stats } from "@/components/marketing/sections/stats";
import { Craft } from "@/components/marketing/sections/craft";
import { Lookbook } from "@/components/marketing/sections/lookbook";
import { PricingTeaser } from "@/components/marketing/sections/pricing-teaser";
import { FinalCta } from "@/components/marketing/sections/final-cta";
import { ServiceRow } from "@/components/marketing/sections/service-row";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <StackSplit />
      <Stats />
      <Craft />
      <Lookbook />
      <PricingTeaser />
      <FinalCta />
      <ServiceRow />
    </>
  );
}
