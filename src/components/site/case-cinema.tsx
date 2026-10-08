"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ArrowDown, Check } from "lucide-react";
import { featuredProject as F } from "@/lib/portfolio";
import { MiniDistribution, MiniCurve } from "@/components/charts/hero-charts";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

const STAGES = [
  { label: "The Problem", range: "problem" },
  { label: "The Data", range: "data" },
  { label: "The Model", range: "model" },
  { label: "The Outcome", range: "outcome" },
] as const;

const DATA_FIELDS = [
  { field: "Policy ID", desc: "unique policy key" },
  { field: "Driver Age", desc: "main driver age" },
  { field: "Vehicle Age", desc: "years in service" },
  { field: "Vehicle Type", desc: "category & use" },
  { field: "Region", desc: "rating territory" },
  { field: "Exposure", desc: "time at risk, years" },
  { field: "Number of Claims", desc: "frequency count" },
  { field: "Claim Amount", desc: "severity per claim" },
  { field: "Policy Type", desc: "level of cover" },
];

const PROBLEM_TEXT =
  "Insurers need to understand how often claims occur, how large they become, which policyholder characteristics drive risk, and how expected losses vary across segments.";

/* ------------------------------------------------------------------ */
/* Stage container — fades & shifts between stages like a film cut.    */
/* ------------------------------------------------------------------ */
function StageShell({
  index,
  count,
  progress,
  ghost,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  ghost: string;
  children: ReactNode;
}) {
  const seg = 1 / count;
  const start = index * seg;
  const end = start + seg;
  const m = seg * 0.1;

  const opacity = useTransform(
    progress,
    [start, start + m, end - m, end],
    [index === 0 ? 1 : 0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + m, end - m, end],
    [70, 0, 0, -70]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center will-change-transform"
    >
      <span
        aria-hidden
        className="text-outline-faint pointer-events-none absolute -right-2 top-8 hidden select-none font-display text-[26vh] font-extrabold leading-none lg:block"
      >
        {ghost}
      </span>
      {children}
    </motion.div>
  );
}

/* Inner element that enters on a scroll slice. */
function ScrubItem({
  progress,
  range,
  children,
  className,
  dY = 34,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
  className?: string;
  dY?: number;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [dY, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

/* Scrub word (problem statement). */
function ScrubWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {word}
    </motion.span>
  );
}

/* Right rail stage entry. */
function RailStage({
  index,
  count,
  progress,
  label,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  label: string;
}) {
  const seg = 1 / count;
  const start = index * seg;
  const end = start + seg;
  const lit = useTransform(progress, [Math.max(0, start - 0.02), start + 0.02], [0.35, 1]);
  return (
    <motion.li style={{ opacity: lit }} className="flex items-center gap-3">
      <span
        className={cn(
          "tnum font-mono text-[10px] font-semibold",
          index === 0 ? "text-risk" : "text-muted-foreground"
        )}
      >
        {pad(index + 1)}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
        {label}
      </span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Reduced-motion fallback — the four stages as calm stacked cards.    */
/* ------------------------------------------------------------------ */
function StaticCinema() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        CH.03 — <span className="text-risk">Flagship</span> · Final-Year Project
      </p>
      <Reveal>
        <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          {F.title}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {PROBLEM_TEXT} {F.summary}
        </p>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-risk">
              Frequency
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              Poisson & Negative Binomial GLMs with a log-exposure offset —
              partial years weighted correctly. NegBin preferred once
              overdispersion was confirmed.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-actuary">
              Severity
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              Right-skewed losses modelled with Gamma / Lognormal candidates on
              Claim Amount given a claim — never normal approximations.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sens">
              Outcome
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              Pure premium per segment — expected loss cost ranked to show where
              pricing attention should focus. Models compared with AIC,
              deviance and residual diagnostics.
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="flex flex-wrap gap-2">
          {F.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CH.03 — The case cinema.                                            */
/* The flagship project told as a four-stage film you scroll through:  */
/* problem, data, model, outcome.                                      */
/* ------------------------------------------------------------------ */
export function CaseCinema() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const stageText = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length)));
    return `${pad(idx + 1)}/${pad(STAGES.length)} — ${STAGES[idx].label}`;
  });

  if (reduce) {
    return (
      <section
        id="featured"
        aria-label="Featured project"
        data-chapter="03 · FLAGSHIP"
      >
        <StaticCinema />
      </section>
    );
  }

  const problemWords = PROBLEM_TEXT.split(" ");
  const COUNT = STAGES.length;

  return (
    <section
      id="featured"
      aria-label="Featured project — motor insurance claims modelling"
      data-chapter="03 · FLAGSHIP"
      className="relative"
    >
      <div ref={ref} className="relative h-[480vh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
          {/* backdrop */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
            <div className="absolute right-1/4 top-1/4 h-[300px] w-[560px] rounded-full bg-risk/[0.06] blur-[130px]" />
          </div>

          {/* persistent header */}
          <div className="relative z-[2] mx-auto flex w-full max-w-6xl items-center gap-4 px-5 pt-24 md:px-8 md:pt-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              CH.03 — <span className="text-risk">Flagship</span> · Final-Year
              Project
            </p>
            <span aria-hidden className="h-px flex-1 bg-border" />
            <motion.span className="tnum font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {stageText}
            </motion.span>
          </div>

          {/* stage rail (desktop) */}
          <ol className="absolute right-8 top-1/2 z-[2] hidden w-56 -translate-y-1/2 space-y-4 lg:block">
            {STAGES.map((s, i) => (
              <RailStage
                key={s.label}
                index={i}
                count={COUNT}
                progress={scrollYProgress}
                label={s.label}
              />
            ))}
          </ol>

          {/* stages */}
          <div className="relative z-[1] mx-auto w-full max-w-6xl flex-1 px-5 pb-16 md:px-8">
            {/* -------- STAGE 1 · PROBLEM -------- */}
            <StageShell index={0} count={COUNT} progress={scrollYProgress} ghost="01">
              <ScrubItem progress={scrollYProgress} range={[0.02, 0.07]}>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Motor insurance claims — frequency × severity
                </p>
              </ScrubItem>
              <ScrubItem progress={scrollYProgress} range={[0.04, 0.1]} dY={44}>
                <h3 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.8rem)] font-extrabold leading-[1.02] tracking-tight text-foreground">
                  How often.
                  <span className="font-accent text-gradient block font-normal italic">
                    How large.
                  </span>
                </h3>
              </ScrubItem>
              <p className="mt-8 max-w-2xl text-[clamp(1.05rem,2vw,1.4rem)] leading-relaxed text-foreground/85">
                {problemWords.map((w, i) => (
                  <ScrubWord
                    key={`${w}-${i}`}
                    word={w}
                    progress={scrollYProgress}
                    range={[0.09 + (i / problemWords.length) * 0.12, 0.09 + ((i + 1) / problemWords.length) * 0.12]}
                  />
                ))}
              </p>
            </StageShell>

            {/* -------- STAGE 2 · DATA -------- */}
            <StageShell index={1} count={COUNT} progress={scrollYProgress} ghost="02">
              <ScrubItem progress={scrollYProgress} range={[0.27, 0.32]}>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  The data — anonymised motor claims
                </p>
              </ScrubItem>
              <ScrubItem progress={scrollYProgress} range={[0.29, 0.35]} dY={40}>
                <h3 className="mt-4 font-display text-[clamp(1.9rem,4.6vw,3.6rem)] font-extrabold leading-tight tracking-tight text-foreground">
                  Nine fields, one exposure problem.
                </h3>
              </ScrubItem>
              <div className="mt-8 grid max-w-3xl gap-x-10 sm:grid-cols-2">
                {DATA_FIELDS.map((f, i) => (
                  <ScrubItem
                    key={f.field}
                    progress={scrollYProgress}
                    range={[0.32 + i * 0.014, 0.32 + i * 0.014 + 0.03]}
                    dY={18}
                    className="ledger-row flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="font-mono text-[12px] font-semibold text-foreground md:text-[13px]">
                      <span className="tnum mr-2 text-[10px] text-risk">{pad(i + 1)}</span>
                      {f.field}
                    </span>
                    <span className="font-accent text-[12.5px] italic text-foreground/70 md:text-[13px]">
                      {f.desc}
                    </span>
                  </ScrubItem>
                ))}
              </div>
              <ScrubItem progress={scrollYProgress} range={[0.46, 0.5]}>
                <p className="mt-7 font-accent text-[15px] italic text-foreground/75">
                  Cleaned & validated — exposure windows, missing values, outlier
                  review, anonymisation.
                </p>
              </ScrubItem>
            </StageShell>

            {/* -------- STAGE 3 · MODEL -------- */}
            <StageShell index={2} count={COUNT} progress={scrollYProgress} ghost="03">
              <ScrubItem progress={scrollYProgress} range={[0.52, 0.57]}>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  The model — two questions, two families
                </p>
              </ScrubItem>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <ScrubItem
                  progress={scrollYProgress}
                  range={[0.54, 0.61]}
                  dY={40}
                  className="rounded-3xl border border-border bg-card/70 p-5 backdrop-blur-sm md:p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-risk">
                      Frequency — counts
                    </p>
                    <span className="font-mono text-[10px] text-muted-foreground">Poisson → NegBin</span>
                  </div>
                  <div className="mt-4 max-w-[240px]">
                    <MiniDistribution className="h-auto w-full" />
                  </div>
                  <ul className="mt-4 space-y-1.5 text-[13px] leading-snug text-foreground/85">
                    <li>· GLMs with log-exposure offset — partial years weighted correctly</li>
                    <li>· Negative Binomial preferred once overdispersion confirmed</li>
                  </ul>
                </ScrubItem>

                <ScrubItem
                  progress={scrollYProgress}
                  range={[0.57, 0.64]}
                  dY={40}
                  className="rounded-3xl border border-border bg-card/70 p-5 backdrop-blur-sm md:p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-actuary">
                      Severity — amounts
                    </p>
                    <span className="font-mono text-[10px] text-muted-foreground">Gamma / Lognormal</span>
                  </div>
                  <div className="mt-4 max-w-[240px]">
                    <MiniCurve className="h-auto w-full" />
                  </div>
                  <ul className="mt-4 space-y-1.5 text-[13px] leading-snug text-foreground/85">
                    <li>· Right-skewed losses — normal theory inappropriate</li>
                    <li>· Modelled on Claim Amount given a claim occurred</li>
                  </ul>
                </ScrubItem>
              </div>

              <ScrubItem progress={scrollYProgress} range={[0.66, 0.72]} dY={26}>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(1.15rem,2.6vw,1.8rem)] font-extrabold tracking-tight">
                  <span className="text-foreground">Pure premium</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-risk">E[Frequency]</span>
                  <span className="font-accent text-gradient italic">×</span>
                  <span className="text-actuary">E[Severity]</span>
                  <span className="font-accent text-[0.85em] font-normal italic text-muted-foreground">
                    — expected loss cost, per segment
                  </span>
                </div>
              </ScrubItem>
            </StageShell>

            {/* -------- STAGE 4 · OUTCOME -------- */}
            <StageShell index={3} count={COUNT} progress={scrollYProgress} ghost="04">
              <ScrubItem progress={scrollYProgress} range={[0.77, 0.82]}>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  The outcome — ranked, priced, explained
                </p>
              </ScrubItem>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  {F.evidence.map((e, i) => (
                    <ScrubItem
                      key={e}
                      progress={scrollYProgress}
                      range={[0.8 + i * 0.024, 0.8 + i * 0.024 + 0.035]}
                      dY={22}
                      className="flex items-start gap-3 border-b border-border/70 py-3 last:border-0"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-actuary/40 bg-actuary-soft">
                        <Check size={11} className="text-actuary" />
                      </span>
                      <p className="text-[13.5px] leading-relaxed text-foreground/85 md:text-sm">
                        {e}
                      </p>
                    </ScrubItem>
                  ))}
                  <ScrubItem progress={scrollYProgress} range={[0.9, 0.94]} dY={20}>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {F.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </ScrubItem>
                </div>

                <ScrubItem
                  progress={scrollYProgress}
                  range={[0.79, 0.86]}
                  dY={40}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-card to-risk-soft/30 p-6 md:p-7"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      The headline result
                    </p>
                    <p className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-[1.9rem]">
                      Expected loss cost
                      <span className="font-accent text-gradient mt-1 block font-normal italic">
                        per policyholder segment
                      </span>
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Magnetic strength={0.22}>
                      <a
                        href="#contact"
                        data-cursor="hover"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
                      >
                        Discuss this project
                        <ArrowUpRight size={15} />
                      </a>
                    </Magnetic>
                    <a
                      href="#projects"
                      data-cursor="hover"
                      className="link-sweep px-1 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                      More projects
                      <ArrowDown size={14} className="ml-1 inline" />
                    </a>
                  </div>
                </ScrubItem>
              </div>
            </StageShell>
          </div>

          {/* bottom progress rail */}
          <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 pb-6 md:px-8">
            <div className="h-px w-full bg-border">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-px origin-left bg-gradient-to-r from-risk via-sens to-actuary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
