import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AnalysisSequence } from "@/components/km/AnalysisSequence";
import { HarvestForm } from "@/components/km/HarvestForm";
import { DemoBadge, Eyebrow, SectionHeading, SectionReveal } from "@/components/km/primitives";

export const Route = createFileRoute("/app/harvest")({
  head: () => ({
    meta: [
      { title: "Analyze a harvest — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "Describe your crop, grade mix, storage window and priority, then watch the analysis run.",
      },
      { property: "og:title", content: "Analyze a harvest — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "Tell KrishiMitra about your lot and get a full selling plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HarvestPage,
});

function HarvestPage() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div className="space-y-8">
      <SectionReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>New analysis</Eyebrow>
            <SectionHeading
              title="Tell us about your harvest"
              subtitle="Five quick steps. Everything here runs on demo data."
            />
          </div>
          <DemoBadge />
        </div>
      </SectionReveal>

      <SectionReveal>
        <HarvestForm onAnalyze={() => setAnalyzing(true)} />
      </SectionReveal>

      <AnalysisSequence
        open={analyzing}
        onComplete={() => {
          setAnalyzing(false);
          void navigate({ to: "/app" });
        }}
      />
    </div>
  );
}
