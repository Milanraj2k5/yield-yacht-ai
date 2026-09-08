import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { COST_BREAKDOWN } from "@/lib/demo-data";
import { AnimatedNumber } from "./primitives";

export function LogisticsRoute() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const net = COST_BREAKDOWN.reduce((a, b) => a + b.value, 0);

  return (
    <div ref={ref} className="km-card relative overflow-hidden p-5 sm:p-6">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Route · Udupi → Mangaluru
          </div>
          <svg viewBox="0 0 520 170" className="mt-4 w-full" role="img" aria-label="Truck route animation">
            <path
              id="km-route"
              d="M60,120 C160,120 180,50 280,50 C380,50 400,110 470,110"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <motion.path
              d="M60,120 C160,120 180,50 280,50 C380,50 400,110 470,110"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <text x="60" y="150" textAnchor="middle" fontSize="11" fill="var(--color-muted-foreground)">
              FARM
            </text>
            <text x="60" y="105" textAnchor="middle" fontSize="18">
              👨‍🌾
            </text>
            <text x="470" y="140" textAnchor="middle" fontSize="11" fill="var(--color-muted-foreground)">
              MANGALURU
            </text>
            <text x="470" y="95" textAnchor="middle" fontSize="18">
              🏙️
            </text>
            <g>
              <text fontSize="20">
                🚚
                <animateMotion dur="5s" repeatCount="indefinite" rotate="auto-reverse">
                  <mpath href="#km-route" />
                </animateMotion>
              </text>
            </g>
          </svg>

          <div className="mt-2 grid grid-cols-3 gap-3">
            {[
              ["Distance", "55 km"],
              ["Transit", "1h 20m"],
              ["Freight", "₹3.20/kg"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-border bg-surface-2/50 px-3 py-2.5">
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{l}</div>
                <div className="km-num mt-0.5 text-base font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-2/40 p-4">
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Net realisation
          </div>
          <ul className="mt-3 space-y-2">
            {COST_BREAKDOWN.map((c, i) => (
              <motion.li
                key={c.label}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{c.label}</span>
                <span
                  className={
                    c.kind === "base" ? "km-num font-medium" : "km-num font-medium text-danger"
                  }
                >
                  {c.value > 0 ? "₹" : "−₹"}
                  {Math.abs(c.value).toFixed(2)}
                </span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Expected net per kg
            </div>
            <AnimatedNumber
              value={net}
              prefix="₹"
              decimals={2}
              className="text-4xl font-semibold text-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
