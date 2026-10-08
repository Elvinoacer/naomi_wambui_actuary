"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { featuredProject } from "@/lib/portfolio";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { FrequencyChart } from "@/components/charts/frequency-chart";
import { SeverityChart } from "@/components/charts/severity-chart";
import { SensitivityTornado } from "@/components/charts/sensitivity-tornado";

/**
 * Featured project — opens with a cinematic full-bleed parallax banner:
 * the image scrub-scales and drifts inside a clipped frame while a dark
 * veil lifts, then the study unfolds: methodology, evidence, live charts.
 */
export function FeaturedProject() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });
  // image: zooms out + drifts as the banner crosses the viewport
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1.02]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);
  const veil = useTransform(scrollYProgress, [0, 0.45, 1], [0.55, 0.18, 0.45]);

  return (
    <section id="featured" aria-label="Featured actuarial project" className="relative scroll-mt-24">
      {/* ---------- cinematic banner ---------- */}
      <div
        ref={bannerRef}
        data-cursor="hover"
        className="relative mx-auto h-[58vh] max-w-6xl overflow-hidden rounded-3xl border border-border/80 shadow-2xl shadow-black/20 md:h-[68vh]"
      >
        <motion.img
          src={featuredProject.image}
          alt={featuredProject.imageAlt}
          className="absolute inset-0 h-[124%] w-full object-cover will-change-transform"
          style={{ scale: imgScale, y: imgY }}
          loading="lazy"
          width={1600}
          height={900}
        />
        {/* veils & gradients */}
        <motion.div aria-hidden className="absolute inset-0 bg-black will-change-[opacity]" style={{ opacity: veil }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />

        {/* overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8 sm:p-10 md:p-14">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-risk/40 bg-risk-soft px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-risk backdrop-blur-sm">
                {featuredProject.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                Final-year project · Moi University
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
              Motor Insurance Claims —{" "}
              <span className="text-gradient">Frequency &amp; Severity Modelling</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/85 md:text-base">
              Separate models for how often claims occur and how large they become,
              combined into expected claim cost across policyholder segments — the
              pricing identity in action.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#featured-charts"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-bold text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                See the evidence
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="flex flex-wrap gap-2">
                {featuredProject.tools.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/25 bg-black/30 px-3 py-1 font-mono text-[10.5px] text-white/85 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* corner ticks */}
        <span aria-hidden className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-white/60" />
        <span aria-hidden className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/60" />
        <span aria-hidden className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/60" />
        <span aria-hidden className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white/60" />
      </div>

      {/* ---------- study unfolds ---------- */}
      <div id="featured-charts" className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: narrative */}
        <div className="flex flex-col gap-6">
          {/* Methodology */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Methodology
              </h3>
              <ol className="space-y-3.5">
                {featuredProject.approach.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="flex gap-3.5 text-sm leading-relaxed text-foreground/85"
                  >
                    <span className="mt-0.5 font-mono text-xs font-semibold text-risk tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Key modelling decisions */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-actuary/25 bg-actuary-soft/60 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-actuary">
                <CheckCircle2 size={14} />
                Key modelling decisions
              </h3>
              <StaggerGroup className="grid gap-3 sm:grid-cols-2">
                {featuredProject.evidence.map((e, i) => (
                  <StaggerItem key={i}>
                    <div className="flex h-full items-start gap-2.5 rounded-xl border border-actuary/20 bg-card/60 p-3.5 text-[13px] leading-relaxed text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-actuary" aria-hidden />
                      {e}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>

          {/* Future work strip */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-dashed border-border px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Future extensions
              </span>
              {[
                "Credibility methods",
                "Telematics variables",
                "Geospatial risk",
                "ML comparison",
                "Inflation adjustment",
                "Claims development",
              ].map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <ArrowUpRight size={12} className="text-risk" />
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: charts */}
        <div className="flex flex-col gap-6">
          <FrequencyChart delay={0.1} />
          <SeverityChart delay={0.25} />

          {/* formula card */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/60 p-6">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                The pricing identity
              </p>
              <p className="font-mono text-base font-semibold leading-relaxed text-foreground md:text-lg">
                <span className="text-risk">E[Loss Cost]</span> ={" "}
                <span className="text-actuary">E[Frequency]</span> ×{" "}
                <span className="text-sens">E[Severity]</span>
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                Frequency tells you how often; severity tells you how much. Their
                product — computed per segment — is where pricing begins, before
                expenses, loadings and profit margins enter the picture.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featuredProject.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <SensitivityTornado delay={0.35} />

          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                What the project taught me
              </h3>
              <p className="text-[15px] italic leading-relaxed text-foreground/85">
                “Predictive accuracy alone is not enough in actuarial work. A useful
                model must also be statistically appropriate, interpretable, stable
                and connected to real business decisions. Data quality and exposure
                measurement were just as important as model selection.”
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
