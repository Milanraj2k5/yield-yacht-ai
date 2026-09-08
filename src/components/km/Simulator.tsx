import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { STRATEGIES, type Allocation, inr } from "@/lib/demo-data";
import { AllocationFlow } from "./AllocationFlow";
import { AnimatedNumber } from "./primitives";
import { cn } from "@/lib/utils";

type Weather = "low" | "medium" | "high";

export function Simulator() {
  const [bengaluruPrice, setPrice] = useState(32);
  const [transport, setTransport] = useState(3.2);
  const [storage, setStorage] = useState(2);
  const [weather, setWeather] = useState<Weather>("medium");

  const result = useMemo(
    () => simulate(bengaluruPrice, transport, storage, weather),
    [bengaluruPrice, transport, storage, weather],
  );

  const changed =
    result.headline !== "Balanced plan holds" || result.earnings !== STRATEGIES.balanced.earnings;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
      <div className="km-card space-y-6 p-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Market conditions
        </div>

        <Control
          label="Bengaluru price"
          value={`₹${bengaluruPrice.toFixed(1)}/kg`}
          min={24}
          max={42}
          step={0.5}
          current={bengaluruPrice}
          onChange={setPrice}
        />
        <Control
          label="Transport cost"
          value={`₹${transport.toFixed(2)}/kg`}
          min={1}
          max={8}
          step={0.1}
          current={transport}
          onChange={setTransport}
        />
        <Control
          label="Storage window"
          value={`${storage} day${storage === 1 ? "" : "s"}`}
          min={0}
          max={3}
          step={1}
          current={storage}
          onChange={setStorage}
        />

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Weather risk</span>
            <span className="km-num capitalize">{weather}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["low", "medium", "high"] as Weather[]).map((w) => (
              <button
                key={w}
                onClick={() => setWeather(w)}
                aria-pressed={weather === w}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors",
                  weather === w
                    ? "border-primary/50 bg-primary/12 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30",
                )}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setPrice(32);
            setTransport(3.2);
            setStorage(2);
            setWeather("medium");
          }}
          className="w-full rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          Reset to demo baseline
        </button>
      </div>

      <div className="km-card p-5 sm:p-6">
        <AnimatePresence>
          {changed && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/12 px-3 py-1.5 text-xs font-medium text-amber"
            >
              ⚡ Recommendation changed
            </motion.div>
          )}
        </AnimatePresence>

        <AllocationFlow allocations={result.allocations} />

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 sm:col-span-1">
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Expected
            </div>
            <AnimatedNumber
              key={result.earnings}
              value={result.earnings}
              prefix="₹"
              className="text-2xl font-semibold text-gold"
              duration={0.9}
            />
          </div>
          <div className="rounded-xl border border-border bg-surface-2/50 px-4 py-3 sm:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Why the plan looks like this
            </div>
            <motion.p key={result.reason} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm">
              {result.reason}
            </motion.p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Baseline plan is {inr(STRATEGIES.balanced.earnings)}. All values are demo simulations.
        </p>
      </div>
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="km-num font-medium">{value}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--color-primary)]"
      />
    </div>
  );
}

function simulate(price: number, transport: number, storage: number, weather: Weather) {
  const netBengaluru = price - transport * 2 - 1.5;
  const weatherPenalty = weather === "high" ? 0.85 : weather === "medium" ? 0.96 : 1.02;
  const storageBonus = storage >= 2 ? 1.02 : storage === 1 ? 1.0 : 0.97;

  let allocations: Allocation[];
  let reason: string;
  let headline: string;

  if (netBengaluru > 26.5 && weather !== "high") {
    headline = "Bengaluru opens up";
    allocations = [
      { id: "x1", qty: 500, destination: "Bengaluru", when: "Today", net: netBengaluru, tone: "gold" },
      { id: "x2", qty: 300, destination: "Buyer B", when: "Today", net: 30.4, tone: "primary" },
      { id: "x3", qty: 200, destination: "Local Buyer", when: "Tomorrow", net: 25.1, tone: "teal" },
    ];
    reason = `At ₹${price.toFixed(1)}/kg with ₹${transport.toFixed(2)} freight, Bengaluru nets ₹${netBengaluru.toFixed(2)}/kg — enough to justify the long haul.`;
  } else if (weather === "high") {
    headline = "Weather pulls the plan home";
    allocations = [
      { id: "x1", qty: 150, destination: "Mangaluru", when: "Today", net: 25.8, tone: "primary" },
      { id: "x2", qty: 300, destination: "Local Buyer", when: "Today", net: 25.1, tone: "teal" },
      { id: "x3", qty: 300, destination: "Buyer B", when: "Today", net: 30.4, tone: "gold" },
      { id: "x4", qty: 250, destination: "Udupi", when: "Today", net: 25.2, tone: "muted" },
    ];
    reason =
      "Heavy rain risk raises long-distance transport failure. The plan pulls volume closer to the farm and clears it faster.";
  } else if (transport > 5) {
    headline = "Freight eats the spread";
    allocations = [
      { id: "x1", qty: 400, destination: "Udupi", when: "Today", net: 25.2, tone: "primary" },
      { id: "x2", qty: 300, destination: "Buyer B", when: "Today", net: 30.4, tone: "gold" },
      { id: "x3", qty: 300, destination: "Local Buyer", when: "Today", net: 25.1, tone: "teal" },
    ];
    reason = `Freight at ₹${transport.toFixed(2)}/kg wipes out the distant price advantage, so nearby demand wins.`;
  } else if (storage === 0) {
    headline = "No storage, no waiting";
    allocations = [
      { id: "x1", qty: 550, destination: "Mangaluru", when: "Today", net: 25.8, tone: "primary" },
      { id: "x2", qty: 300, destination: "Buyer B", when: "Today", net: 30.4, tone: "gold" },
      { id: "x3", qty: 150, destination: "Local Buyer", when: "Today", net: 25.1, tone: "teal" },
    ];
    reason = "With no storage, everything must clear today — the hold parcel is redistributed.";
  } else {
    headline = "Balanced plan holds";
    allocations = [...STRATEGIES.balanced.allocations];
    reason = `Bengaluru nets only ₹${netBengaluru.toFixed(2)}/kg after transport and risk, so the balanced split remains strongest.`;
  }

  const earnings = Math.round(
    allocations.reduce((sum, a) => sum + a.qty * a.net, 0) * weatherPenalty * storageBonus,
  );

  return { allocations, reason, headline, earnings };
}
