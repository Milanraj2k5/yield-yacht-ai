import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LEDGER } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function DecisionLedger() {
  const [open, setOpen] = useState<number | null>(LEDGER.length - 1);

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border" />
      <motion.div
        className="absolute left-[15px] top-3 w-px origin-top bg-gradient-to-b from-primary via-leaf to-gold"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        style={{ bottom: 12 }}
      />
      <ol className="space-y-2">
        {LEDGER.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="relative pl-11"
            >
              <span
                className={cn(
                  "absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full border text-xs",
                  item.best
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-primary/40 bg-primary/10 text-primary",
                )}
              >
                {item.best ? "🏆" : "✓"}
              </span>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                  isOpen ? "border-primary/40 bg-surface" : "border-border bg-surface-2/40 hover:border-primary/30",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={cn("font-medium", item.best && "text-gold")}>{item.title}</span>
                  <span
                    className={cn(
                      "text-xs text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                  >
                    ▾
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm text-muted-foreground"
                    >
                      <span className="mt-2 block">{item.detail}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
