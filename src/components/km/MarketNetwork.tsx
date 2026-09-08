import { motion } from "motion/react";
import { useState } from "react";
import { BUYERS, MARKETS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "market" | "buyer";
  price: number;
  change?: number;
  demand?: number;
  risk?: string;
  net: number;
};

const CX = 300;
const CY = 220;

const NODES: Node[] = [
  ...MARKETS.map((m) => {
    const r = 165;
    const rad = (m.angle * Math.PI) / 180;
    return {
      id: m.id,
      label: m.name,
      x: CX + r * Math.cos(rad),
      y: CY + r * Math.sin(rad) * 0.72,
      kind: "market" as const,
      price: m.price,
      change: m.change,
      demand: m.demand,
      risk: m.risk,
      net: m.net,
    };
  }),
  ...BUYERS.slice(0, 3).map((b, i) => {
    const angles = [30, 90, 255];
    const r = 215;
    const rad = ((angles[i] ?? 0) * Math.PI) / 180;
    return {
      id: b.id,
      label: b.name,
      x: CX + r * Math.cos(rad),
      y: CY + r * Math.sin(rad) * 0.72,
      kind: "buyer" as const,
      price: b.price,
      demand: b.reliability,
      net: b.net,
    };
  }),
];

export function MarketNetwork() {
  const [active, setActive] = useState<string | null>(null);
  const node = NODES.find((n) => n.id === active);

  return (
    <div className="km-card relative overflow-hidden p-4 sm:p-6">
      <div className="km-grid absolute inset-0 opacity-70" aria-hidden />
      <div className="relative grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <svg
          viewBox="0 0 600 440"
          className="w-full touch-manipulation"
          role="img"
          aria-label="Agricultural market network around your farm"
        >
          <defs>
            <radialGradient id="km-farm-glow">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CY} r={110} fill="url(#km-farm-glow)" />

          {NODES.map((n) => {
            const dim = active !== null && active !== n.id;
            return (
              <g key={"line" + n.id} opacity={dim ? 0.15 : 1} style={{ transition: "opacity .3s" }}>
                <line
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  stroke={
                    active === n.id
                      ? "var(--color-gold)"
                      : n.kind === "market"
                        ? "var(--color-primary)"
                        : "var(--color-teal)"
                  }
                  strokeOpacity={active === n.id ? 0.9 : 0.35}
                  strokeWidth={active === n.id ? 2 : 1}
                  className="km-dash-flow"
                />
                <circle r={2.6} fill="var(--color-leaf)" opacity={dim ? 0.2 : 0.9}>
                  <animateMotion
                    dur={`${3 + (n.x % 3)}s`}
                    repeatCount="indefinite"
                    path={`M${CX},${CY} L${n.x},${n.y}`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Farm */}
          <g>
            <circle cx={CX} cy={CY} r={40} fill="var(--color-surface)" stroke="var(--color-primary)" strokeOpacity={0.5} />
            <text x={CX} y={CY - 2} textAnchor="middle" fontSize="22">
              👨‍🌾
            </text>
            <text
              x={CX}
              y={CY + 22}
              textAnchor="middle"
              fontSize="9"
              letterSpacing="2"
              fill="var(--color-muted-foreground)"
            >
              FARM
            </text>
          </g>

          {NODES.map((n) => {
            const dim = active !== null && active !== n.id;
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.label} details`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(n.id)}
                className="cursor-pointer outline-none"
                opacity={dim ? 0.3 : 1}
                style={{ transition: "opacity .3s" }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={30}
                  fill="var(--color-surface)"
                  stroke={active === n.id ? "var(--color-gold)" : "var(--color-border)"}
                  strokeWidth={active === n.id ? 2 : 1}
                />
                <text x={n.x} y={n.y - 3} textAnchor="middle" fontSize="15">
                  {n.kind === "market" ? "🏙️" : "🤝"}
                </text>
                <text
                  x={n.x}
                  y={n.y + 12}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="var(--color-foreground)"
                >
                  ₹{n.price}
                </text>
                <text
                  x={n.x}
                  y={n.y + 46}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--color-foreground)"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-col justify-center">
          <motion.div
            key={node?.id ?? "empty"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn(
              "rounded-xl border p-5",
              node ? "border-gold/40 bg-gold/5" : "border-dashed border-border bg-surface-2/40",
            )}
          >
            {node ? (
              <>
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {node.kind === "market" ? "Mandi" : "Buyer"}
                </div>
                <div className="font-display text-2xl font-semibold">{node.label}</div>
                <div className="km-num mt-3 text-3xl font-semibold text-gold">₹{node.price}/kg</div>
                {node.change !== undefined && (
                  <div className="km-num mt-1 text-sm text-leaf">↑ {node.change}%</div>
                )}
                <dl className="mt-5 space-y-2 text-sm">
                  <Row label={node.kind === "market" ? "Demand" : "Reliability"} value={String(node.demand)} />
                  {node.risk && <Row label="Risk" value={node.risk} />}
                  <Row label="Expected net" value={`₹${node.net.toFixed(2)}/kg`} highlight />
                </dl>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Hover or tap a node to inspect price, demand, risk and expected net realisation for
                your 1,000 kg lot.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("km-num font-medium", highlight && "text-primary")}>{value}</dd>
    </div>
  );
}
