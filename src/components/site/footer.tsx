"use client";

import { ArrowUp } from "lucide-react";
import { profile, navLinks } from "@/lib/portfolio";
import { VelocityMarquee } from "@/components/motion/velocity-marquee";

/**
 * Footer — Nairobi skyline strip, then a giant scroll-velocity marquee of
 * the name (skews and accelerates with your scrolling), then the utility bar.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border/70">
      {/* Nairobi skyline strip */}
      <div aria-hidden className="relative h-36 overflow-hidden md:h-44">
        <img
          src="/images/nairobi-skyline.jpg"
          alt=""
          role="presentation"
          loading="lazy"
          width={1920}
          height={1080}
          className="img-editorial h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/15" />
        <div className="absolute inset-x-0 bottom-5 flex justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Nairobi · Kenya · UTC+3
          </p>
        </div>
      </div>

      {/* giant name marquee — reacts to scroll velocity */}
      <div className="overflow-hidden border-y border-border/60 py-5 md:py-7">
        <VelocityMarquee baseDuration={30}>
          {[0, 1].map((n) => (
            <span key={n} className="mx-6 flex items-center gap-8 md:mx-10 md:gap-14">
              <span className="whitespace-nowrap font-display text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-none tracking-tight text-foreground">
                NAOMI WAMBUI
              </span>
              <span aria-hidden className="h-3 w-3 rounded-full bg-gradient-to-r from-risk to-actuary md:h-4 md:w-4" />
              <span className="whitespace-nowrap font-mono text-[clamp(0.9rem,2vw,1.4rem)] uppercase tracking-[0.32em] text-muted-foreground">
                Actuarial Science
              </span>
              <span aria-hidden className="h-3 w-3 rounded-full bg-gradient-to-r from-actuary to-sens md:h-4 md:w-4" />
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 md:flex-row md:px-8">
          <div className="text-center md:text-left">
            <p className="font-display text-base font-extrabold text-foreground">
              {profile.fullName}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              Actuarial Science Graduate · Moi University
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="link-sweep text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              data-cursor="hover"
              className="link-sweep text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>

          <a
            href="#top"
            data-cursor="hover"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-risk/50 hover:text-risk"
            aria-label="Back to top"
          >
            <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="border-t border-border/60">
          <p className="mx-auto max-w-6xl px-5 py-4 text-center font-mono text-[10.5px] text-muted-foreground/70 md:px-8">
            © {year} {profile.fullName}. Designed with precision — built with Next.js 16,
            Lenis, GSAP &amp; Framer Motion. Placeholder content pending verification.
          </p>
        </div>
      </div>
    </footer>
  );
}
