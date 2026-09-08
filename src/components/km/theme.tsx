import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const KEY = "km-theme";

export function useTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null;
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem(KEY, next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return { dark, toggle };
}

export function IntelligenceModeToggle({ className }: { className?: string }) {
  const { dark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Toggle Intelligence Mode"
      title="Intelligence Mode"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "relative h-4 w-7 rounded-full transition-colors",
          dark ? "bg-primary/70" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-background transition-transform",
            dark ? "translate-x-3.5" : "translate-x-0.5",
          )}
        />
      </span>
      <span className="hidden sm:inline">Intelligence Mode</span>
    </button>
  );
}
