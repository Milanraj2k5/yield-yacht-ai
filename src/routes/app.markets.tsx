import { createFileRoute } from "@tanstack/react-router";

import { DemandGauge } from "@/components/km/DemandGauge";
import { LogisticsRoute } from "@/components/km/LogisticsRoute";
import { MarketNetwork } from "@/components/km/MarketNetwork";
import { MarketPulse } from "@/components/km/MarketPulse";
import { PriceChart } from "@/components/km/PriceChart";
import { DemoBadge, Eyebrow, SectionHeading, SectionReveal } from "@/components/km/primitives";

export const Route = createFileRoute("/app/markets")({
  head: () => ({
    meta: [
      { title: "Market intelligence — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "Mandi prices, demand, forecast and route economics for every destination your harvest can reach.",
      },
      { property: "og:title", content: "Market intelligence — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "Prices, demand, forecast and route economics in one view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarketsPage,
});

function MarketsPage() {
  return (
    <div className="space-y-12">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Markets</Eyebrow>
            <SectionHeading
              title="Where your harvest can go"
              subtitle="Every mandi and buyer, scored on price, demand, risk and what actually lands in your hand."
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <MarketNetwork />
      </SectionReveal>
      <SectionReveal>
        <MarketPulse />
      </SectionReveal>
      <SectionReveal>
        <PriceChart />
      </SectionReveal>
      <SectionReveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <DemandGauge />
          <LogisticsRoute />
        </div>
      </SectionReveal>
    </div>
  );
}
