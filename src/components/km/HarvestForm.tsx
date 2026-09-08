import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GlowButton } from "./primitives";
import { cn } from "@/lib/utils";

const CROPS = [
  { emoji: "🍅", name: "Tomato" },
  { emoji: "🧅", name: "Onion" },
  { emoji: "🥔", name: "Potato" },
  { emoji: "🌶️", name: "Chilli" },
];

const PRIORITIES = [
  { id: "safe", icon: "🛡️", label: "Safer", desc: "Protect the money I already have." },
  { id: "balanced", icon: "⚖️", label: "Balanced", desc: "Best mix of return and certainty." },
  { id: "aggressive", icon: "🚀", label: "Higher return", desc: "I can absorb some risk." },
] as const;

export function HarvestForm({ onAnalyze }: { onAnalyze: () => void }) {
  const [step, setStep] = useState(0);
  const [crop, setCrop] = useState("Tomato");
  const [qty, setQty] = useState(1000);
  const [gradeA, setGradeA] = useState(600);
  const [gradeB, setGradeB] = useState(300);
  const [storage, setStorage] = useState(2);
  const [priority, setPriority] = useState<string>("balanced");

  const gradeC = Math.max(0, qty - gradeA - gradeB);
  const steps = ["Crop", "Quality", "Storage", "Priority", "Analyze"];

  return (
    <div className="km-card km-hairline-gradient p-5 sm:p-7">
      <ol className="mb-7 flex items-center gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <button
              onClick={() => setStep(i)}
              className={cn(
                "h-1.5 w-full rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-border",
              )}
              aria-label={`Go to step ${i + 1}: ${s}`}
            />
          </li>
        ))}
      </ol>

      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <>
                <Title n={1} title="What did you harvest?" />
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CROPS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setCrop(c.name)}
                      aria-pressed={crop === c.name}
                      className={cn(
                        "rounded-xl border p-4 text-center transition-all hover:-translate-y-0.5",
                        crop === c.name ? "border-primary/50 bg-primary/10" : "border-border bg-surface-2/40",
                      )}
                    >
                      <div className="text-3xl">{c.emoji}</div>
                      <div className="mt-2 text-sm font-medium">{c.name}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="text-sm text-muted-foreground" htmlFor="qty">
                    Quantity harvested
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      id="qty"
                      type="range"
                      min={100}
                      max={3000}
                      step={50}
                      value={qty}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setQty(v);
                        setGradeA(Math.round(v * 0.6));
                        setGradeB(Math.round(v * 0.3));
                      }}
                      className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-[var(--color-primary)]"
                    />
                    <span className="km-num w-28 text-right text-xl font-semibold">
                      {qty.toLocaleString("en-IN")} kg
                    </span>
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <Title n={2} title="What's the quality?" />
                <div className="mt-5 space-y-5">
                  <GradeSlider label="Grade A" value={gradeA} max={qty} onChange={(v) => setGradeA(Math.min(v, qty - gradeB))} tone="primary" />
                  <GradeSlider label="Grade B" value={gradeB} max={qty} onChange={(v) => setGradeB(Math.min(v, qty - gradeA))} tone="gold" />
                  <div className="rounded-xl border border-border bg-surface-2/40 px-4 py-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Grade C (remainder)</span>
                      <span className="km-num font-semibold">{gradeC} kg</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Title n={3} title="How long can you store it?" />
                <div className="mt-8">
                  <input
                    type="range"
                    aria-label="Storage days"
                    min={0}
                    max={3}
                    step={1}
                    value={storage}
                    onChange={(e) => setStorage(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--color-primary)]"
                  />
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    {[0, 1, 2, 3].map((d) => (
                      <span key={d} className={storage === d ? "font-semibold text-primary" : ""}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-border bg-surface-2/40 p-4 text-sm text-muted-foreground">
                    <span className="km-num text-2xl font-semibold text-foreground">{storage} days</span>
                    <p className="mt-2">
                      {storage === 0
                        ? "Everything must move today — the plan will avoid holding any parcel."
                        : `Expected spoilage after ${storage} day${storage === 1 ? "" : "s"}: ${[1.0, 2.0, 3.8, 7.9][storage]}%.`}
                    </p>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Title n={4} title="What's your priority?" />
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriority(p.id)}
                      aria-pressed={priority === p.id}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5",
                        priority === p.id ? "border-primary/50 bg-primary/10" : "border-border bg-surface-2/40",
                      )}
                    >
                      <div className="text-2xl">{p.icon}</div>
                      <div className="mt-2 font-medium">{p.label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <Title n={5} title="Ready to analyze" />
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Summary label="Crop" value={crop} />
                  <Summary label="Quantity" value={`${qty.toLocaleString("en-IN")} kg`} />
                  <Summary label="Grades" value={`A ${gradeA} · B ${gradeB} · C ${gradeC}`} />
                  <Summary label="Storage" value={`${storage} days`} />
                  <Summary label="Priority" value={PRIORITIES.find((p) => p.id === priority)!.label} />
                  <Summary label="Location" value="Udupi, Karnataka" />
                </dl>
                <div className="mt-7">
                  <GlowButton size="lg" className="w-full" onClick={onAnalyze}>
                    Analyze My Harvest
                  </GlowButton>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
        >
          ← Back
        </button>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {steps.length}
        </span>
        <GlowButton
          size="sm"
          variant="ghost"
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          Next
        </GlowButton>
      </div>
    </div>
  );
}

function Title({ n, title }: { n: number; title: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-primary">Step {n}</div>
      <h3 className="mt-1 font-display text-2xl font-semibold">{title}</h3>
    </div>
  );
}

function GradeSlider({
  label,
  value,
  max,
  onChange,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (n: number) => void;
  tone: "primary" | "gold";
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className={tone === "primary" ? "text-primary" : "text-gold"}>{label}</span>
        <span className="km-num font-medium">{value} kg</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={0}
        max={max}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border"
        style={{ accentColor: tone === "primary" ? "var(--color-primary)" : "var(--color-gold)" }}
      />
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/40 px-4 py-3">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}
