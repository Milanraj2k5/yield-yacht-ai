import { createFileRoute } from "@tanstack/react-router";

import { DecisionLedger } from "@/components/km/DecisionLedger";
import { DemoBadge, Eyebrow, SectionHeading, SectionReveal } from "@/components/km/primitives";

export const Route = createFileRoute("/app/ledger")({
  head: () => ({
    meta: [
      { title: "Decision ledger — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "A step-by-step record of every input, comparison and trade-off behind today's selling plan.",
      },
      { property: "og:title", content: "Decision ledger — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "Every reason behind the plan, written down and expandable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LedgerPage,
});

function LedgerPage() {
  return (
    <div className="space-y-10">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Transparency</Eyebrow>
            <SectionHeading
              title="Why the plan says what it says"
              subtitle="Open any step to read the reasoning behind it."
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <DecisionLedger />
      </SectionReveal>
    </div>
  );
}
