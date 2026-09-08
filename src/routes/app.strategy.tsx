import { Link, createFileRoute } from "@tanstack/react-router";

import { RiskRadar } from "@/components/km/RiskRadar";
import { SpoilageTimeline } from "@/components/km/SpoilageTimeline";
import { StrategyComparison } from "@/components/km/StrategyComparison";
import { DemoBadge, Eyebrow, SectionHeading, SectionReveal } from "@/components/km/primitives";

export const Route = createFileRoute("/app/strategy")({
  head: () => ({
    meta: [
      { title: "Strategy comparison — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "Compare safe, balanced and high-return selling strategies with risk, spoilage and expected earnings side by side.",
      },
      { property: "og:title", content: "Strategy comparison — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "Safe, balanced or high return — see what each choice costs and earns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategyPage,
});

function StrategyPage() {
  return (
    <div className="space-y-12">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Strategy</Eyebrow>
            <SectionHeading
              title="Three ways to sell the same lot"
              subtitle="Pick a temperament and see the allocation, the risk and the money change with it."
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <StrategyComparison />
      </SectionReveal>
      <SectionReveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <RiskRadar />
          <SpoilageTimeline />
        </div>
      </SectionReveal>

      <SectionReveal>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/app/simulator"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try the what-if simulator
          </Link>
          <Link to="/app/backup" className="rounded-full border border-border px-5 py-2.5 text-sm">
            See the backup plan
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
