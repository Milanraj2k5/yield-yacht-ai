import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { DEMAND_FACTORS } from "@/lib/demo-data";
import { AnimatedNumber } from "./primitives";

const VALUE = 84;
const R = 78;
const C = 2 * Math.PI * R;
const SWEEP = 0.75; // 270deg

export function DemandGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="km-card p-5 sm:p-6">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Demand signal
      </div>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative h-48 w-48 shrink-0">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-[225deg]">
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${C * SWEEP} ${C}`}
            />
            <motion.circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="url(#km-gauge)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${C * SWEEP} ${C}`}
              initial={{ strokeDashoffset: C * SWEEP }}
              animate={inView ? { strokeDashoffset: C * SWEEP * (1 - VALUE / 100) } : {}}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="km-gauge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-teal)" />
                <stop offset="60%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-gold)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatedNumber value={VALUE} className="text-5xl font-semibold" duration={1.8} />
            <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              / 100
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="font-display text-xl font-semibold text-primary">Strong demand signal</div>
          <div className="mt-4 space-y-3">
            {DEMAND_FACTORS.map((f, i) => (
              <div key={f.label}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{f.label}</span>
                  <span className="km-num">{f.value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-leaf"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${f.value}%` } : {}}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            Why? <span className={open ? "rotate-180 transition-transform" : "transition-transform"}>▾</span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden text-sm text-muted-foreground"
              >
                <span className="mt-3 block">
                  Arrivals at Mangaluru fell 11% week-on-week while retail enquiries rose. Prices have
                  climbed six sessions in a row and the festive window keeps household demand firm
                  for the next 48 hours.
                </span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
