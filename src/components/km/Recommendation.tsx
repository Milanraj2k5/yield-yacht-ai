import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { STRATEGIES, WHY_POINTS } from "@/lib/demo-data";
import { AllocationFlow } from "./AllocationFlow";
import { AnimatedNumber, DemoBadge } from "./primitives";

export function Recommendation() {
  const [open, setOpen] = useState(false);
  const plan = STRATEGIES.balanced;

  return (
    <div className="km-card km-hairline-gradient relative overflow-hidden p-5 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-gold) 30%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-gold">
            Recommended by KrishiMitra
          </div>
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">Your best selling plan</h3>
        </div>
        <DemoBadge />
      </div>

      <div className="relative mt-7 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <AllocationFlow allocations={[...plan.allocations]} />

        <div className="flex flex-col justify-between gap-5">
          <div className="rounded-2xl border border-gold/30 bg-gold/8 p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Expected earnings after costs and risk
            </div>
            <div className="mt-2">
              <AnimatedNumber
                value={plan.earnings}
                prefix="₹"
                className="text-[clamp(2.4rem,7vw,3.6rem)] font-semibold text-gold"
                duration={1.8}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Stat label="Risk" value="Medium" />
              <Stat label="Confidence" value={<AnimatedNumber value={82} suffix="%" />} />
              <Stat label="Spoilage" value={<AnimatedNumber value={3.8} decimals={1} suffix="%" />} />
            </div>
          </div>

          <div>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="inline-flex w-full items-center justify-between rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40"
            >
              Why this plan?
              <span className={open ? "rotate-180 transition-transform" : "transition-transform"}>▾</span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-3 space-y-2">
                    {WHY_POINTS.map((p, i) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.09 }}
                        className="flex gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="text-leaf">✓</span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 rounded-xl border border-primary/25 bg-primary/8 p-3 text-sm"
                  >
                    Splitting the harvest provides a stronger overall outcome than sending everything
                    to one market.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-base font-semibold">{value}</div>
    </div>
  );
}
