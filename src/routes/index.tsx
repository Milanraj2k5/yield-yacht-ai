import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { AIAssistant } from "@/components/km/AIAssistant";
import { AllocationFlow } from "@/components/km/AllocationFlow";
import { AnalysisSequence } from "@/components/km/AnalysisSequence";
import { BackupPlan } from "@/components/km/BackupPlan";
import { DecisionFlow } from "@/components/km/DecisionFlow";
import { DecisionLedger } from "@/components/km/DecisionLedger";
import { DemandGauge } from "@/components/km/DemandGauge";
import { HarvestFlow } from "@/components/km/HarvestFlow";
import { IntroSequence } from "@/components/km/IntroSequence";
import { LogisticsRoute } from "@/components/km/LogisticsRoute";
import { MarketNetwork } from "@/components/km/MarketNetwork";
import { MarketPulse } from "@/components/km/MarketPulse";
import { MarketShock } from "@/components/km/MarketShock";
import { Footer, Navbar } from "@/components/km/Navbar";
import { PriceChart } from "@/components/km/PriceChart";
import { Recommendation } from "@/components/km/Recommendation";
import { RiskRadar } from "@/components/km/RiskRadar";
import { Simulator } from "@/components/km/Simulator";
import { SpoilageTimeline } from "@/components/km/SpoilageTimeline";
import { StrategyComparison } from "@/components/km/StrategyComparison";
import {
  AnimatedBackground,
  AnimatedNumber,
  DemoBadge,
  Eyebrow,
  GlowButton,
  SectionHeading,
  SectionReveal,
} from "@/components/km/primitives";
import { STRATEGIES } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KrishiMitra MarketOS — Harvest Decision Intelligence" },
      {
        name: "description",
        content:
          "KrishiMitra MarketOS turns market prices, logistics, spoilage and risk into one smart selling plan for your harvest. Interactive demo prototype.",
      },
      { property: "og:title", content: "KrishiMitra MarketOS — Harvest Decision Intelligence" },
      {
        property: "og:description",
        content:
          "Don't just find the best price. Find the best way to move your harvest. Explore the interactive demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.25]);

  return (
    <>
      <IntroSequence />
      <Navbar />
      <AnalysisSequence open={analyzing} onComplete={() => navigate({ to: "/app/strategy" })} />

      <main>
        {/* ---------- HERO ---------- */}
        <section ref={heroRef} className="relative min-h-[92vh] overflow-hidden pt-28 sm:pt-32">
          <AnimatedBackground variant="hero" />
          <motion.div
            style={{ y: heroY, opacity: heroFade }}
            className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr]"
          >
            <div>
              <SectionReveal>
                <Eyebrow>AI harvest decision intelligence</Eyebrow>
              </SectionReveal>
              <h1 className="mt-6 text-balance text-[clamp(2.4rem,6.5vw,4.6rem)] font-semibold leading-[0.98]">
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Don't Just Find the Best Price.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="km-shimmer-text mt-2 block"
                >
                  Find the Best Way to Move Your Harvest.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
              >
                KrishiMitra combines market intelligence, logistics, quality, spoilage and risk to
                create a smarter selling plan for your harvest.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.7 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <GlowButton size="lg" onClick={() => navigate({ to: "/app/harvest" })}>
                  Analyze My Harvest
                </GlowButton>
                <GlowButton size="lg" variant="ghost" onClick={() => navigate({ to: "/demo" })}>
                  Explore Demo
                </GlowButton>
                <DemoBadge className="ml-1" />
              </motion.div>

              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6"
              >
                {[
                  ["1,000 kg", "Demo harvest"],
                  ["₹29,700", "Expected earnings"],
                  ["82%", "Plan confidence"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="km-num text-xl font-semibold sm:text-2xl">{v}</dt>
                    <dd className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {l}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <HarvestFlow />
            </motion.div>
          </motion.div>
        </section>

        {/* ---------- THE PROBLEM ---------- */}
        <Section id="problem">
          <SectionReveal>
            <SectionHeading
              eyebrow="The problem"
              align="center"
              title={
                <>
                  Highest Price <span className="text-danger">≠</span> Highest Profit.
                </>
              }
              subtitle="The mandi board shows one number. What actually reaches your pocket is a different one."
            />
          </SectionReveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-4">
            <SectionReveal>
              <div className="km-card flex items-center justify-between p-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Headline price · Bengaluru
                  </div>
                  <div className="km-num mt-1 text-4xl font-semibold text-gold">₹32.00/kg</div>
                </div>
                <span className="text-3xl">🏙️</span>
              </div>
            </SectionReveal>

            {[
              ["Transport (355 km)", "−₹6.40"],
              ["Packaging & crates", "−₹0.80"],
              ["Risk adjustment", "−₹0.45"],
              ["Spoilage in transit", "−₹0.25"],
            ].map(([l, v], i) => (
              <SectionReveal key={l} delay={i * 0.08}>
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2/40 px-5 py-3.5">
                  <span className="text-sm text-muted-foreground">{l}</span>
                  <span className="km-num font-medium text-danger">{v}</span>
                </div>
              </SectionReveal>
            ))}

            <SectionReveal delay={0.3}>
              <div className="km-card km-hairline-gradient flex items-center justify-between p-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Expected net
                  </div>
                  <AnimatedNumber
                    value={24.1}
                    prefix="₹"
                    decimals={2}
                    suffix="/kg"
                    className="text-4xl font-semibold text-primary"
                  />
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Mangaluru nets{" "}
                  <span className="km-num font-semibold text-leaf">₹25.80</span>
                  <br />
                  at a lower sticker price
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <p className="mt-4 text-center font-display text-xl font-semibold sm:text-2xl">
                KrishiMitra looks at the whole picture.
              </p>
            </SectionReveal>
          </div>
        </Section>

        {/* ---------- HOW IT THINKS ---------- */}
        <Section id="thinking" grid>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionReveal>
                <SectionHeading
                  eyebrow="How KrishiMitra thinks"
                  title="Eight passes before a single kilo moves."
                  subtitle="Every stage narrows the options. What comes out is not the highest price — it's the plan that survives contact with reality."
                />
              </SectionReveal>
            </div>
            <DecisionFlow />
          </div>
        </Section>

        {/* ---------- MARKET NETWORK ---------- */}
        <Section id="network">
          <SectionReveal>
            <SectionHeading
              eyebrow="Interactive"
              title="Your farm sits inside a live network."
              subtitle="Every mandi and buyer is a route with its own price, cost and reliability. Hover a node to inspect it."
            />
          </SectionReveal>
          <SectionReveal delay={0.15} className="mt-10">
            <MarketNetwork />
          </SectionReveal>
        </Section>

        {/* ---------- MARKET PULSE ---------- */}
        <Section id="markets" grid>
          <SectionReveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Market pulse" title="Today's mandi intelligence." />
              <DemoBadge />
            </div>
          </SectionReveal>
          <div className="mt-10">
            <MarketPulse />
          </div>
        </Section>

        {/* ---------- CHART + DEMAND ---------- */}
        <Section id="forecast">
          <SectionReveal>
            <SectionHeading
              eyebrow="Forecast"
              title="Where the price is heading next."
              subtitle="A short-horizon forecast with an honest range — because certainty you don't have is worse than none."
            />
          </SectionReveal>
          <SectionReveal delay={0.1} className="mt-10">
            <PriceChart />
          </SectionReveal>
          <SectionReveal delay={0.1} className="mt-6">
            <DemandGauge />
          </SectionReveal>
        </Section>

        {/* ---------- LOGISTICS / SPOILAGE / RISK ---------- */}
        <Section id="ground-truth" grid>
          <SectionReveal>
            <SectionHeading
              eyebrow="Ground truth"
              title="Distance, freshness and risk decide the rest."
            />
          </SectionReveal>
          <div className="mt-10 space-y-6">
            <SectionReveal>
              <LogisticsRoute />
            </SectionReveal>
            <SectionReveal>
              <SpoilageTimeline />
            </SectionReveal>
            <SectionReveal>
              <RiskRadar />
            </SectionReveal>
          </div>
        </Section>

        {/* ---------- RECOMMENDATION ---------- */}
        <Section id="plan">
          <SectionReveal>
            <SectionHeading
              align="center"
              tone="gold"
              eyebrow="The decision"
              title="One harvest. Four smart destinations."
              subtitle="This is the moment everything above was built for."
            />
          </SectionReveal>
          <SectionReveal delay={0.15} className="mt-12">
            <Recommendation />
          </SectionReveal>
        </Section>

        {/* ---------- STRATEGIES ---------- */}
        <Section id="strategies" grid>
          <SectionReveal>
            <SectionHeading
              eyebrow="Strategy comparison"
              title="Three possible futures for the same harvest."
              subtitle="Hover a strategy and watch the allocation physically rearrange itself."
            />
          </SectionReveal>
          <div className="mt-10">
            <StrategyComparison />
          </div>
        </Section>

        {/* ---------- SIMULATOR ---------- */}
        <Section id="simulator">
          <SectionReveal>
            <SectionHeading
              eyebrow="What-if simulator"
              title="What if the market changes?"
              subtitle="Move a slider. The plan is recalculated and re-argued in front of you."
            />
          </SectionReveal>
          <SectionReveal delay={0.1} className="mt-10">
            <Simulator />
          </SectionReveal>
        </Section>

        {/* ---------- SHOCK + PLAN B ---------- */}
        <Section id="resilience" grid>
          <SectionReveal>
            <SectionHeading
              eyebrow="Resilience"
              title="Plans that survive a bad morning."
              subtitle="A price crash or a buyer who stops answering shouldn't strand your crop."
            />
          </SectionReveal>
          <div className="mt-10 space-y-6">
            <SectionReveal>
              <MarketShock />
            </SectionReveal>
            <SectionReveal>
              <BackupPlan />
            </SectionReveal>
          </div>
        </Section>

        {/* ---------- LEDGER ---------- */}
        <Section id="ledger">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionReveal>
                <SectionHeading
                  eyebrow="Decision ledger"
                  title="How KrishiMitra reached this decision."
                  subtitle="Nothing is hidden behind the word AI. Open any step and read the reasoning."
                />
              </SectionReveal>
              <SectionReveal delay={0.2} className="mt-8">
                <div className="km-card p-5">
                  <AllocationFlow allocations={[...STRATEGIES.balanced.allocations]} compact />
                </div>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.1}>
              <DecisionLedger />
            </SectionReveal>
          </div>
        </Section>

        {/* ---------- FINAL CTA ---------- */}
        <section className="relative overflow-hidden py-28">
          <AnimatedBackground variant="hero" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <SectionReveal>
              <h2 className="text-balance text-[clamp(2rem,5.5vw,3.4rem)] font-semibold leading-[1.05]">
                Your Harvest Deserves a Better Decision.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
                Don't settle for the highest price. Find the smartest way to move your harvest.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <GlowButton size="lg" onClick={() => setAnalyzing(true)}>
                  🚀 Analyze My Harvest
                </GlowButton>
                <Link
                  to="/app"
                  className="inline-flex items-center rounded-full border border-border px-8 py-4 text-base font-medium transition-colors hover:border-primary/50"
                >
                  Open the dashboard
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </>
  );
}

function Section({
  children,
  id,
  grid,
}: {
  children: React.ReactNode;
  id?: string;
  grid?: boolean;
}) {
  return (
    <section id={id} className="relative overflow-hidden py-20 sm:py-28">
      {grid && (
        <div className="km-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
