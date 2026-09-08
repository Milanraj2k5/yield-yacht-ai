import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const KEY = "km-intro-seen";
const WORD = "KRISHIMITRA";

export function IntroSequence({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen || reduce) {
      setReady(true);
      onDone?.();
      return;
    }
    setShow(true);
    setReady(true);
    const t = setTimeout(() => finish(), 4200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
    onDone?.();
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 4 + Math.random() * 6,
        delay: Math.random() * 2,
        s: 1 + Math.random() * 2,
      })),
    [],
  );

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[oklch(0.13_0.015_165)]"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[oklch(0.8_0.18_138)]"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
              animate={{ opacity: [0, 0.7, 0], y: [0, -40] }}
              transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, oklch(0.72 0.16 148 / 12%), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl drop-shadow-[0_0_30px_oklch(0.8_0.18_138_/_0.5)]"
            >
              🌾
            </motion.div>

            <div className="mt-6 flex overflow-hidden">
              {WORD.split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[clamp(1.8rem,7vw,3.6rem)] font-semibold tracking-[0.12em] text-[oklch(0.96_0.01_100)]"
                >
                  {c}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.34em" }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-1 font-display text-[clamp(0.7rem,2.4vw,1.05rem)] font-medium text-[oklch(0.82_0.15_80)]"
            >
              MARKETOS
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="mt-8 max-w-md text-sm text-[oklch(0.75_0.02_140)] sm:text-base"
            >
              Don't Just Find the Best Price.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9, duration: 0.6 }}
              className="mt-1 max-w-md text-sm text-[oklch(0.9_0.02_120)] sm:text-base"
            >
              Find the Best Way to Move Your Harvest.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 3.4, ease: "linear" }}
              className="mt-10 h-px w-40 origin-left bg-gradient-to-r from-transparent via-[oklch(0.8_0.18_138)] to-transparent"
            />
          </div>

          <button
            onClick={finish}
            className="absolute bottom-6 right-6 rounded-full border border-white/15 px-4 py-2 text-xs text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
