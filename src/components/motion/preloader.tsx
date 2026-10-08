"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Cinematic preloader — percentage counter with rotating status words,
 * then a dual-curtain exit that hands off to the hero entrance.
 * Skipped entirely for reduced-motion users.
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduce) {
      onDoneRef.current?.();
      return;
    }
    // Lock scroll while the loader plays (html+body so Lenis can't glide either)
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    let start: number | null = null;
    const DURATION = 2100; // ms
    let handoff = 0; // timer id for the mid-exit handoff
    let exitTimer = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 2.6);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = prevHtml;
          document.body.style.overflow = prevBody;
          // Hand off ~52% into the curtain exit: the curtain lifts
          // bottom-up, so the hero's bottom-first entrance choreography
          // begins exactly as its zones are uncovered — nothing plays
          // hidden behind the curtain.
          handoff = window.setTimeout(() => onDoneRef.current?.(), 500);
        }, 260);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(exitTimer);
      clearTimeout(handoff);
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!(done || reduce) && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050a14]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          aria-label="Loading"
        >
          {/* inner curtain for layered exit */}
          <motion.div
            className="absolute inset-0 bg-[#0a1424]"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.08 }}
          />

          {/* faint grid */}
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" style={{ ["--grid-line" as string]: "rgba(96,165,250,0.10)" }} />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* rotating word */}
            <div className="mb-8 overflow-hidden">
              <motion.p
                key={Math.floor(progress / 25)}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-mono text-xs uppercase tracking-[0.42em] text-[#60a5fa]"
              >
                {["Compiling risk models", "Fitting distributions", "Projecting reserves", "Portfolio ready"][Math.min(3, Math.floor(progress / 25))]}
              </motion.p>
            </div>

            {/* counter */}
            <div className="relative font-display text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none tabular-nums tracking-tight text-transparent">
              <span className="bg-gradient-to-br from-[#f8fafc] via-[#93c5fd] to-[#34d399] bg-clip-text">
                {progress}
              </span>
              <span className="text-[0.35em] align-top text-[#3b5f8f]">%</span>
            </div>

            {/* progress hairline */}
            <div className="mt-8 h-px w-56 overflow-hidden bg-white/10 md:w-72">
              <motion.div
                className="h-full bg-gradient-to-r from-[#60a5fa] to-[#34d399]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#3b5f8f]">
              Naomi Wambui — Actuarial Science
            </p>
          </div>

          {/* corner ticks */}
          <span aria-hidden className="absolute left-6 top-6 h-4 w-4 border-l border-t border-[#60a5fa]/50" />
          <span aria-hidden className="absolute right-6 top-6 h-4 w-4 border-r border-t border-[#34d399]/50" />
          <span aria-hidden className="absolute bottom-6 left-6 h-4 w-4 border-b border-l border-[#34d399]/50" />
          <span aria-hidden className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-[#60a5fa]/50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
