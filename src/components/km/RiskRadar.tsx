import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RISK_FACTORS } from "@/lib/demo-data";

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 105;

export function RiskRadar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const n = RISK_FACTORS.length;

  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = (v / 100) * R;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
  };

  const poly = RISK_FACTORS.map((f, i) => point(i, f.value).join(",")).join(" ");

  return (
    <div ref={ref} className="km-card p-5 sm:p-6">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Risk profile
      </div>
      <div className="mt-2 grid items-center gap-4 sm:grid-cols-[1fr_1fr]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" role="img" aria-label="Risk radar chart">
          {[0.25, 0.5, 0.75, 1].map((t) => (
            <polygon
              key={t}
              points={RISK_FACTORS.map((_, i) => point(i, t * 100).join(",")).join(" ")}
              fill="none"
              stroke="var(--color-border)"
            />
          ))}
          {RISK_FACTORS.map((f, i) => {
            const [px, py] = point(i, 100);
            const [lx, ly] = point(i, 128);
            return (
              <g key={f.label}>
                <line x1={CX} y1={CY} x2={px} y2={py} stroke="var(--color-border)" />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="var(--color-muted-foreground)"
                >
                  {f.label}
                </text>
              </g>
            );
          })}
          <motion.polygon
            points={poly}
            fill="var(--color-amber)"
            fillOpacity={0.18}
            stroke="var(--color-amber)"
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            style={{ transformOrigin: "center" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          {RISK_FACTORS.map((f, i) => {
            const [px, py] = point(i, f.value);
            return (
              <motion.circle
                key={f.label}
                cx={px}
                cy={py}
                r={4}
                fill="var(--color-amber)"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
              />
            );
          })}
          <text x={CX} y={CY + 4} textAnchor="middle" fontSize="16" fill="var(--color-foreground)" letterSpacing="2">
            MEDIUM
          </text>
        </svg>

        <div>
          <div className="rounded-xl border border-amber/30 bg-amber/10 p-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-amber">Main risk</div>
            <div className="mt-1 font-display text-lg font-semibold">Transport reliability</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Long-haul dispatch to Bengaluru scores 78/100 on risk — delays on the ghat section
              directly convert into spoilage.
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {RISK_FACTORS.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="w-20 text-muted-foreground">{f.label}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{
                      background:
                        f.value > 70 ? "var(--color-danger)" : f.value > 45 ? "var(--color-amber)" : "var(--color-leaf)",
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${f.value}%` } : {}}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </span>
                <span className="km-num w-8 text-right text-xs text-muted-foreground">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
