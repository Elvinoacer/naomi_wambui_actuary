"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { timeline, currentlyLearning } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";

/** Vertical journey timeline whose spine draws itself with scroll. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const smooth = reduce ? 1 : scaleY;

  return (
    <section id="timeline" aria-label="Academic timeline" className="relative scroll-mt-24">
      <SectionHeading
        index="08"
        eyebrow="The Journey"
        title={
          <>
            Four years, compounding{" "}
            <span className="text-gradient-warm">like a well-behaved annuity</span>
          </>
        }
        description="Each year of the degree built on the last — foundations, then models, then risk, then practice."
      />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* spine */}
        <div
          aria-hidden
          className="absolute bottom-2 left-[19px] top-2 w-px bg-border md:left-1/2"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: smooth }}
          className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-risk via-actuary to-sens md:left-1/2"
        />

        <ol className="space-y-10 md:space-y-14">
          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={item.year} className="relative">
                {/* node */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-[19px] top-1.5 z-[1] flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background bg-risk shadow-[0_0_0_3px_var(--risk-soft)] md:left-1/2"
                  aria-hidden
                />
                <Reveal
                  className={cn(
                    "pl-12 md:w-[calc(50%-2.5rem)] md:pl-0",
                    left ? "md:mr-auto md:pr-0 md:text-right" : "md:ml-auto"
                  )}
                >
                  <div
                    className={
                      "group rounded-2xl border border-border bg-card/70 p-5 transition-colors hover:border-risk/40 " +
                      (left ? "md:ml-auto" : "")
                    }
                  >
                    <span className="font-mono text-sm font-bold text-risk tnum">
                      {item.year}
                    </span>
                    <h3 className="mt-1.5 font-display text-[17px] font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Currently learning */}
      <div className="mx-auto mt-16 max-w-3xl">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Currently learning
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-actuary">
                Always in progress
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentlyLearning.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground/85 transition-colors hover:border-actuary/50 hover:text-actuary"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function cn(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
