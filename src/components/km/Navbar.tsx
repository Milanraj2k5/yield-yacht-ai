import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IntelligenceModeToggle } from "./theme";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/demo", label: "Demo" },
  { to: "/app", label: "Dashboard" },
  { to: "/app/markets", label: "Markets" },
  { to: "/app/strategy", label: "Strategy" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled && "backdrop-blur-xl",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6",
          scrolled ? "my-2 rounded-full border border-border bg-surface/75 py-2" : "py-4",
        )}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-base">🌾</span>
          <span className="leading-none">
            <span className="block font-display text-sm font-semibold tracking-tight">
              KRISHIMITRA
            </span>
            <span className="block text-[10px] tracking-[0.28em] text-gold">MARKETOS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" || l.to === "/app" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <IntelligenceModeToggle />
          <Link
            to="/app/harvest"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_12px_30px_-12px_var(--color-primary)] sm:inline-flex"
          >
            Analyze harvest
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

const MOBILE = [
  { to: "/app", label: "Home", icon: "🏠", exact: true },
  { to: "/app/harvest", label: "Harvest", icon: "🌾", exact: false },
  { to: "/app/markets", label: "Markets", icon: "📊", exact: false },
  { to: "/app/strategy", label: "Strategy", icon: "🧠", exact: false },
  { to: "/app/backup", label: "Alerts", icon: "🔔", exact: false },
] as const;

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="App sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/90 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto flex max-w-lg">
        {MOBILE.map((m) => {
          const active = m.exact ? pathname === m.to : pathname.startsWith(m.to);
          return (
            <li key={m.to} className="flex-1">
              <Link
                to={m.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span className="text-base">{m.icon}</span>
                {m.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span>🌾</span>
          <span>KrishiMitra MarketOS · Frontend prototype with demo data</span>
        </div>
        <div className="flex gap-4">
          <Link to="/demo" className="hover:text-foreground">
            Demo
          </Link>
          <Link to="/app" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link to="/app/ledger" className="hover:text-foreground">
            Decision ledger
          </Link>
        </div>
      </div>
    </footer>
  );
}
