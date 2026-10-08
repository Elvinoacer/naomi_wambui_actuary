"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const accentMap = {
  risk: {
    text: "text-risk",
    border: "group-hover:border-risk/50",
    chip: "border-risk/25 bg-risk-soft text-risk",
    glow: "bg-risk/[0.07]",
    bar: "bg-risk",
  },
  actuary: {
    text: "text-actuary",
    border: "group-hover:border-actuary/50",
    chip: "border-actuary/25 bg-actuary-soft text-actuary",
    glow: "bg-actuary/[0.06]",
    bar: "bg-actuary",
  },
  sens: {
    text: "text-sens",
    border: "group-hover:border-sens/50",
    chip: "border-sens/25 bg-sens-soft text-sens",
    glow: "bg-sens/[0.06]",
    bar: "bg-sens",
  },
} as const;

export function Capabilities() {
  return (
    <section id="actuarial" aria-label="Actuarial capability areas" className="relative scroll-mt-24">
      <div
        aria-hidden
        className="absolute -left-52 top-1/3 -z-10 h-[460px] w-[460px] rounded-full bg-sens/[0.05] blur-[130px]"
      />
      <SectionHeading
        index="06"
        eyebrow="Actuarial Capability Areas"
        title={
          <>
            Five domains, one discipline:{" "}
            <span className="text-gradient">measuring what uncertainty costs</span>
          </>
        }
        description="The degree built each of these areas layer by layer — from interest theory to survival models. Together they form the toolkit I bring to graduate actuarial work."
      />

      <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const a = accentMap[cap.accent];
          return (
            <StaggerItem key={cap.id} className={cn(cap.id === "insurance-mathematics" ? "lg:row-span-1" : "")}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 transition-colors duration-300",
                  a.border
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    a.glow
                  )}
                />
                <div className="flex items-baseline justify-between">
                  <span className={cn("font-mono text-xs font-semibold tnum", a.text)}>
                    {cap.index}
                  </span>
                  <span
                    aria-hidden
                    className={cn("h-1 w-8 rounded-full opacity-60", a.bar)}
                  />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${cap.title} topics`}>
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium",
                        a.chip
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </StaggerItem>
          );
        })}

        {/* 6th cell: philosophy teaser */}
        <StaggerItem>
          <motion.a
            href="#philosophy"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-risk/25 bg-gradient-to-br from-risk-soft via-card to-actuary-soft p-6"
          >
            <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
            <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              The thread that ties them together
            </p>
            <div className="relative mt-6">
              <p className="font-display text-lg font-bold leading-snug text-foreground">
                “Understand the risk. Question the assumptions. Model the uncertainty.”
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-risk">
                Read the philosophy
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </motion.a>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
