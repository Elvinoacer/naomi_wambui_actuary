"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups, tools, toolMarquee, PROFICIENCY_LABELS, type Proficiency } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SurvivalCurve } from "@/components/charts/survival-curve";
import { Marquee } from "@/components/motion/marquee";
import { cn } from "@/lib/utils";

const levelStyle: Record<Proficiency, { width: string; bar: string; text: string }> = {
  strong: { width: "100%", bar: "bg-risk", text: "text-risk" },
  working: { width: "72%", bar: "bg-actuary", text: "text-actuary" },
  exposure: { width: "46%", bar: "bg-sens", text: "text-sens" },
  learning: { width: "30%", bar: "bg-muted-foreground/60", text: "text-muted-foreground" },
};

export function Analytics() {
  const [tab, setTab] = useState(0);
  const group = skillGroups[tab];

  return (
    <section id="analytics" aria-label="Data and analytics skills" className="relative scroll-mt-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute -right-52 top-1/4 -z-10 h-[460px] w-[460px] rounded-full bg-risk/[0.06] blur-[130px]"
      />
      <SectionHeading
        index="07"
        eyebrow="Data & Analytics Skills"
        title={
          <>
            Statistics is the spine.{" "}
            <span className="text-gradient-warm">Tools are the hands.</span>
          </>
        }
        description="Honest proficiency levels, deliberately labelled — strong where the coursework ran deepest, working knowledge where projects took me, and academic exposure where foundations are still being laid."
      />

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Tabs + skill bars */}
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card/70 p-6 md:p-7">
            {/* Tab bar */}
            <div role="tablist" aria-label="Skill groups" className="flex flex-wrap gap-2">
              {skillGroups.map((g, i) => (
                <button
                  key={g.group}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                    tab === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === i && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{g.group}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                role="tabpanel"
                aria-label={group.group}
              >
                <p className="mt-6 text-[13.5px] italic text-muted-foreground">{group.blurb}</p>
                <ul className="mt-5 space-y-4">
                  {group.skills.map((s, i) => {
                    const st = levelStyle[s.level];
                    return (
                      <li key={s.name}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-sm font-medium text-foreground/90">{s.name}</span>
                          <span className={cn("font-mono text-[10px] font-semibold uppercase tracking-wider", st.text)}>
                            {PROFICIENCY_LABELS[s.level]}
                          </span>
                        </div>
                        <div
                          className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-secondary"
                          role="img"
                          aria-label={`${s.name}: ${PROFICIENCY_LABELS[s.level]}`}
                        >
                          <motion.div
                            className={cn("h-full rounded-full", st.bar)}
                            initial={{ width: 0 }}
                            animate={{ width: st.width }}
                            transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Tools column */}
        <div className="flex flex-col gap-4">
          {tools.map((t, i) => {
            const st = levelStyle[t.level];
            return (
              <Reveal key={t.name} delay={0.08 + i * 0.06}>
                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-base font-bold text-foreground">{t.name}</h3>
                        <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider", st.text, "border-current/20 bg-current/5")}>
                          {PROFICIENCY_LABELS[t.level]}
                        </span>
                      </div>
                      <p className="mt-1.5 truncate text-xs text-muted-foreground" title={t.detail}>
                        {t.detail}
                      </p>
                    </div>
                    {/* proficiency ring */}
                    <div className="relative h-12 w-12 shrink-0">
                      <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--secondary)" strokeWidth="5" />
                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          className={st.text}
                          strokeDasharray={2 * Math.PI * 20}
                          initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                          whileInView={{
                            strokeDashoffset:
                              2 * Math.PI * 20 * (1 - (t.level === "strong" ? 0.92 : 0.66)),
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[9.5px] font-bold text-foreground">
                        {t.level === "strong" ? "92" : "66"}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Survival curve + pipeline note */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SurvivalCurve delay={0.1} />
        <Reveal delay={0.2}>
          <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/50 p-6 md:p-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                How I work with data
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  { t: "Define", d: "Pin the business question before touching the data." },
                  { t: "Explore", d: "Clean, describe, visualise — earn the right to model." },
                  { t: "Model", d: "Choose structure that matches the data-generating story." },
                  { t: "Validate", d: "Residuals, out-of-sample checks, sensitivity to assumptions." },
                  { t: "Communicate", d: "Translate results into decisions a business can act on." },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-risk/30 bg-risk-soft font-mono text-[10px] font-bold text-risk">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{step.t}</p>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Tools marquee */}
      <Reveal delay={0.1}>
        <div className="mt-6 rounded-2xl border border-border bg-card/40 py-4">
          <Marquee items={toolMarquee} slow />
        </div>
      </Reveal>
    </section>
  );
}
