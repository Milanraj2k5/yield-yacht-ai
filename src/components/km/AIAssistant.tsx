import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AI_QA } from "@/lib/demo-data";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [thinking, setThinking] = useState(false);

  const ask = (i: number) => {
    setActive(i);
    setThinking(true);
    setTimeout(() => setThinking(false), 700);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="km-card km-hairline-gradient mb-3 w-[min(92vw,360px)] overflow-hidden p-4"
            role="dialog"
            aria-label="Ask KrishiMitra"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute h-2 w-2 rounded-full bg-leaf"
                    style={{ animation: "km-pulse-ring 2s ease-out infinite" }}
                  />
                  <span className="h-2 w-2 rounded-full bg-leaf" />
                </span>
                <span className="font-display text-sm font-semibold">Ask KrishiMitra</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {AI_QA.map((qa, i) => (
                <button
                  key={qa.q}
                  onClick={() => ask(i)}
                  className={
                    active === i
                      ? "rounded-full border border-primary/50 bg-primary/12 px-2.5 py-1 text-xs text-primary"
                      : "rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  }
                >
                  {qa.q}
                </button>
              ))}
            </div>

            <div className="mt-3 min-h-[92px] rounded-xl border border-border bg-surface-2/50 p-3 text-sm">
              <AnimatePresence mode="wait">
                {active === null ? (
                  <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
                    Pick a question to see how the plan was reasoned out. Answers use demo data.
                  </motion.p>
                ) : thinking ? (
                  <motion.div key="think" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-primary">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </span>
                    Analyzing…
                  </motion.div>
                ) : (
                  <motion.p
                    key={"a" + active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="leading-relaxed text-foreground"
                  >
                    {AI_QA[active].a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-[0_14px_40px_-14px_var(--color-primary)]"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary/40"
          style={{ animation: "km-pulse-ring 3s ease-out infinite" }}
        />
        <span>🌾</span>
        <span className="hidden sm:inline">Ask KrishiMitra</span>
      </motion.button>
    </div>
  );
}
