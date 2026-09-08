import { motion } from "motion/react";
import { useState } from "react";
import { SPOILAGE } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function SpoilageTimeline() {
  const [day, setDay] = useState(0);
  const cur = SPOILAGE[day] ?? SPOILAGE[0]!;

  return (
    <div className="km-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Freshness window
          </div>
          <div className="font-display text-xl font-semibold">How long can this lot wait?</div>
        </div>
        <div className="flex gap-1 rounded-full border border-border p-1">
          {SPOILAGE.map((s, i) => (
            <button
              key={s.day}
              onClick={() => setDay(i)}
              aria-pressed={day === i}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                day === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.day}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Freshness</span>
          <motion.span key={cur.freshness} className="km-num font-medium text-foreground">
            {cur.freshness}%
          </motion.span>
        </div>
        <div className="mt-2 h-4 overflow-hidden rounded-full border border-border bg-surface-2">
          <motion.div
            className="h-full rounded-full"
            animate={{
              width: `${cur.freshness}%`,
              background:
                cur.freshness > 85
                  ? "linear-gradient(90deg, var(--color-primary), var(--color-leaf))"
                  : cur.freshness > 65
                    ? "linear-gradient(90deg, var(--color-leaf), var(--color-amber))"
                    : "linear-gradient(90deg, var(--color-amber), var(--color-danger))",
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SPOILAGE.map((s, i) => (
          <button
            key={s.day}
            onClick={() => setDay(i)}
            className={cn(
              "rounded-xl border p-3 text-left transition-all",
              day === i
                ? "border-primary/50 bg-primary/10"
                : "border-border bg-surface-2/40 hover:-translate-y-0.5",
            )}
          >
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {s.day}
            </div>
            <div
              className={cn(
                "km-num mt-1 text-2xl font-semibold",
                s.loss > 5 ? "text-danger" : s.loss > 3 ? "text-amber" : "text-leaf",
              )}
            >
              {s.loss}%
            </div>
            <div className="text-[11px] text-muted-foreground">expected loss</div>
          </button>
        ))}
      </div>

      <p className="mt-5 rounded-xl border border-border bg-surface-2/40 p-4 text-sm text-muted-foreground">
        Waiting can lift your price — the forecast reaches ₹31.6/kg by day 2 — but spoilage climbs
        faster than the price after that. Beyond day 2 the extra rupee per kilo no longer covers the
        kilos you lose.
      </p>
    </div>
  );
}
