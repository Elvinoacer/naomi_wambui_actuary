"use client";

import { useState } from "react";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Dossier } from "@/components/site/dossier";
import { Manifesto } from "@/components/site/manifesto";
import { CaseCinema } from "@/components/site/case-cinema";
import { Projects } from "@/components/site/projects";
import { Experience } from "@/components/site/experience";
import { Capabilities } from "@/components/site/capabilities";
import { Analytics } from "@/components/site/analytics";
import { Journey } from "@/components/site/journey";
import { About } from "@/components/site/about";
import { RecruiterStrip } from "@/components/site/philosophy";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Preloader } from "@/components/motion/preloader";
import { Cursor } from "@/components/motion/cursor";
import { Hud } from "@/components/site/hud";

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/**
 * The portfolio as a continuous, chaptered scroll experience:
 *
 *   00 ARRIVAL       — hero, aurora, the name
 *   01 THE SNAPSHOT  — pinned dossier: six key facts lock in, one by one
 *   02 PHILOSOPHY    — pinned manifesto scrub, then five principles activate
 *   03 FLAGSHIP      — the final-year project as a four-stage scroll film
 *   04 SELECTED WORK — pinned horizontal gallery
 *   05 EXPERIENCE    — practical exposure
 *   06 CRAFT         — actuarial capability areas
 *   07 DATA LAB      — analytics skills & live charts
 *   08 THE JOURNEY   — stacking cards: years, coursework, exams, frontier
 *   09 THE PERSON    — about + the 30-second recruiter summary
 *   10 INVITATION    — contact & footer
 */
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <Hud />
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteNav />
        <main className="flex-1">
          <div data-chapter="00 · ARRIVAL">
            <Hero ready={loaded} />
          </div>

          <Dossier />
          <Manifesto />
          <CaseCinema />

          <div data-chapter="04 · SELECTED WORK">
            <Projects />
          </div>

          <div data-chapter="05 · EXPERIENCE">
            <Section>
              <Experience />
            </Section>
          </div>

          <div data-chapter="06 · CRAFT">
            <Section>
              <Capabilities />
            </Section>
          </div>

          <div data-chapter="07 · DATA LAB">
            <Section>
              <Analytics />
            </Section>
          </div>

          <Journey />

          <div data-chapter="09 · THE PERSON">
            <Section>
              <About />
            </Section>
            <Section>
              <RecruiterStrip />
            </Section>
          </div>

          <div data-chapter="10 · INVITATION">
            <Section className="pb-24 md:pb-32">
              <Contact />
            </Section>
            <Footer />
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
