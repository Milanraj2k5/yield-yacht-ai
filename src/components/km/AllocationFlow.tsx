import { AnimatePresence, motion } from "motion/react";
import { AnimatedNumber } from "./primitives";
import type { Allocation } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const toneClass: Record<Allocation["tone"], string> = {
  primary: "from-primary/25 to-primary/5 border-primary/35 text-primary",
  gold: "from-gold/25 to-gold/5 border-gold/35 text-gold",
  teal: "from-teal/25 to-teal/5 border-teal/35 text-teal",
  muted: "from-muted-foreground/15 to-transparent border-border text-muted-foreground",
};

export function AllocationFlow({
  allocations,
  total = 1000,
  compact = false,
}: {
  allocations: Allocation[];
  total?: number;
  compact?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between rounded-xl border border-border bg-surface-2/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍅</span>
          <div>
            <div className="km-num text-lg font-semibold">{total.toLocaleString("en-IN")} KG</div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Tomato harvest
            </div>
          </div>
        </div>
        <div className="hidden text-right text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
          Allocated across {allocations.length} destinations
        </div>
      </div>

      <div className={cn("grid gap-3", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <AnimatePresence mode="popLayout">
          {allocations.map((a, i) => {
            const pct = Math.round((a.qty / total) * 100);
            return (
              <motion.div
                key={a.id + a.destination}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative overflow-hidden rounded-xl border bg-gradient-to-br p-4",
                  toneClass[a.tone],
                )}
              >
                <div className="flex items-baseline justify-between">
                  <div className="km-num text-2xl font-semibold text-foreground">
                    <AnimatedNumber value={a.qty} suffix=" kg" duration={0.9} />
                  </div>
                  <div className="km-num text-xs opacity-80">{pct}%</div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
                  <span className="opacity-60">↓</span>
                  <span className="font-medium">{a.destination}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>{a.when}</span>
                  <span className="km-num">₹{a.net.toFixed(2)}/kg net</span>
                </div>
                <motion.div
                  layout
                  className="mt-3 h-1 rounded-full bg-current/20"
                  aria-hidden
                >
                  <motion.div
                    className="h-1 rounded-full bg-current"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
