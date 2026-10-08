"use client";

import { profile, recruiter } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { ScrollTextReveal } from "@/components/motion/scroll-text-reveal";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Sparkline } from "@/components/charts/hero-charts";

const HIGHLIGHTS = ["risk", "assumptions", "uncertainty", "validate", "decision"];

export function Philosophy() {
  return (
    <section id="philosophy" aria-label="Actuarial philosophy" className="relative scroll-mt-24 overflow-hidden">
      {/* atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-risk/[0.08] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            09 — Actuarial Philosophy
          </p>
        </Reveal>

        <div className="mt-8">
          <ScrollTextReveal
            text={profile.philosophy.short}
            highlightWords={HIGHLIGHTS}
            className="justify-center font-display text-[clamp(1.9rem,5.2vw,3.8rem)] font-extrabold leading-[1.16] tracking-tight text-foreground"
          />
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {profile.philosophy.expanded}
          </p>
        </Reveal>

        {/* five principles */}
        <StaggerGroup className="mt-14 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {profile.philosophy.principles.map((p) => (
            <StaggerItem key={p.step}>
              <div className="group h-full rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-actuary/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-actuary">{p.step}</span>
                  <Sparkline
                    points={[3, 5, 4, 7, 6, 9, 8, 11]}
                    className="h-4 w-12 opacity-40 transition-opacity group-hover:opacity-90"
                    color="var(--actuary)"
                  />
                </div>
                <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function RecruiterStrip() {
  return (
    <section aria-label="Recruiter summary" className="relative">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-secondary/70">
          <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 md:p-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-risk">
                {recruiter.headline}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground md:text-[1.7rem]">
                {profile.fullName}
                <span className="block text-base font-semibold text-muted-foreground md:text-lg">
                  {profile.professionalTitle} · {profile.eyebrow}
                </span>
              </h3>
              <p className="mt-2 font-mono text-xs text-actuary">{recruiter.coreFocus}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Strongest evidence
                  </p>
                  <ul className="mt-3 space-y-2">
                    {recruiter.strongestEvidence.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-[13px] text-foreground/85">
                        <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-actuary" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Roles I target
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {recruiter.targetRoles.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-[11.5px] text-foreground/80"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-between gap-6 border-t border-border bg-risk-soft/40 p-7 md:border-l md:border-t-0 md:p-9">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Availability
                </p>
                <p className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
                  {recruiter.availability}
                </p>
              </div>
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Core tools
                </p>
                <p className="mt-2 font-mono text-sm font-semibold text-foreground/90">
                  Excel · R · Python · SQL
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
