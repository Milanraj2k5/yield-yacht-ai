import { createFileRoute } from "@tanstack/react-router";

import { MarketShock } from "@/components/km/MarketShock";
import { Simulator } from "@/components/km/Simulator";
import { DemoBadge, Eyebrow, SectionHeading, SectionReveal } from "@/components/km/primitives";

export const Route = createFileRoute("/app/simulator")({
  head: () => ({
    meta: [
      { title: "What-if simulator — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "Move prices, transport cost, storage days and weather, and watch the selling plan rebuild itself.",
      },
      { property: "og:title", content: "What-if simulator — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "Change the conditions and watch the plan rebuild itself instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulatorPage,
});

function SimulatorPage() {
  return (
    <div className="space-y-12">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Simulator</Eyebrow>
            <SectionHeading
              title="Change the world, watch the plan react"
              subtitle="Every slider re-runs the allocation live."
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <Simulator />
      </SectionReveal>
      <SectionReveal>
        <MarketShock />
      </SectionReveal>
    </div>
  );
}
