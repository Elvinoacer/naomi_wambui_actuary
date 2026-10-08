"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { profile } from "@/lib/portfolio";
import { Sparkline } from "@/components/charts/hero-charts";
import { ScrollTextReveal } from "@/components/motion/scroll-text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const STATEMENT = profile.philosophy.short;
const PRINCIPLES = profile.philosophy.principles;
const HIGHLIGHTS = ["risk", "assumptions", "uncertainty", "validate", "decision"];

/* ------------------------------------------------------------------ */
/* Scrub word driven by the pinned progress.                           */
/* ------------------------------------------------------------------ */
function ScrubWord({
  word,
  progress,
  range,
  highlight,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        "mr-[0.3em] inline-block",
        highlight && "text-gradient"
      )}
    >
      {word}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* A principle card that activates on its slice of the scroll.         */
/* ------------------------------------------------------------------ */
function PrincipleCard({
  p,
  index,
  progress,
  activation,
}: {
  p: (typeof PRINCIPLES)[number];
  index: number;
  progress: MotionValue<number>;
  activation: [number, number];
}) {
  const [t0, t1] = activation;
  const lit = useTransform(progress, [t0 - 0.025, t0 + 0.015], [0.3, 1]);
  const y = useTransform(progress, [t0, t0 + 0.03], [26, 0]);
  const fill = useTransform(progress, [t0, t1], [0, 1]);

  return (
    <motion.li
      style={{ opacity: lit, y }}
      className="group relative h-full rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm transition-colors duration-300 last:col-span-2 hover:border-actuary/50 md:p-5 md:last:col-span-1"
    >
      {/* activation progress hairline */}
      <span aria-hidden className="absolute inset-x-4 top-0 h-px overflow-hidden md:inset-x-5">
        <motion.span
          style={{ scaleX: fill }}
          className="block h-px origin-left bg-gradient-to-r from-risk to-actuary"
        />
      </span>
      <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="tnum font-mono text-[11px] font-bold text-risk transition-colors group-hover:text-actuary">
            {p.step}
          </span>
          <Sparkline
            points={[3, 5, 4, 7, 6, 9, 8, 11]}
            className="h-3.5 w-10 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
            color="var(--actuary)"
          />
        </div>
        <h3 className="mt-3 font-display text-[13.5px] font-bold leading-snug text-foreground md:text-sm">
          {p.title}
        </h3>
        <p className="mt-2 hidden text-[11.5px] leading-relaxed text-muted-foreground md:block">
          {p.body}
        </p>
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* CH.02 — The manifesto.                                              */
/* The philosophy statement scrubs in word by word, then recedes as    */
/* the five principles behind it activate one at a time — the sentence */
/* is the table of contents for the cards that follow.                 */
/* ------------------------------------------------------------------ */
export function Manifesto() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = STATEMENT.split(" ");
  const SCRUB_END = 0.52;

  // statement recedes into a header
  const stateY = useTransform(scrollYProgress, [0.5, 0.58], ["0vh", "-7vh"]);
  const stateScale = useTransform(scrollYProgress, [0.5, 0.58], [1, 0.88]);
  const stateOpacity = useTransform(scrollYProgress, [0.5, 0.58], [1, 0.3]);

  // principles enter
  const principlesOpacity = useTransform(scrollYProgress, [0.53, 0.6], [0, 1]);
  const principlesY = useTransform(scrollYProgress, [0.53, 0.62], [56, 0]);

  // phase label crossfade
  const phaseA = useTransform(scrollYProgress, [0.48, 0.55], [1, 0]);
  const phaseB = useTransform(scrollYProgress, [0.53, 0.6], [0, 1]);

  if (reduce) {
    return (
      <section
        id="philosophy"
        aria-label="Actuarial philosophy"
        data-chapter="02 · PHILOSOPHY"
        className="relative scroll-mt-24 overflow-hidden"
      >
        <div className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            CH.02 — <span className="text-risk">Philosophy</span>
          </p>
          <div className="mt-8">
            <ScrollTextReveal
              text={STATEMENT}
              highlightWords={HIGHLIGHTS}
              className="justify-center font-display text-[clamp(1.9rem,5.2vw,3.8rem)] font-extrabold leading-[1.16] tracking-tight text-foreground"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {profile.philosophy.expanded}
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-5">
            {PRINCIPLES.map((p) => (
              <li
                key={p.step}
                className="rounded-2xl border border-border bg-card/60 p-5"
              >
                <span className="font-mono text-xs font-bold text-actuary">
                  {p.step}
                </span>
                <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="philosophy"
      aria-label="Actuarial philosophy"
      data-chapter="02 · PHILOSOPHY"
      className="relative"
    >
      <div ref={ref} className="relative h-[500vh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          {/* backdrop */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
            <div className="absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-actuary/[0.07] blur-[130px]" />
          </div>

          <div className="mx-auto w-full max-w-5xl px-5 py-24 md:px-8">
            {/* kicker + phase label */}
            <div className="relative mb-8 flex items-center gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                CH.02 — <span className="text-actuary">Philosophy</span>
              </p>
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="relative block h-4 w-32 overflow-hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <motion.span style={{ opacity: phaseA }} className="absolute inset-0">
                  The statement
                </motion.span>
                <motion.span style={{ opacity: phaseB }} className="absolute inset-0">
                  The five principles
                </motion.span>
              </span>
            </div>

            {/* statement */}
            <motion.div
              style={{
                y: stateY,
                scale: stateScale,
                opacity: stateOpacity,
                transformOrigin: "top center",
              }}
              className="will-change-transform"
            >
              <p className="flex flex-wrap font-display text-[clamp(1.75rem,4.4vw,3.4rem)] font-extrabold leading-[1.18] tracking-tight text-foreground">
                {words.map((word, i) => {
                  const start = (i / words.length) * SCRUB_END;
                  const end = ((i + 1) / words.length) * SCRUB_END;
                  const highlight = HIGHLIGHTS.some((h) =>
                    word.toLowerCase().includes(h)
                  );
                  return (
                    <ScrubWord
                      key={`${word}-${i}`}
                      word={word}
                      progress={scrollYProgress}
                      range={[start, end]}
                      highlight={highlight}
                    />
                  );
                })}
              </p>
            </motion.div>

            {/* principles */}
            <motion.ol
              style={{ opacity: principlesOpacity, y: principlesY }}
              className="mt-12 grid grid-cols-2 gap-2.5 sm:gap-3 md:mt-16 md:grid-cols-5"
            >
              {PRINCIPLES.map((p, i) => {
                const t0 = 0.58 + i * 0.084;
                return (
                  <PrincipleCard
                    key={p.step}
                    p={p}
                    index={i}
                    progress={scrollYProgress}
                    activation={[t0, t0 + 0.084]}
                  />
                );
              })}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
