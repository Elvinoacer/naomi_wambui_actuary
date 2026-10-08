"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarRange, ChevronDown, BookOpen } from "lucide-react";
import { education } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Education() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="education" aria-label="Education" className="relative scroll-mt-24">
      <div
        aria-hidden
        className="absolute -left-40 top-20 -z-10 h-[380px] w-[380px] rounded-full bg-actuary/[0.06] blur-[110px]"
      />
      <SectionHeading
        index="07"
        eyebrow="Education"
        title={
          <>
            BSc Actuarial Science,{" "}
            <span className="text-gradient">Moi University</span>
          </>
        }
        description="Five course families, one coherent quantitative education — from calculus foundations to the actuarial core of life contingencies, survival models and risk theory."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Degree card */}
        <Reveal>
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-7">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-risk/10 blur-3xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-risk/25 bg-risk-soft px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-risk">
                <BookOpen size={11} />
                Degree
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-foreground">
                {education.degree}
              </h3>
              <p className="mt-2 text-[15px] font-semibold text-actuary">{education.institution}</p>
              <div className="mt-5 space-y-2 font-mono text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarRange size={13} className="text-risk" />
                  {education.period}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={13} className="text-sens" />
                  {education.location}
                </p>
              </div>

              <div className="mt-7 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  The actuarial core
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Life Contingencies", "Survival Models", "Risk Theory", "Pension Mathematics", "Stochastic Processes"].map(
                    (c) => (
                      <span
                        key={c}
                        className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[10px] text-foreground/80"
                      >
                        {c}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Course groups accordion */}
        <div className="flex flex-col gap-3">
          {education.courseGroups.map((g, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={g.title} delay={i * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors",
                    isOpen ? "border-risk/40 bg-card" : "border-border bg-card/50"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-risk tnum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[15px] font-bold text-foreground">
                        {g.title}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground"
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <div className="flex flex-wrap gap-1.5 px-5 pb-5">
                          {g.courses.map((c, j) => (
                            <motion.span
                              key={c}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 + j * 0.035 }}
                              className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground/85"
                            >
                              {c}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
