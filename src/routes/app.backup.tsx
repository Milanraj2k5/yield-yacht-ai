import { createFileRoute } from "@tanstack/react-router";

import { BackupPlan } from "@/components/km/BackupPlan";
import { MarketShock } from "@/components/km/MarketShock";
import { DemoBadge, Eyebrow, SectionHeading, SectionReveal } from "@/components/km/primitives";

export const Route = createFileRoute("/app/backup")({
  head: () => ({
    meta: [
      { title: "Plan B & alerts — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "When a buyer disappears or a market crashes, see the fallback plan KrishiMitra switches to.",
      },
      { property: "og:title", content: "Plan B & alerts — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "A ready fallback for the day the plan breaks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BackupPage,
});

function BackupPage() {
  return (
    <div className="space-y-12">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow tone="gold">Contingency</Eyebrow>
            <SectionHeading
              title="If the plan breaks, there is already a Plan B"
              subtitle="Buyer drops out or a mandi crashes — the harvest still moves."
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <BackupPlan />
      </SectionReveal>
      <SectionReveal>
        <MarketShock />
      </SectionReveal>
    </div>
  );
}
