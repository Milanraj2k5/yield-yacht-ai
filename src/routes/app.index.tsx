import { Link, createFileRoute } from "@tanstack/react-router";

import { AllocationFlow } from "@/components/km/AllocationFlow";
import { DecisionFlow } from "@/components/km/DecisionFlow";
import { Recommendation } from "@/components/km/Recommendation";
import {
  AnimatedNumber,
  DemoBadge,
  Eyebrow,
  SectionHeading,
  SectionReveal,
  StatTile,
} from "@/components/km/primitives";
import { HARVEST, STRATEGIES } from "@/lib/demo-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — KrishiMitra MarketOS" },
      {
        name: "description",
        content: "Today's harvest snapshot, the recommended selling plan and how it was reasoned.",
      },
      { property: "og:title", content: "Dashboard — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "Today's harvest snapshot and the recommended selling plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const plan = STRATEGIES.balanced;
  return (
    <div className="space-y-12">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Today</Eyebrow>
            <SectionHeading
              title="Your harvest dashboard"
              subtitle={`${HARVEST.quantity} kg ${HARVEST.crop} from ${HARVEST.location}. One plan, fully reasoned.`}
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Quantity">
            <AnimatedNumber value={HARVEST.quantity} suffix=" kg" />
          </StatTile>
          <StatTile label="Expected earnings" tone="primary">
            <AnimatedNumber value={plan.earnings} prefix="₹" />
          </StatTile>
          <StatTile label="Confidence" tone="teal">
            <AnimatedNumber value={plan.confidence} suffix="%" />
          </StatTile>
          <StatTile label="Expected spoilage" tone="gold">
            <AnimatedNumber value={plan.spoilage} decimals={1} suffix="%" />
          </StatTile>
        </div>
      </SectionReveal>

      <SectionReveal>
        <Recommendation />
      </SectionReveal>

      <SectionReveal>
        <div className="km-card p-5 sm:p-6">
          <SectionHeading title="How the harvest is split" />
          <div className="mt-6">
            <AllocationFlow allocations={[...plan.allocations]} />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal>
        <div className="km-card p-5 sm:p-6">
          <SectionHeading title="How this plan was reasoned" />
          <div className="mt-6">
            <DecisionFlow orientation="horizontal" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/app/strategy"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Compare strategies
            </Link>
            <Link
              to="/app/ledger"
              className="rounded-full border border-border px-5 py-2.5 text-sm"
            >
              Open decision ledger
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
