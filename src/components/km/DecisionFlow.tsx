import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const STAGES = [
  { icon: "🌾", label: "Harvest", desc: "Crop, grade mix, quantity and storage window." },
  { icon: "📊", label: "Market data", desc: "Live-style mandi prices, arrivals and momentum." },
  { icon: "🔮", label: "Forecast", desc: "Short-horizon price path with expected range." },
  { icon: "⚠️", label: "Risk", desc: "Price, weather, transport, buyer and spoilage." },
  { icon: "🚚", label: "Logistics", desc: "Route cost, time and reliability per destination." },
  { icon: "🥬", label: "Spoilage", desc: "Freshness decay curve across the storage window." },
  { icon: "🧮", label: "Optimization", desc: "Thousands of splits scored on expected net." },
  { icon: "🏆", label: "Best plan", desc: "The allocation with the strongest risk-adjusted return." },
];

export function DecisionFlow({
  orientation = "vertical",
  className,
}: {
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (orientation === "horizontal") {
    return (
      <div className={cn("flex gap-3 overflow-x-auto pb-2", className)}>
        {STAGES.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="km-card min-w-[150px] shrink-0 p-3"
          >
            <div className="text-xl">{s.icon}</div>
            <div className="mt-2 text-sm font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border sm:left-[31px]" />
      <motion.div
        className="absolute left-[27px] top-4 w-px origin-top bg-gradient-to-b from-primary via-leaf to-gold sm:left-[31px]"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{ bottom: 16 }}
      />
      <ul className="space-y-3">
        {STAGES.map((s, i) => (
          <motion.li
            key={s.label}
            initial={reduce ? false : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex items-start gap-4"
          >
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-xl shadow-[var(--shadow-card)] transition-colors group-hover:border-primary/50">
              {s.icon}
            </span>
            <div className="km-card flex-1 p-4 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40">
              <div className="flex items-center gap-2">
                <span className="km-num text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-semibold">{s.label}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
