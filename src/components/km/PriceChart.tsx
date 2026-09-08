import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FORECAST_SERIES, PRICE_SERIES } from "@/lib/demo-data";

const W = 720;
const H = 300;
const PAD = 34;

export function PriceChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const all = [...PRICE_SERIES, ...FORECAST_SERIES];
  const min = Math.min(...all) - 2;
  const max = Math.max(...all) + 2;
  const total = all.length;

  const x = (i: number) => PAD + (i / (total - 1)) * (W - PAD * 2);
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2);

  const histPath = PRICE_SERIES.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const fStart = PRICE_SERIES.length - 1;
  const forePath = [PRICE_SERIES[fStart], ...FORECAST_SERIES]
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(fStart + i)},${y(v)}`)
    .join(" ");

  // moving average
  const ma = PRICE_SERIES.map((_, i) => {
    const s = PRICE_SERIES.slice(Math.max(0, i - 2), i + 1);
    return s.reduce((a, b) => a + b, 0) / s.length;
  });
  const maPath = ma.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");

  const bandTop = [PRICE_SERIES[fStart], ...FORECAST_SERIES.map((v) => v + 1.6)];
  const bandBot = [PRICE_SERIES[fStart], ...FORECAST_SERIES.map((v) => v - 1.6)];
  const bandPath =
    bandTop.map((v, i) => `${i === 0 ? "M" : "L"}${x(fStart + i)},${y(v)}`).join(" ") +
    " " +
    bandBot
      .map((v, i) => `L${x(fStart + bandBot.length - 1 - i)},${y(bandBot[bandBot.length - 1 - i])}`)
      .join(" ") +
    " Z";

  return (
    <div ref={ref} className="km-card relative overflow-hidden p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Tomato · Mangaluru mandi
          </div>
          <div className="font-display text-xl font-semibold">14-day price & forecast</div>
        </div>
        <div className="flex gap-4 text-[11px] text-muted-foreground">
          <Legend color="var(--color-primary)" label="Actual" />
          <Legend color="var(--color-teal)" label="Moving avg" dashed />
          <Legend color="var(--color-gold)" label="Forecast" dashed />
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Price history and forecast chart">
        <defs>
          <linearGradient id="km-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PAD}
            x2={W - PAD}
            y1={PAD + t * (H - PAD * 2)}
            y2={PAD + t * (H - PAD * 2)}
            stroke="var(--color-border)"
            strokeDasharray="3 6"
          />
        ))}

        <motion.path
          d={`${histPath} L${x(fStart)},${H - PAD} L${x(0)},${H - PAD} Z`}
          fill="url(#km-area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />

        <motion.path
          d={bandPath}
          fill="var(--color-gold)"
          fillOpacity={0.12}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        <motion.path
          d={maPath}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth={1.5}
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        <motion.path
          d={histPath}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        <motion.path
          d={forePath}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={2.5}
          strokeDasharray="7 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.1, delay: 1.4, ease: "easeInOut" }}
        />

        <motion.circle
          cx={x(fStart + 1)}
          cy={y(FORECAST_SERIES[1])}
          r={6}
          fill="var(--color-gold)"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 2.1, type: "spring" }}
        />
        <line
          x1={x(fStart)}
          x2={x(fStart)}
          y1={PAD}
          y2={H - PAD}
          stroke="var(--color-gold)"
          strokeOpacity={0.4}
          strokeDasharray="4 4"
        />
        <text x={x(fStart) + 6} y={PAD + 12} fontSize="10" fill="var(--color-gold)" letterSpacing="1.5">
          FORECAST
        </text>
      </svg>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Cell label="Today" value="₹30.00/kg" />
        <Cell label="Tomorrow" value="₹31.00/kg" accent />
        <Cell label="Expected range" value="₹29 – ₹33" />
      </div>
    </div>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-0.5 w-5"
        style={{
          background: dashed
            ? `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)`
            : color,
        }}
      />
      {label}
    </span>
  );
}

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-gold/30 bg-gold/10 px-4 py-3"
          : "rounded-xl border border-border bg-surface-2/50 px-4 py-3"
      }
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className={`km-num mt-1 text-lg font-semibold ${accent ? "text-gold" : ""}`}>{value}</div>
    </div>
  );
}
