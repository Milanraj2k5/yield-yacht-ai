import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GlowButton } from "./primitives";
import { cn } from "@/lib/utils";

type Stage = "a" | "searching" | "b";

export function BackupPlan() {
  const [stage, setStage] = useState<Stage>("a");

  const trigger = () => {
    setStage("searching");
    setTimeout(() => setStage("b"), 1800);
  };

  return (
    <div className="km-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Resilience
          </div>
          <div className="font-display text-xl font-semibold">Plan A / Plan B</div>
        </div>
        {stage === "a" ? (
          <GlowButton size="sm" variant="ghost" arrow={false} onClick={trigger}>
            Buyer B unavailable
          </GlowButton>
        ) : (
          <GlowButton size="sm" variant="ghost" arrow={false} onClick={() => setStage("a")}>
            Restore Buyer B
          </GlowButton>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <PlanCard
          tag="Plan A"
          name="Buyer B"
          sub="Premium retail chain · 91% reliability"
          qty="300 kg"
          net="₹30.40/kg"
          state={stage === "a" ? "active" : "dead"}
        />
        <AnimatePresence mode="wait">
          {stage === "searching" ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="h-7 w-7 rounded-full border-2 border-primary/30 border-t-primary"
              />
              <div className="mt-3 text-sm text-primary">Searching alternatives…</div>
              <div className="mt-1 text-xs text-muted-foreground">12 buyers re-scored</div>
            </motion.div>
          ) : stage === "b" ? (
            <PlanCard
              key="b"
              tag="Plan B"
              name="Buyer C"
              sub="Processing unit · 86% reliability"
              qty="300 kg"
              net="₹28.20/kg"
              state="active"
              highlight
            />
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground"
            >
              A standby route is always kept warm. Mark the buyer unavailable to see it take over.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {stage === "b" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-border bg-surface-2/50 p-4 text-sm text-muted-foreground"
          >
            300 kg rerouted from Buyer B to Buyer C in one step. Expected earnings adjust to{" "}
            <span className="km-num font-semibold text-foreground">₹29,040</span> — a ₹660 difference,
            with no volume left stranded.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanCard({
  tag,
  name,
  sub,
  qty,
  net,
  state,
  highlight,
}: {
  tag: string;
  name: string;
  sub: string;
  qty: string;
  net: string;
  state: "active" | "dead";
  highlight?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border p-4 transition-colors",
        state === "dead" && "border-danger/30 bg-danger/5 opacity-70",
        state === "active" && !highlight && "border-border bg-surface-2/50",
        state === "active" && highlight && "border-leaf/45 bg-leaf/8",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{tag}</span>
        <span className={state === "dead" ? "text-danger" : "text-leaf"}>
          {state === "dead" ? "❌" : "✓"}
        </span>
      </div>
      <div className={cn("mt-2 font-display text-lg font-semibold", state === "dead" && "line-through")}>
        {name}
      </div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="km-num font-semibold">{qty}</span>
        <span className="km-num text-muted-foreground">{net} net</span>
      </div>
    </motion.div>
  );
}
