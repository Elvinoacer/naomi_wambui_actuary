"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { snapshot } from "@/lib/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const FACTS = snapshot;
const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* A single key fact, locked into the dossier by scroll position.      */
/* ------------------------------------------------------------------ */
function Fact({
  fact,
  index,
  total,
  progress,
}: {
  fact: (typeof FACTS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = (index / total) * 0.96;
  const end = start + seg;
  const fade = seg * 0.36;

  const opacity = useTransform(
    progress,
    [start, start + fade, end - fade, Math.min(1, end + fade)],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  );
  const y = useTransform(
    progress,
    [start, start + fade, end - fade, Math.min(1, end + fade)],
    [72, 0, 0, -72]
  );
  const bar = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center will-change-transform"
    >
      {/* ghost numeral */}
      <span
        aria-hidden
        className="text-outline-faint pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 select-none font-display text-[34vh] font-extrabold leading-none lg:block"
      >
        {pad(index + 1)}
      </span>

      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="text-risk">{pad(index + 1)}</span>
        {" / "}
        {pad(total)} — {fact.label}
      </p>
      <h3 className="mt-5 font-display text-[clamp(2.3rem,6.4vw,5.4rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
        {fact.value}
      </h3>
      <p className="font-accent mt-4 text-[clamp(1.1rem,2.1vw,1.6rem)] italic leading-snug text-muted-foreground">
        {fact.detail}
      </p>
      <div className="mt-9 h-px w-full max-w-md bg-border">
        <motion.div
          style={{ scaleX: bar }}
          className="h-px origin-left bg-gradient-to-r from-risk to-actuary"
        />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Left rail — the checklist that builds itself.                       */
/* ------------------------------------------------------------------ */
function RailItem({
  fact,
  index,
  total,
  progress,
}: {
  fact: (typeof FACTS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = (index / total) * 0.96;
  const end = start + seg;
  const lit = useTransform(progress, [Math.max(0, start - 0.015), start + 0.012], [0.5, 1]);
  const fill = useTransform(progress, [start, end], [0, 1]);

  return (
    <li>
      <motion.div style={{ opacity: lit }} className="flex items-baseline gap-3">
        <span className="tnum font-mono text-[10px] font-semibold text-risk">
          {pad(index + 1)}
        </span>
        <div className="flex-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
            {fact.label}
          </span>
          <div className="mt-1.5 h-px w-full bg-border">
            <motion.div
              style={{ scaleX: fill }}
              className="h-px origin-left bg-foreground/60"
            />
          </div>
        </div>
      </motion.div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Static fallback (reduced motion) — same facts, calm grid.           */
/* ------------------------------------------------------------------ */
function StaticDossier() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        CH.01 — <span className="text-risk">The Snapshot</span>
      </p>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Key facts, on the record.
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FACTS.map((f) => (
          <Reveal key={f.label}>
            <div className="rounded-2xl border border-border bg-card/60 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {f.label}
              </p>
              <p className="mt-2 font-display text-xl font-bold text-foreground">
                {f.value}
              </p>
              <p className="font-accent mt-1 text-sm italic text-muted-foreground">
                {f.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CH.01 — The living dossier.                                         */
/* Six key facts lock into the record, one per scroll beat, while a    */
/* scanner line sweeps the viewport like a machine reading a file.     */
/* ------------------------------------------------------------------ */
export function Dossier() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scanY = useTransform(scrollYProgress, [0, 1], ["-4vh", "104vh"]);

  if (reduce) return <StaticDossier />;

  return (
    <section
      id="snapshot"
      aria-label="Candidate snapshot — key facts"
      data-chapter="01 · THE SNAPSHOT"
      className="relative"
    >
      <div ref={ref} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          {/* backdrop */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
            <div className="absolute left-1/2 top-1/3 h-[340px] w-[720px] -translate-x-1/2 rounded-full bg-risk/[0.07] blur-[130px]" />
          </div>

          {/* scanner line — the machine reading the file */}
          <motion.div
            aria-hidden
            style={{ y: scanY }}
            className="absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-risk/50 to-transparent"
          />

          <div className="relative z-[2] mx-auto grid w-full max-w-6xl gap-10 px-5 py-24 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            {/* rail */}
            <div className="flex flex-col justify-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                CH.01 — <span className="text-risk">The Snapshot</span>
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
                Key facts, on the record.
              </h2>
              <p className="mt-3 hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
                The dossier builds itself as you scroll — the six fields every
                recruiter asks about first.
              </p>
              <ul className="mt-9 hidden space-y-4 lg:block">
                {FACTS.map((f, i) => (
                  <RailItem
                    key={f.label}
                    fact={f}
                    index={i}
                    total={FACTS.length}
                    progress={scrollYProgress}
                  />
                ))}
              </ul>
            </div>

            {/* fact display */}
            <div
              aria-hidden
              className={cn("relative h-[54svh] min-h-[320px]")}
            >
              {FACTS.map((f, i) => (
                <Fact
                  key={f.label}
                  fact={f}
                  index={i}
                  total={FACTS.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* accessible static record */}
      <ul className="sr-only">
        {FACTS.map((f) => (
          <li key={f.label}>
            {f.label}: {f.value} — {f.detail}
          </li>
        ))}
      </ul>
    </section>
  );
}
