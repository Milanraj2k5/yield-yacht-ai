import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { STRATEGIES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const PHASES = ["harvest", "intelligence", "optimizing", "allocation"] as const;
type Phase = (typeof PHASES)[number];

export function HarvestFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("harvest");

  useEffect(() => {
    if (reduce) {
      setPhase("allocation");
      return;
    }
    const timings: [Phase, number][] = [
      ["intelligence", 2200],
      ["optimizing", 4000],
      ["allocation", 5600],
      ["harvest", 11000],
    ];
    const ids = timings.map(([p, t]) => setTimeout(() => setPhase(p), t));
    const loop = setInterval(() => {
      timings.forEach(([p, t]) => setTimeout(() => setPhase(p), t));
    }, 11200);
    return () => {
      ids.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [reduce]);

  const alloc = STRATEGIES.balanced.allocations;

  return (
    <div
      className={cn(
        "km-card km-hairline-gradient relative overflow-hidden p-5 sm:p-7",
        className,
      )}
    >
      <div className="km-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Live pipeline · demo
        </div>
        <div className="flex gap-1.5">
          {PHASES.map((p) => (
            <span
              key={p}
              className={cn(
                "h-1 w-6 rounded-full transition-colors duration-500",
                phase === p ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>

      {/* Energy spine */}
      <div className="relative mt-6 flex gap-5">
        <div className="relative w-6 shrink-0">
          <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-leaf/50 to-gold/60" />
          {!reduce && (
            <motion.span
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-leaf shadow-[0_0_12px_var(--color-leaf)]"
              animate={{ top: ["4%", "94%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="min-h-[300px] flex-1">
          <AnimatePresence mode="wait">
            {phase === "harvest" && (
              <Panel key="h" title="Harvest received">
                <div className="flex flex-wrap gap-1 text-2xl">
                  {Array.from({ length: 10 }, (_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 12, scale: 0.6 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
                    >
                      🍅
                    </motion.span>
                  ))}
                </div>
                <div className="mt-5">
                  <div className="km-num text-4xl font-semibold">1,000 KG</div>
                  <div className="text-sm text-muted-foreground">Tomato · Udupi · Grade A 600</div>
                </div>
              </Panel>
            )}

            {phase === "intelligence" && (
              <Panel key="i" title="Market intelligence">
                <div className="flex flex-col items-center py-4">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-3xl"
                  >
                    🧠
                    <span
                      className="absolute inset-0 rounded-full border border-primary/40"
                      style={{ animation: "km-pulse-ring 2.4s ease-out infinite" }}
                    />
                  </motion.div>
                  <div className="mt-5 w-full space-y-2">
                    {["Scanning markets…", "Evaluating routes…", "Comparing buyers…"].map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.35 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                        {t}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Panel>
            )}

            {phase === "optimizing" && (
              <Panel key="o" title="Optimizing">
                <div className="py-8 text-center">
                  <div className="font-display text-2xl font-semibold tracking-[0.2em] text-primary">
                    OPTIMIZING
                  </div>
                  <div className="mx-auto mt-6 h-1 w-56 overflow-hidden rounded-full bg-border">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="km-num mt-4 text-xs text-muted-foreground">
                    24 allocations · 8 markets · 12 buyers
                  </div>
                </div>
              </Panel>
            )}

            {phase === "allocation" && (
              <Panel key="a" title="Best selling plan">
                <div className="space-y-2">
                  {alloc.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                      className="flex items-center justify-between rounded-lg border border-border bg-surface-2/70 px-3 py-2.5"
                    >
                      <span className="km-num text-base font-semibold">{a.qty} kg</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="flex-1 pl-3 text-sm font-medium">{a.destination}</span>
                      <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {a.when}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 flex items-center justify-between rounded-lg border border-gold/30 bg-gold/10 px-3 py-2.5"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-gold">
                    Expected earnings
                  </span>
                  <span className="km-num text-lg font-semibold text-gold">₹29,700</span>
                </motion.div>
              </Panel>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-primary">{title}</div>
      {children}
    </motion.div>
  );
}
