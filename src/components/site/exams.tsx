"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpenCheck, Info } from "lucide-react";
import { exams, examStatusMeta, examDisclaimer, examBodies } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Exams() {
  return (
    <section id="exams" aria-label="Professional actuarial exams" className="relative scroll-mt-24">
      <SectionHeading
        index="06"
        eyebrow="Professional Exams"
        title={
          <>
            Qualification is a journey —{" "}
            <span className="text-gradient">represented honestly</span>
          </>
        }
        description="Actuarial professional development runs alongside work: IFoA / SOA pathways, beginning with the statistical and mathematical core subjects."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {exams.map((exam, i) => {
          const meta = examStatusMeta[exam.status];
          return (
            <Reveal key={exam.code} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-risk/25 bg-risk-soft">
                      <GraduationCap size={20} className="text-risk" />
                    </span>
                    <div>
                      <p className="font-mono text-sm font-bold text-foreground">
                        {exam.code}
                        <span className="mx-2 text-border" aria-hidden>
                          /
                        </span>
                        <span className="font-sans text-sm font-semibold text-foreground/90">
                          {exam.name}
                        </span>
                      </p>
                      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                        {exam.body}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
                      meta.tone === "actuary" && "border-actuary/30 bg-actuary-soft text-actuary",
                      meta.tone === "sens" && "border-sens/30 bg-sens-soft text-sens"
                    )}
                  >
                    <BookOpenCheck size={11} />
                    {meta.label}
                  </span>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                  {exam.note}
                </p>

                {/* progress track */}
                <div className="mt-5">
                  <div className="flex justify-between font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                    <span>Not started</span>
                    <span>Exam sat</span>
                    <span>Passed</span>
                  </div>
                  <div className="relative mt-2 h-1.5 rounded-full bg-secondary">
                    <motion.div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full",
                        exam.status === "preparing" ? "bg-actuary/70" : "bg-sens/60"
                      )}
                      initial={{ width: 0 }}
                      whileInView={{ width: exam.status === "preparing" ? "38%" : "12%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.span
                      className={cn(
                        "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-card",
                        exam.status === "preparing" ? "bg-actuary" : "bg-sens"
                      )}
                      style={{ left: exam.status === "preparing" ? "38%" : "12%" }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300 }}
                    />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Pathways
            </p>
            <StaggerGroup className="mt-3 space-y-2.5">
              {examBodies.map((b) => (
                <StaggerItem key={b}>
                  <p className="flex items-center gap-2.5 text-[13px] text-foreground/85">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-risk" />
                    {b}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-dashed border-actuary/40 bg-actuary-soft/40 p-5">
            <Info size={16} className="mt-0.5 shrink-0 text-actuary" />
            <p className="text-[13.5px] leading-relaxed text-foreground/80">{examDisclaimer}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
