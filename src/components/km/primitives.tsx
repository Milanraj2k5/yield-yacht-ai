import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------- AnimatedBackground ---------------- */

export function AnimatedBackground({
  variant = "default",
  className,
}: {
  variant?: "default" | "grid" | "hero" | "quiet";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "km-noise pointer-events-none absolute inset-0 overflow-hidden",
        variant === "grid" && "km-grid",
        className,
      )}
    >
      {variant !== "quiet" && (
        <>
          <div
            className="km-blob"
            style={{
              width: "46vw",
              height: "46vw",
              top: "-12%",
              left: "-8%",
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 45%, transparent), transparent 70%)",
              opacity: 0.5,
            }}
          />
          <div
            className="km-blob-slow"
            style={{
              width: "38vw",
              height: "38vw",
              bottom: "-14%",
              right: "-6%",
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-gold) 40%, transparent), transparent 70%)",
              opacity: 0.35,
            }}
          />
          {variant === "hero" && (
            <div
              className="km-blob"
              style={{
                width: "30vw",
                height: "30vw",
                top: "30%",
                left: "45%",
                animationDelay: "-8s",
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-teal) 40%, transparent), transparent 70%)",
                opacity: 0.3,
              }}
            />
          )}
        </>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, var(--color-background) 100%)",
        }}
      />
    </div>
  );
}

/* ---------------- SectionReveal ---------------- */

export function SectionReveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- AnimatedNumber ---------------- */

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = 1.4,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (inView || reduce) mv.set(value);
  }, [inView, value, mv, reduce]);

  useEffect(() => spring.on("change", (v) => setDisplay(v)), [spring]);

  const text =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("en-IN");

  return (
    <span ref={ref} className={cn("km-num", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/* ---------------- GlowButton ---------------- */

export function GlowButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  arrow = true,
  disabled,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  arrow?: boolean;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...(disabled ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.97 } })}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-shadow disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-[15px]",
        size === "lg" && "px-8 py-4 text-base",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:shadow-[0_16px_40px_-16px_var(--color-primary)]",
        variant === "gold" &&
          "bg-gold text-gold-foreground hover:shadow-[0_16px_40px_-16px_var(--color-gold)]",
        variant === "ghost" &&
          "border border-border bg-surface/60 text-foreground backdrop-blur hover:border-primary/50 hover:shadow-[0_10px_30px_-18px_var(--color-primary)]",
        className,
      )}
    >
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </motion.button>
  );
}

/* ---------------- Eyebrow / Section header ---------------- */

export function Eyebrow({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "gold" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        tone === "primary"
          ? "border-primary/25 bg-primary/10 text-primary"
          : "border-gold/30 bg-gold/10 text-gold",
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            tone === "primary" ? "bg-primary" : "bg-gold",
          )}
          style={{ animation: "km-pulse-ring 2.4s ease-out infinite" }}
        />
        <span className={cn("relative h-1.5 w-1.5 rounded-full", tone === "primary" ? "bg-primary" : "bg-gold")} />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "primary",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "primary" | "gold";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      Demo data
    </span>
  );
}

export function StatTile({
  label,
  children,
  tone,
}: {
  label: string;
  children: ReactNode;
  tone?: "primary" | "gold" | "danger" | "teal";
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/60 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 text-xl font-semibold",
          tone === "primary" && "text-primary",
          tone === "gold" && "text-gold",
          tone === "danger" && "text-danger",
          tone === "teal" && "text-teal",
        )}
      >
        {children}
      </div>
    </div>
  );
}
