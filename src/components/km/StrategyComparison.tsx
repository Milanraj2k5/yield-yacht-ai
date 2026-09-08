import { motion } from "motion/react";
import { useState } from "react";
import { STRATEGIES, type StrategyKey, inr } from "@/lib/demo-data";
import { AllocationFlow } from "./AllocationFlow";
import { AnimatedNumber } from "./primitives";
import { cn } from "@/lib/utils";

const ORDER: StrategyKey[] = ["safe", "balanced", "aggressive"];

export function StrategyComparison() {
  const [selected, setSelected] = useState<StrategyKey>("balanced");
  const [hovered, setHovered] = useState<StrategyKey | null>(null);
  const shown = hovered ?? selected;
  const s = STRATEGIES[shown];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-1 lg:overflow-visible lg:pb-0">
        {ORDER.map((k) => {
          const st = STRATEGIES[k];
          const active = selected === k;
          return (
            <motion.button
              key={k}
              onMouseEnter={() => setHovered(k)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(k)}
              onBlur={() => setHovered(null)}
              onClick={() => setSelected(k)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              aria-pressed={active}
              className={cn(
                "km-card relative min-w-[260px] shrink-0 snap-start p-5 text-left transition-colors lg:min-w-0",
                active ? "border-primary/50 km-glow" : "hover:border-primary/30",
              )}
            >
              {k === "balanced" && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-foreground">
                  🏆 Recommended
                </span>
              )}
              <div className="flex items-center gap-2 text-lg">
                <span>{st.icon}</span>
                <span className="font-display font-semibold">{st.label}</span>
              </div>
              <div className="km-num mt-3 text-3xl font-semibold">{inr(st.earnings)}</div>
              <p className="mt-2 text-sm text-muted-foreground">{st.blurb}</p>
              <div className="mt-4 flex gap-2 text-[11px] uppercase tracking-[0.12em]">
                <span
                  className={cn(
                    "rounded-full px-2 py-1",
                    st.risk === "Low" && "bg-leaf/15 text-leaf",
                    st.risk === "Medium" && "bg-amber/15 text-amber",
                    st.risk === "High" && "bg-danger/15 text-danger",
                  )}
                >
                  {st.risk} risk
                </span>
                <span className="rounded-full bg-secondary px-2 py-1 text-secondary-foreground">
                  {st.confidence}% confidence
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="km-card km-hairline-gradient p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Allocation preview
          </div>
          <motion.span
            key={s.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium"
          >
            {s.icon} {s.label}
          </motion.span>
        </div>

        <div className="mt-4">
          <AllocationFlow allocations={[...s.allocations]} />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Mini label="Expected" value={<AnimatedNumber key={s.id + "e"} value={s.earnings} prefix="₹" duration={0.8} />} />
          <Mini label="Confidence" value={<AnimatedNumber key={s.id + "c"} value={s.confidence} suffix="%" duration={0.8} />} />
          <Mini label="Spoilage" value={<AnimatedNumber key={s.id + "s"} value={s.spoilage} suffix="%" decimals={1} duration={0.8} />} />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Hover a strategy to preview its future. Click to lock it in.
        </p>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/50 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-semibold">{value}</div>
    </div>
  );
}
