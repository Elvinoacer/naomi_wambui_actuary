"use client";

import { Mail, Linkedin, FileText, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitReveal } from "@/components/motion/split-reveal";

/**
 * Closing CTA — editorial giant typography with masked word reveals,
 * a signature magnetic circular button, and calm supporting details.
 */
export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="relative scroll-mt-24">
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade-b opacity-60" />
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[840px] -translate-x-1/2 translate-y-1/3 rounded-full bg-risk/[0.12] blur-[130px]" />
        <div className="absolute bottom-10 right-[12%] h-[240px] w-[240px] rounded-full bg-actuary/[0.08] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            CH.10 — Invitation · Contact
          </p>
        </Reveal>

        {/* giant statement — masked word reveals */}
        <h2 className="mt-8 font-display font-extrabold leading-[1.02] tracking-tight">
          <SplitReveal
            as="span"
            text="Looking for an analyst who turns"
            className="block text-[clamp(2.2rem,6.2vw,4.6rem)] text-foreground"
          />
          <SplitReveal
            as="span"
            text="uncertainty into useful decisions?"
            delay={0.28}
            className="block text-[clamp(2.2rem,6.2vw,4.6rem)] text-gradient"
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/75 md:text-base">
            Open to graduate actuarial, insurance, pensions, risk, financial modelling
            and data-analytics opportunities. Let&apos;s talk.
          </p>
        </Reveal>

        {/* signature circular CTA */}
        <Reveal delay={0.12} className="mt-14">
          <Magnetic strength={0.32}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="group relative mx-auto flex h-[168px] w-[168px] items-center justify-center rounded-full md:h-[188px] md:w-[188px]"
              aria-label={`Email ${profile.fullName}`}
            >
              {/* rotating dashed ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-dashed border-risk/40 transition-transform duration-[1400ms] ease-linear group-hover:rotate-90"
              />
              {/* glow */}
              <span
                aria-hidden
                className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-actuary opacity-90 blur-[2px] transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-100 group-hover:shadow-[0_0_60px_-8px_var(--risk)]"
              />
              <span className="relative flex flex-col items-center gap-1 text-primary-foreground">
                <span className="font-display text-lg font-extrabold tracking-tight md:text-xl">
                  Say hello
                </span>
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </a>
          </Magnetic>
        </Reveal>

        {/* channel pills */}
        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.22}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-actuary/50 hover:text-actuary"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#featured"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-sens/50 hover:text-sens"
              >
                <FileText size={16} />
                Download CV
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-risk/50 hover:text-risk"
              >
                <Mail size={16} />
                {profile.email}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* info strip */}
        <Reveal delay={0.26}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/70 bg-card/50 px-6 py-5 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <MapPin size={14} className="text-risk" />
              Based in Kenya — open to relocation
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
            <span className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-actuary" aria-hidden />
              Responds within 48 hours
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
