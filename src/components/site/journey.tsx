"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { GraduationCap, BookOpen, BadgeCheck, Telescope } from "lucide-react";
import { timeline, education, exams, examStatusMeta, currentlyLearning } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

const YEAR_ACCENTS = [
  "from-risk to-risk/60",
  "from-actuary to-actuary/60",
  "from-sens to-sens/60",
  "from-risk to-actuary",
  "from-actuary to-sens",
] as const;

/* ------------------------------------------------------------------ */
/* A sticky card that recedes (scale + dim) as the next card covers it.*/
/* ------------------------------------------------------------------ */
function StackCard({
  index,
  total,
  progress,
  children,
  className,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // The final card has no successor; keep its interpolation range non-zero.
  const isLast = index === total - 1;
  const coverStart = isLast ? 0 : (index + 1) / total;
  const scale = useTransform(progress, [coverStart, 1], [1, 0.94]);
  const dim = useTransform(progress, [coverStart, 1], [0, 0.45]);

  return (
    <div className="sticky" style={{ top: `calc(7vh + ${index * 9}px)`, zIndex: index + 1 }}>
      <motion.div
        style={reduce || isLast ? undefined : { scale }}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10 will-change-transform",
          className
        )}
      >
        {children}
        {!reduce && !isLast && (
          <motion.div
            aria-hidden
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 z-10 bg-background"
          />
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CH.06 — The Journey.                                                */
/* Timeline, coursework, exams and the learning frontier as nine       */
/* physical cards that stack up as you scroll — the years pile on.     */
/* ------------------------------------------------------------------ */
export function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.2", "end end"],
  });

  const total = 9; // intro + 5 years + coursework + exams + learning

  return (
    <section
      id="journey"
      aria-label="Academic journey, coursework, exams and current learning"
      data-chapter="08 · THE JOURNEY"
      className="relative scroll-mt-24"
    >
      <div ref={ref} className="relative">
        <div className="mx-auto max-w-5xl px-5 pb-10 pt-24 md:px-8 md:pt-32">
          <SectionHeading
            index="08"
            eyebrow="The Journey"
            title={
              <>
                Four years,{" "}
                <span className="font-accent text-gradient font-normal italic">
                  compounding.
                </span>
              </>
            }
            description="The full trajectory — foundations, modelling, actuarial risk, applied analytics and the final-year project. Scroll, and watch the years stack up."
          />
        </div>

        <div className="relative mx-auto max-w-5xl space-y-[7vh] px-5 pb-32 md:px-8">
          {/* ---- Card 0 · Intro ---- */}
          <StackCard index={0} total={total} progress={scrollYProgress} className="min-h-[46svh]">
            <div className="flex h-full flex-col justify-between p-7 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Moi University · Eldoret, Kenya
                </p>
                <GraduationCap size={18} className="text-risk" />
              </div>
              <div>
                <p className="tnum font-display text-[clamp(2.6rem,8vw,5.5rem)] font-extrabold leading-none tracking-tight text-foreground">
                  2022 <span className="font-accent text-gradient font-normal italic">→</span> 2026
                </p>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Bachelor of Science in Actuarial Science — one trajectory,
                  five chapters, each built on the last.
                </p>
              </div>
              <p className="font-accent text-sm italic text-muted-foreground">
                Keep scrolling — the years stack up.
              </p>
            </div>
          </StackCard>

          {/* ---- Cards 1-5 · The years ---- */}
          {timeline.map((t, i) => (
            <StackCard
              key={t.year}
              index={i + 1}
              total={total}
              progress={scrollYProgress}
              className="min-h-[40svh]"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                  YEAR_ACCENTS[i % YEAR_ACCENTS.length]
                )}
              />
              <div className="grid gap-6 p-7 md:grid-cols-[0.5fr_1fr] md:gap-10 md:p-10">
                <div>
                  <p className="tnum font-display text-[clamp(2.6rem,7vw,4.6rem)] font-extrabold leading-none tracking-tight text-foreground">
                    {t.year}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Year {pad(i + 1)} / {pad(5)}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-xl font-bold leading-snug text-foreground md:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
                    {t.body}
                  </p>
                </div>
              </div>
            </StackCard>
          ))}

          {/* ---- Card 6 · Coursework ---- */}
          <StackCard index={6} total={total} progress={scrollYProgress} className="min-h-[54svh]">
            <div className="p-7 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  The coursework — quantitative core
                </p>
                <BookOpen size={18} className="text-actuary" />
              </div>
              <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {education.courseGroups.map((g, gi) => (
                  <div key={g.title}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-actuary">
                      {pad(gi + 1)} · {g.title}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {g.courses.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-[13px] leading-relaxed text-foreground/85">
                          <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </StackCard>

          {/* ---- Card 7 · Exams ---- */}
          <StackCard index={7} total={total} progress={scrollYProgress} className="min-h-[46svh]">
            <div className="p-7 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Professional exams — honest progress
                </p>
                <BadgeCheck size={18} className="text-sens" />
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {exams.map((e) => {
                  const meta = examStatusMeta[e.status];
                  return (
                    <div
                      key={e.code}
                      className="rounded-2xl border border-border bg-background/60 p-5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                          {e.code}
                        </p>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
                            meta.tone === "actuary" && "border border-actuary/40 bg-actuary-soft text-actuary",
                            meta.tone === "sens" && "border border-sens/40 bg-sens-soft text-sens"
                          )}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground/90">
                        {e.name} <span className="font-mono text-[11px] font-normal text-muted-foreground">· {e.body}</span>
                      </p>
                      <p className="font-accent mt-2 text-[13px] italic leading-snug text-muted-foreground">
                        {e.note}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 max-w-2xl text-[12.5px] leading-relaxed text-muted-foreground">
                No exam is listed as passed until verified — professional
                qualification is a journey, and this portfolio shows the
                foundations being built along the way.
              </p>
            </div>
          </StackCard>

          {/* ---- Card 8 · Currently learning (the summit) ---- */}
          <StackCard
            index={8}
            total={total}
            progress={scrollYProgress}
            className="min-h-[46svh] bg-gradient-to-br from-card via-card to-risk-soft/40"
          >
            <div className="p-7 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Currently learning — the frontier
                </p>
                <Telescope size={18} className="text-risk" />
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {currentlyLearning.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-[13px] text-foreground/85 transition-colors hover:border-risk/40 hover:text-risk"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="font-accent mt-8 text-lg italic text-foreground/80">
                The trajectory continues — next stop: graduate roles.
              </p>
            </div>
          </StackCard>
        </div>
      </div>
    </section>
  );
}
