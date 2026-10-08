"use client";

import { Building2, CalendarDays, MapPin } from "lucide-react";
import { experience } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="relative scroll-mt-24">
      <SectionHeading
        index="05"
        eyebrow="Experience"
        title={
          <>
            Practical exposure to how actuarial work{" "}
            <span className="text-gradient">actually gets done</span>
          </>
        }
        description="Classroom models meet operational reality — data hygiene, reporting cadence, documentation and the discipline of working with confidential information."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Image side — full-width landscape crop keeps every face in frame */}
        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <div className="group relative overflow-hidden rounded-2xl border border-border">
              <img
                src="/images/team-collaboration.jpg"
                alt="Analytics team collaborating in an open-plan office with charts and whiteboards"
                loading="lazy"
                width={1600}
                height={1000}
                className="img-editorial aspect-[16/10] w-full object-cover object-[center_42%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
              />
              <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                The attachment floor
              </span>
            </div>
            <div className="glass rounded-xl border border-border/60 p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-actuary">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-actuary" aria-hidden />
                Learning by observation & contribution
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">
                Attaching with an operating insurance business turns abstract
                course concepts — reserves, exposure, data governance — into
                daily working vocabulary.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Content side */}
        <div className="flex flex-col gap-5">
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-card/70 p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-risk">{experience.org}</p>
                </div>
                <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  {experience.period}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {experience.summary}
              </p>

              <StaggerGroup className="mt-5 space-y-3">
                {experience.bullets.map((b, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-risk/80"
                      />
                      {b}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {experience.meta.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card/50 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium leading-snug text-foreground/90">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-dashed border-border px-5 py-4 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 size={13} className="text-actuary" />
                General insurance environment
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} className="text-sens" />
                2025 attachment window
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-risk" />
                Kenya
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
