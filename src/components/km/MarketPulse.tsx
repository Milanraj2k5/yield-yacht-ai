import { motion } from "motion/react";
import { MARKETS } from "@/lib/demo-data";
import { AnimatedNumber } from "./primitives";
import { cn } from "@/lib/utils";

export function MarketPulse({ onSelect }: { onSelect?: (id: string) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {MARKETS.map((m, i) => (
        <motion.button
          key={m.id}
          type="button"
          onClick={() => onSelect?.(m.id)}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="km-card group relative overflow-hidden p-5 text-left transition-colors hover:border-primary/40"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="flex items-start justify-between">
            <div>
              <div className="font-display text-lg font-semibold">{m.name}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {m.distanceKm} km · {m.risk} risk
              </div>
            </div>
            <span
              className={cn(
                "km-num rounded-full px-2 py-1 text-xs font-medium",
                m.change > 4 ? "bg-leaf/15 text-leaf" : "bg-teal/15 text-teal",
              )}
            >
              ↑ {m.change}%
            </span>
          </div>

          <div className="mt-5 flex items-end gap-1">
            <AnimatedNumber value={m.price} prefix="₹" className="text-4xl font-semibold" />
            <span className="pb-1 text-sm text-muted-foreground">/kg</span>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <span>Demand</span>
              <span className="km-num">{m.demand}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-leaf"
                initial={{ width: 0 }}
                whileInView={{ width: `${m.demand}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
            <span className="text-muted-foreground">Expected net</span>
            <span className="km-num font-semibold text-primary">₹{m.net.toFixed(2)}/kg</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
