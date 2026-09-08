import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STEPS = [
  "Harvest profile",
  "Market prices",
  "Market trends",
  "Buyer opportunities",
  "Logistics",
  "Spoilage",
  "Weather",
  "Risk",
];

const PHRASES = ["Optimizing allocation…", "Finding the best plan…"];

export function AnalysisSequence({
  open,
  onComplete,
}: {
  open: boolean;
  onComplete: () => void;
}) {
  const [done, setDone] = useState(0);
  const [phase, setPhase] = useState<"steps" | "optimizing" | "complete">("steps");

  useEffect(() => {
    if (!open) {
      setDone(0);
      setPhase("steps");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => timers.push(setTimeout(() => setDone(i + 1), 260 * (i + 1))));
    timers.push(setTimeout(() => setPhase("optimizing"), 260 * STEPS.length + 300));
    timers.push(setTimeout(() => setPhase("complete"), 260 * STEPS.length + 2100));
    timers.push(setTimeout(() => onComplete(), 260 * STEPS.length + 4200));
    return () => timers.forEach(clearTimeout);
  }, [open, onComplete]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-background/95 px-6 backdrop-blur-xl"
          role="status"
          aria-live="polite"
        >
          <div className="km-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="relative w-full max-w-md">
            <AnimatePresence mode="wait">
              {phase !== "complete" ? (
                <motion.div key="run" exit={{ opacity: 0, y: -12 }}>
                  <div className="font-display text-2xl font-semibold">Analyzing your harvest…</div>
                  <ul className="mt-6 space-y-2">
                    {STEPS.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0.25 }}
                        animate={{ opacity: i < done ? 1 : 0.25 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className={i < done ? "text-leaf" : "text-muted-foreground"}>
                          {i < done ? "✓" : "○"}
                        </span>
                        <span className={i < done ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {phase === "optimizing" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-2xl"
                      >
                        🧠
                      </motion.div>
                      <div className="mt-4 space-y-1">
                        {PHRASES.map((p, i) => (
                          <motion.div
                            key={p}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.6 }}
                            className="text-sm text-muted-foreground"
                          >
                            {p}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="font-display text-2xl font-semibold text-leaf">✓ Analysis complete</div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      ["24", "possible allocations"],
                      ["8", "market opportunities"],
                      ["12", "buyer opportunities"],
                      ["1", "recommended plan"],
                    ].map(([n, l], i) => (
                      <motion.div
                        key={l}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="km-card p-4"
                      >
                        <div className="km-num text-2xl font-semibold text-primary">{n}</div>
                        <div className="text-xs text-muted-foreground">{l}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
