"use client";

import { profile } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

export function About() {
  return (
    <section id="about" aria-label="About Naomi" className="relative scroll-mt-24">
      <SectionHeading
        index="09"
        eyebrow="About Naomi"
        title={
          <>
            Turning uncertain futures into{" "}
            <span className="text-gradient">measurable decisions</span>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Narrative */}
        <div className="space-y-5 text-[15.5px] leading-relaxed text-foreground/85 md:text-base">
          <Reveal>
            <p>
              I am an Actuarial Science graduate from Moi University with a strong
              interest in insurance analytics, risk modelling, financial
              mathematics and quantitative decision-making. My degree exposed me
              to probability, statistics, stochastic processes, survival models,
              actuarial mathematics, pensions, economics, finance and risk theory
              — the full quantitative stack behind modern insurance.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              What draws me to this field is the translation problem at its heart:
              uncertain future events — a claim, a death, a retirement, a market
              shock — can be converted into assumptions, models and measurable
              financial outcomes. Getting that translation right, and honestly, is
              the craft I want to spend my career practising.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p>
              My approach to any analytical problem follows the same arc: define
              the question clearly, understand the data, test the assumptions,
              build an appropriate model, validate the results, and communicate
              the implications in a form decision-makers can actually use.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p>
              I am looking for graduate opportunities where I can develop further
              in actuarial modelling, insurance, pensions, risk or data analytics
              — and where precision, curiosity and clear communication are valued
              in equal measure.
            </p>
          </Reveal>
        </div>

        {/* Value proposition + numbers */}
        <div className="space-y-4">
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6">
              <div aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-actuary/10 blur-3xl" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Value proposition
              </p>
              <p className="relative mt-3 text-[14px] leading-relaxed text-foreground/85">
                {profile.valueProposition}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 4, suffix: "+", label: "Years of quantitative study" },
              { value: 7, suffix: "", label: "Applied quantitative projects" },
              { value: 5, suffix: "", label: "Actuarial capability areas" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={0.12 + i * 0.06}>
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card/50 p-4 text-center">
                  <span className="font-display text-3xl font-extrabold text-gradient">
                    <Counter to={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-1.5 text-[10.5px] font-medium leading-tight text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="rounded-2xl border border-dashed border-risk/40 bg-risk-soft/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-risk">
                Positioning — stated plainly
              </p>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-foreground/80">
                A fresh graduate with strong foundations — not a qualified actuary
                (yet). What I offer today: quantitative rigour, honest analysis and
                the drive to grow through real actuarial work.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
