"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X, ChevronRight, Target, Wrench, ListChecks } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const accentText: Record<Project["accent"], string> = {
  risk: "text-risk",
  actuary: "text-actuary",
  sens: "text-sens",
};
const accentBorder: Record<Project["accent"], string> = {
  risk: "border-risk/30 bg-risk-soft text-risk",
  actuary: "border-actuary/30 bg-actuary-soft text-actuary",
  sens: "border-sens/30 bg-sens-soft text-sens",
};

function ReservingTriangleMini() {
  const cells = [
    [0, 0, 0.85], [1, 0, 0.62], [2, 0, 0.44], [3, 0, 0.28], [4, 0, 0.16],
    [0, 1, 0.64], [1, 1, 0.48], [2, 1, 0.32], [3, 1, 0.18],
    [0, 2, 0.48], [1, 2, 0.34], [2, 2, 0.2],
    [0, 3, 0.34], [1, 3, 0.22],
    [0, 4, 0.24],
  ] as const;
  return (
    <svg viewBox="0 0 200 108" className="h-auto w-full" aria-hidden>
      {cells.map(([x, y, o], i) => (
        <motion.rect
          key={i}
          x={12 + (x as number) * 37}
          y={4 + (y as number) * 20.5}
          width={32}
          height={16.5}
          rx={3}
          fill="var(--risk)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: (o as number) * 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.035, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Horizontal showcase panel                                           */
/* ------------------------------------------------------------------ */
function Panel({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <article
      className="panel relative w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-[46vw] xl:w-[40vw]"
      data-index={index}
    >
      <button
        type="button"
        onClick={onOpen}
        data-cursor="view"
        data-cursor-label="Open case"
        className="group block w-full text-left"
        aria-label={`Open case study: ${project.title}`}
      >
        {/* ghost index behind the card */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-[0.62em] left-[2%] z-0 select-none font-display text-[clamp(6rem,14vw,11rem)] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--border)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-[1] pt-10">
          {/* image frame */}
          <div className="relative h-[44svh] overflow-hidden rounded-3xl border border-border/80 shadow-xl shadow-black/15 md:h-[52vh]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.imageAlt ?? project.title}
                loading="lazy"
                width={1000}
                height={700}
                style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                className="img-editorial h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              />
            ) : (
              <div className="relative h-full border-b border-border bg-secondary/40 p-6">
                <div className="absolute inset-0 bg-grid opacity-70" aria-hidden />
                <div className="relative flex h-full items-center justify-center">
                  <div className="w-full max-w-[240px]">
                    <ReservingTriangleMini />
                  </div>
                </div>
              </div>
            )}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

            {/* index chip + category */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className={cn(
                "rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md",
                accentBorder[project.categoryColor],
                "border-opacity-40 bg-black/40"
              )}>
                {project.category}
              </span>
            </div>
            <span aria-hidden className="absolute bottom-4 right-5 font-display text-4xl font-extrabold text-white/25 tnum">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* caption */}
          <div className="mt-5 pr-4">
            <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-muted-foreground">
              {project.tagline}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground/80 transition-colors group-hover:text-primary">
              Read case study
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Case-study dialog (unchanged behaviour)                             */
/* ------------------------------------------------------------------ */
function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-accent"
        >
          <X size={16} />
        </button>

        {project.image ? (
          <div className="relative h-48 sm:h-56">
            <img
              src={project.image}
              alt={project.imageAlt ?? ""}
              style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
              className="img-editorial h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent"
            />
          </div>
        ) : null}

        <div className="px-6 pb-8 pt-4 sm:px-8">
          <span
            className={cn(
              "inline-flex rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
              accentBorder[project.categoryColor]
            )}
          >
            {project.category}
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
            {project.summary}
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5">
            <h4 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Target size={13} className={accentText[project.accent]} />
              The problem
            </h4>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground/85">{project.problem}</p>
          </div>

          <div className="mt-6">
            <h4 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <ListChecks size={13} className={accentText[project.accent]} />
              Approach
            </h4>
            <ol className="mt-3.5 space-y-3">
              {project.approach.map((a, i) => (
                <li key={i} className="flex gap-3.5 text-sm leading-relaxed text-foreground/85">
                  <span className={cn("mt-0.5 font-mono text-xs font-semibold tnum", accentText[project.accent])}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <h4 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Wrench size={13} className={accentText[project.accent]} />
              Tools & evidence
            </h4>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  End cap                                                              */
/* ------------------------------------------------------------------ */
function EndCap() {
  return (
    <div className="flex w-[70vw] shrink-0 snap-center items-center md:w-[40vw] lg:w-[26vw]">
      <div className="px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          End of gallery
        </p>
        <p className="mt-3 max-w-[30ch] font-display text-2xl font-bold leading-snug tracking-tight text-foreground">
          Every study follows one discipline:{" "}
          <span className="text-gradient">problem → data → model → validation → meaning.</span>
        </p>
        <a
          href="#contact"
          data-cursor="hover"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-risk/50 bg-risk-soft px-5 py-2.5 text-[13px] font-semibold text-risk transition-all duration-300 hover:border-risk hover:bg-risk hover:text-primary-foreground"
        >
          Discuss a role
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */
export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [counter, setCounter] = useState("01");
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const panels = track.querySelectorAll<HTMLElement>(".panel");
            let best = 0; let bestDist = Infinity;
            panels.forEach((p, i) => {
              const r = p.getBoundingClientRect();
              const c = r.left + r.width / 2;
              const dist = Math.abs(c - window.innerWidth / 2);
              if (dist < bestDist) { bestDist = dist; best = i; }
            });
            setCounter(String(best + 1).padStart(2, "0"));
          },
        },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" aria-label="Selected quantitative projects" className="relative scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Selected Quantitative Work"
          title={
            <>
              Projects that treat uncertainty{" "}
              <span className="text-gradient-warm">as the raw material</span>
            </>
          }
          description="Six applied studies across life insurance, pensions, reserving, survival analysis, investment risk and analytics — each anchored in a real business question and honest assumptions."
        />
      </div>

      {/* ---------- pinned horizontal showcase ---------- */}
      {/* container clips the track at all sizes — no page-level horizontal overflow */}
      <div ref={pinRef} className="relative overflow-hidden py-6 lg:h-screen lg:py-0">
        <div className="flex h-full items-center">
          {/* mobile / tablet: native snap carousel */}
          <div className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:hidden">
            {projects.map((p, i) => (
              <Panel key={p.slug} project={p} index={i} onOpen={() => setOpenSlug(p.slug)} />
            ))}
            <EndCap />
          </div>

          {/* desktop: gsap-driven track inside the clipped pin viewport */}
          <div ref={trackRef} className="hidden w-max gap-8 px-[7vw] lg:flex">
            {projects.map((p, i) => (
              <Panel key={p.slug} project={p} index={i} onOpen={() => setOpenSlug(p.slug)} />
            ))}
            <EndCap />
          </div>
        </div>

        {/* progress rail (desktop) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-10 hidden px-[7vw] lg:block">
          <div className="flex items-center gap-5">
            <span className="font-mono text-xs font-semibold tnum text-foreground">
              {counter}
              <span className="text-muted-foreground/60"> / {String(projects.length).padStart(2, "0")}</span>
            </span>
            <div className="relative h-px flex-1 bg-border">
              <div
                ref={barRef}
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-risk to-actuary"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Keep scrolling
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal delay={0.1}>
          <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
            Every case study follows the same discipline: problem → data → assumptions → model
            → validation → interpretation.{" "}
            <ArrowUpRight size={12} className="mb-0.5 inline text-risk" />
            Open any panel to read it.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectDialog project={openProject} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
