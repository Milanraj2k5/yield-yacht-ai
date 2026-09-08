import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AnimatedNumber, GlowButton } from "./primitives";
import { cn } from "@/lib/utils";

export function MarketShock() {
  const [shocked, setShocked] = useState(false);

  return (
    <div className={cn("km-card relative overflow-hidden p-5 transition-colors sm:p-6", shocked && "border-danger/40")}>
      <AnimatePresence>
        {shocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 30% 20%, color-mix(in oklab, var(--color-danger) 18%, transparent), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Mangaluru mandi
          </div>
          <div className="mt-2 flex items-end gap-3">
            <motion.div
              key={shocked ? "s" : "n"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("km-num text-5xl font-semibold", shocked ? "text-danger" : "text-primary")}
            >
              <AnimatedNumber value={shocked ? 24 : 30} prefix="₹" duration={0.8} />
              <span className="text-lg text-muted-foreground">/kg</span>
            </motion.div>
            {shocked && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-2 rounded-full bg-danger/15 px-2 py-1 text-xs font-medium text-danger"
              >
                ↓ 20%
              </motion.span>
            )}
          </div>

          <AnimatePresence>
            {shocked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 space-y-2"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-danger/40 bg-danger/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-danger">
                  ⚡ Market shock detected
                </div>
                {[
                  ["Price", "↓ 20%"],
                  ["Supply pressure", "↑ heavy arrivals"],
                  ["Risk", "↑ Medium → High"],
                ].map(([l, v], i) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    className="flex justify-between rounded-lg border border-border bg-surface-2/50 px-3 py-2 text-sm"
                  >
                    <span className="text-muted-foreground">{l}</span>
                    <span className="font-medium text-danger">{v}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex gap-3">
            <GlowButton size="sm" variant={shocked ? "ghost" : "primary"} onClick={() => setShocked((s) => !s)} arrow={false}>
              {shocked ? "Reset market" : "Simulate market shock"}
            </GlowButton>
          </div>
        </div>

        <svg viewBox="0 0 380 240" className="w-full" role="img" aria-label="Rerouting after market shock">
          <circle cx="60" cy="120" r="26" fill="var(--color-surface)" stroke="var(--color-border)" />
          <text x="60" y="126" textAnchor="middle" fontSize="16">👨‍🌾</text>

          <line
            x1="86" y1="120" x2="274" y2="60"
            stroke={shocked ? "var(--color-danger)" : "var(--color-primary)"}
            strokeOpacity={shocked ? 0.25 : 0.8}
            strokeWidth="2"
            className={shocked ? undefined : "km-dash-flow"}
            style={{ transition: "stroke .5s, stroke-opacity .5s" }}
          />
          <line
            x1="86" y1="120" x2="274" y2="185"
            stroke={shocked ? "var(--color-gold)" : "var(--color-border)"}
            strokeOpacity={shocked ? 0.95 : 0.4}
            strokeWidth={shocked ? 2.5 : 1.5}
            className={shocked ? "km-dash-flow" : undefined}
            style={{ transition: "stroke .5s" }}
          />

          <g>
            <circle
              cx="300" cy="60" r="30"
              fill="var(--color-surface)"
              stroke={shocked ? "var(--color-danger)" : "var(--color-primary)"}
              strokeWidth={shocked ? 2 : 1}
            />
            {shocked && (
              <circle cx="300" cy="60" r="30" fill="none" stroke="var(--color-danger)" opacity={0.6}>
                <animate attributeName="r" values="30;46" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
            <text x="300" y="58" textAnchor="middle" fontSize="14">🏙️</text>
            <text x="300" y="104" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">
              Mangaluru
            </text>
          </g>

          <g opacity={shocked ? 1 : 0.55} style={{ transition: "opacity .5s" }}>
            <circle
              cx="300" cy="185" r="30"
              fill="var(--color-surface)"
              stroke={shocked ? "var(--color-gold)" : "var(--color-border)"}
              strokeWidth={shocked ? 2 : 1}
            />
            <text x="300" y="183" textAnchor="middle" fontSize="14">🤝</text>
            <text x="300" y="229" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">
              Buyer B + Local
            </text>
          </g>
        </svg>
      </div>

      <AnimatePresence>
        {shocked && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative mt-4 rounded-xl border border-border bg-surface-2/50 p-4 text-sm text-muted-foreground"
          >
            KrishiMitra pulled 450 kg off the Mangaluru route and rebalanced it to Buyer B and local
            demand. Revised expectation: <span className="km-num font-semibold text-foreground">₹27,150</span>{" "}
            instead of ₹29,700 — but ₹3,900 better than dispatching into the crash.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
