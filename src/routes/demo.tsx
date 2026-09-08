import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AIAssistant } from "@/components/km/AIAssistant";
import { AllocationFlow } from "@/components/km/AllocationFlow";
import { AnalysisSequence } from "@/components/km/AnalysisSequence";
import { DecisionFlow } from "@/components/km/DecisionFlow";
import { HarvestFlow } from "@/components/km/HarvestFlow";
import { Footer, Navbar } from "@/components/km/Navbar";
import {
  AnimatedBackground,
  AnimatedNumber,
  DemoBadge,
  Eyebrow,
  GlowButton,
  SectionHeading,
  SectionReveal,
  StatTile,
} from "@/components/km/primitives";
import { HARVEST, STRATEGIES } from "@/lib/demo-data";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Guided demo — KrishiMitra MarketOS" },
      {
        name: "description",
        content:
          "Walk through one harvest end to end: the lot, the analysis, the plan and where to explore next.",
      },
      { property: "og:title", content: "Guided demo — KrishiMitra MarketOS" },
      {
        property: "og:description",
        content: "One harvest, start to finish, in about a minute.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoPage,
});

const TOUR = [
  { to: "/app", label: "Dashboard", desc: "The plan, the money, the confidence." },
  { to: "/app/markets", label: "Markets", desc: "Prices, demand, forecast and routes." },
  { to: "/app/strategy", label: "Strategy", desc: "Safe vs balanced vs high return." },
  { to: "/app/simulator", label: "Simulator", desc: "Change conditions, rebuild the plan." },
  { to: "/app/backup", label: "Plan B", desc: "When a buyer or market falls through." },
  { to: "/app/ledger", label: "Ledger", desc: "Every reason, written down." },
] as const;

function DemoPage() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const plan = STRATEGIES.balanced;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-14 px-4 pb-24 pt-28 sm:px-6">
        <SectionReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Guided demo</Eyebrow>
              <SectionHeading
                title="One harvest, start to finish"
                subtitle={`${HARVEST.quantity} kg ${HARVEST.crop} from ${HARVEST.location} — run the analysis and follow the plan through every screen.`}
              />
            </div>
            <DemoBadge />
          </div>
        </SectionReveal>

        <SectionReveal>
          <HarvestFlow />
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatTile label="Lot size">
              <AnimatedNumber value={HARVEST.quantity} suffix=" kg" />
            </StatTile>
            <StatTile label="Recommended earnings" tone="primary">
              <AnimatedNumber value={plan.earnings} prefix="₹" />
            </StatTile>
            <StatTile label="Confidence" tone="teal">
              <AnimatedNumber value={plan.confidence} suffix="%" />
            </StatTile>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="km-card p-5 sm:p-6">
            <SectionHeading title="What the analysis looks at" />
            <div className="mt-6">
              <DecisionFlow orientation="horizontal" />
            </div>
            <div className="mt-6">
              <GlowButton onClick={() => setAnalyzing(true)}>Run the analysis</GlowButton>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="km-card p-5 sm:p-6">
            <SectionHeading title="The plan it lands on" />
            <div className="mt-6">
              <AllocationFlow allocations={[...plan.allocations]} />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOUR.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="km-card p-5 transition-transform hover:-translate-y-1"
              >
                <div className="font-display text-lg font-semibold">{t.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </Link>
            ))}
          </div>
        </SectionReveal>
      </main>

      <Footer />
      <AIAssistant />

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
