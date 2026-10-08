"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  type MotionStyle,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { Magnetic } from "@/components/motion/magnetic";
import { MiniCurve, MiniDistribution, MiniTriangle } from "@/components/charts/hero-charts";
import { Aurora } from "@/components/motion/aurora";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* The foundation word — split for a per-letter rise. */
const GHOST = "ACTUARY".split("");

/* One registered type size shared by every layer of the word — the
   outline twins, the scanner fill and its bloom must be pixel-identical
   so the colour always sits inside the strokes. The 34vh cap keeps the
   band SHORT on laptop heights, so the copy column never physically
   overlaps the word — the band owns its floor end to end. */
const WORD_TYPE =
  "whitespace-nowrap text-center font-display text-[min(24.5vw,34vh)] font-extrabold leading-[0.76] tracking-[-0.05em] will-change-transform lg:text-[min(21vw,34vh)] xl:text-[min(23vw,34vh)]";

/* ------------------------------------------------------------------ */
/*  Instrument console — the hero's floor terminal.                    */
/*  One slim glass bar pinned to the bottom edge: availability        */
/*  status, three live actuarial readouts, scroll cue. It sits        */
/*  BELOW the foundation word, so the giant type is never covered    */
/*  by a card again — the word owns its band, end to end.             */
/* ------------------------------------------------------------------ */
const READOUTS = [
  { key: "freq", label: "Claims frequency", value: "Poisson · NegBin", Chart: MiniDistribution },
  { key: "sev", label: "Severity fit", value: "Gamma · Lognormal", Chart: MiniCurve },
  { key: "tri", label: "Run-off triangle", value: "Chain ladder", Chart: MiniTriangle },
];

function ConsoleBar({
  canEnter,
  d,
  reduce,
}: {
  canEnter: boolean;
  d: (base: number) => number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={canEnter ? { opacity: 0, y: 14 } : { opacity: 0 }}
      animate={canEnter ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay: d(0.12) }}
      className="relative z-[6] border-t border-border/60 bg-background/55 backdrop-blur-md"
    >
      {/* terminal accent hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-risk/70 via-actuary/60 to-transparent"
      />
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center gap-4 px-5 md:gap-6 md:px-8">
        {/* availability status */}
        <p className="flex shrink-0 items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-foreground/70">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-actuary" aria-hidden />
          Open to work · Nairobi, KE
        </p>
        <span aria-hidden className="h-px w-5 shrink-0 bg-border/70" />
        {/* live readouts — desktop only */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex xl:gap-10">
          {READOUTS.map(({ key, label, value, Chart }) => (
            <div key={key} className="group flex min-w-0 items-center gap-2.5">
              <p className="truncate font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </p>
              {canEnter ? (
                <Chart className="console-chart h-4 w-14 shrink-0" />
              ) : (
                <span aria-hidden className="h-4 w-14 shrink-0" />
              )}
              <p className="hidden truncate font-mono text-[9.5px] tracking-wide text-foreground/55 transition-colors group-hover:text-foreground/85 xl:block">
                {value}
              </p>
            </div>
          ))}
        </div>
        {/* scroll cue */}
        <div className="ml-auto flex shrink-0 items-center gap-3" aria-hidden>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60 sm:inline">
            Scroll to begin
          </span>
          <span className="relative h-6 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-foreground"
              animate={reduce ? undefined : { y: [-12, 30] }}
              transition={reduce ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </div>
      {/* clearance for the fixed HUD */}
      <div aria-hidden className="h-8" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Registration crosshair — print-crop precision mark.                */
/* ------------------------------------------------------------------ */
function Crosshair({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute h-3.5 w-3.5 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/40" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/40" />
      <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-risk/70" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  "uncertainty" — the one word that never settles.                   */
/* ------------------------------------------------------------------ */
function UncertainWord({ reduce }: { reduce: boolean | null }) {
  return (
    <span
      className="text-gradient font-accent text-[1.18em] italic leading-none"
      aria-label="uncertainty"
    >
      {"uncertainty".split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          animate={reduce ? undefined : { y: [0, -3.5, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.17 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  One chromatic layer of the foundation word.                        */
/* ------------------------------------------------------------------ */
function GhostLayer({
  variant,
  canEnter,
  d,
  reduce,
  style,
  className,
  interactive = false,
}: {
  variant: "back" | "front";
  canEnter: boolean;
  d: (base: number) => number;
  reduce: boolean | null;
  style?: MotionStyle;
  className: string;
  interactive?: boolean;
}) {
  const base = variant === "back" ? 0.2 : 0.26;
  return (
    <motion.div style={style} className={`${className} ${WORD_TYPE}`}>
      {GHOST.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={canEnter ? (reduce ? { opacity: 0 } : { y: "46%", opacity: 0 }) : { opacity: 0 }}
          animate={canEnter ? (reduce ? { opacity: 1 } : { y: 0, opacity: 1 }) : undefined}
          transition={{ duration: 1.15, ease: EASE_OUT, delay: d(base + i * 0.05) }}
        >
          {interactive ? (
            /* hover group — its own span, so framer's inline entrance
               transform never fights the CSS interaction transform */
            <span className="ghost-letter" data-cursor="hover">
              <span className="g-stroke">{ch}</span>
              <span className="g-fill">{ch}</span>
            </span>
          ) : (
            ch
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* Rising actuarial glyphs — data embers drifting up behind the portrait. */
const EMBERS: { g: string; left: string; bottom: string; t: string; d: string; x: string; o: number; c: string; s: string }[] = [
  { g: "σ²", left: "2%", bottom: "22%", t: "12s", d: "0s", x: "16px", o: 0.5, c: "text-actuary", s: "text-[12px]" },
  { g: "λ", left: "18%", bottom: "6%", t: "10.5s", d: "2.4s", x: "-12px", o: 0.42, c: "text-risk", s: "text-[13px]" },
  { g: "μ", left: "-8%", bottom: "38%", t: "14s", d: "1.2s", x: "10px", o: 0.32, c: "text-foreground", s: "text-[11px]" },
  { g: "E[X]", left: "86%", bottom: "30%", t: "11s", d: "3.6s", x: "-14px", o: 0.46, c: "text-risk", s: "text-[10px]" },
  { g: "95%", left: "66%", bottom: "4%", t: "13s", d: "5.1s", x: "-10px", o: 0.4, c: "text-actuary", s: "text-[11px]" },
  { g: "n→∞", left: "-5%", bottom: "10%", t: "15s", d: "4.2s", x: "18px", o: 0.36, c: "text-actuary", s: "text-[11px]" },
  { g: "P(X≤k)", left: "82%", bottom: "8%", t: "12.5s", d: "6.3s", x: "12px", o: 0.38, c: "text-foreground", s: "text-[9px]" },
  { g: "χ²", left: "34%", bottom: "2%", t: "11.5s", d: "0.8s", x: "-16px", o: 0.44, c: "text-risk", s: "text-[12px]" },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E\")";

export function Hero({ ready = true }: { ready?: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // entrance handoff from the preloader — fires mid-curtain-exit, so
  // every delay below is staged bottom-up to match the wipe
  const d = (base: number) => (ready ? base : 0);
  const canEnter = ready || !!reduce;

  // ---- pointer tilt for the portrait (fine pointers only) ----
  // The pair starts at a rest pose, so the scanner light parks just left
  // of the word's centre from first paint — colour on load, clear of the
  // copy on short screens, and unmoved on touch devices.
  const mx = useMotionValue(-0.1);
  const my = useMotionValue(0.52);
  const tiltRX = useSpring(useTransform(my, [-1, 1], [2.4, -2.4]), { stiffness: 55, damping: 16 });
  const tiltRY = useSpring(useTransform(mx, [-1, 1], [-3, 3]), { stiffness: 55, damping: 16 });

  // ---- chromatic counter-parallax for the foundation word ----
  // (asymmetric ranges leave a +2px rest offset on the back layer,
  //  so the duotone split is always faintly present)
  const layerAX = useSpring(useTransform(mx, [-1, 1], [13, -9]), { stiffness: 45, damping: 20 });
  const layerAY = useSpring(useTransform(my, [-1, 1], [9, -5]), { stiffness: 45, damping: 20 });
  const layerBX = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 45, damping: 20 });
  const layerBY = useSpring(useTransform(my, [-1, 1], [-5, 5]), { stiffness: 45, damping: 20 });

  // ---- scanner light for the foundation word ----
  // The cursor is the lamp: a springed fill that glides through the
  // letters. Horizontal tracks the section width; vertical maps the
  // lower half of the hero across the band, so the light parks just
  // above the word while you read the copy — then ignites it as you
  // descend toward the console.
  const spotX = useSpring(useTransform(mx, [-1, 1], ["3%", "97%"]), { stiffness: 40, damping: 20 });
  const spotY = useSpring(useTransform(my, [0.3, 0.95], ["-12%", "112%"]), { stiffness: 40, damping: 20 });
  const spotVars = (reduce ? undefined : { "--sx": spotX, "--sy": spotY }) as
    | CSSProperties
    | undefined;

  // ---- scroll choreography ----
  // Copy never fades below 0.42: the statement and the CTAs stay
  // legible and functional until the section itself scrolls away —
  // no dead-looking half-transparent buttons.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const fade = useTransform(scrollYProgress, [0.32, 1], [1, 0.42]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const imgY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const bandX = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const bandFade = useTransform(scrollYProgress, [0.38, 1], [1, 0.72]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  const enter = (delay: number, y = 18, scale?: number) => ({
    initial: canEnter
      ? reduce
        ? { opacity: 0 }
        : scale !== undefined
          ? { opacity: 0, y, scale }
          : { opacity: 0, y }
      : { opacity: 0 },
    animate: canEnter
      ? scale !== undefined
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 1, y: 0 }
      : undefined,
    transition: { duration: 0.75, ease: EASE, delay: d(delay) },
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="noise-overlay relative flex min-h-svh flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* ------------ backdrop: aurora, grid, veils ------------ */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={reduce ? undefined : { opacity: auroraOpacity }}>
        <Aurora />
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent" />
        {/* radial glows behind both columns — stronger in light mode for depth */}
        <div className="absolute right-[-6%] top-1/2 hidden h-[80%] w-[46%] -translate-y-1/2 rounded-full bg-risk/15 blur-[130px] dark:bg-risk/10 lg:block" />
        <div className="absolute left-[-8%] top-[18%] hidden h-[55%] w-[42%] rounded-full bg-actuary/10 blur-[120px] dark:opacity-60 lg:block" />
      </motion.div>

      {/* -------------------------------------------------------------- */}
      {/*  FOUNDATION WORD — "ACTUARY", a live instrument on the floor.   */}
      {/*  Four band-aligned layers: the emerald chromatic twin, the     */}
      {/*  scanner's colour bloom, the scanner light itself (a gradient  */}
      {/*  fill that follows the cursor), and the blue outline letters —  */}
      {/*  each an interactive group that inks up per-glyph on hover.     */}
      {/*  The word owns its band end to end and carries colour from     */}
      {/*  first paint — nothing covers it, nothing washes it out.        */}
      {/* -------------------------------------------------------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[88px] z-[3] select-none"
      >
        {/* short-screen guard: melts the word's top-left edge under any
            copy that dips low on laptop heights (see .ghost-guard) */}
        <span className="ghost-guard" />
        {/* atmospheric glow lifting the word off the floor */}
        <div className="absolute left-[58%] top-1/2 h-[160px] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-risk/[0.12] blur-[90px] dark:bg-risk/[0.15]" />
        <motion.div
          style={reduce ? undefined : { x: bandX, opacity: bandFade }}
          className="ghost-band relative"
        >
          {reduce ? null : (
            <GhostLayer
              variant="back"
              canEnter={canEnter}
              d={d}
              reduce={reduce}
              style={{ x: layerAX, y: layerAY }}
              className="ghost-stroke-actuary absolute inset-x-0 bottom-0 opacity-90"
            />
          )}
          {/* glow — the scanner's colour bloom, trailing the light */}
          {canEnter && (
            <motion.span
              aria-hidden
              className={`ghost-spot-glow absolute inset-x-0 bottom-0 ${WORD_TYPE}`}
              style={spotVars}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: d(1.5) }}
            >
              {GHOST.join("")}
            </motion.span>
          )}
          {/* spot — the scanner light: gradient fill following the cursor */}
          {canEnter && (
            <motion.span
              aria-hidden
              className={`ghost-spot absolute inset-x-0 bottom-0 ${WORD_TYPE}`}
              style={spotVars}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: d(1.62) }}
            >
              {GHOST.join("")}
            </motion.span>
          )}
          <GhostLayer
            variant="front"
            interactive
            canEnter={canEnter}
            d={d}
            reduce={reduce}
            style={reduce ? undefined : { x: layerBX, y: layerBY }}
            className="ghost-stroke-risk relative"
          />
          {/* one-shot calibration sweep — an instrument scanning the word */}
          {canEnter && !reduce && (
            <motion.span
              initial={{ x: "-14vw", opacity: 0 }}
              animate={{ x: "114vw", opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: 2, ease: "easeInOut", delay: d(1.95), opacity: { times: [0, 0.1, 0.88, 1] } }}
              className="absolute bottom-[4%] left-0 h-[92%] w-px bg-gradient-to-b from-transparent via-risk/70 to-transparent"
            />
          )}
        </motion.div>
      </div>

      {/* mobile: a soft floor veil keeps the statement and CTAs readable
          over the foundation word; trimmed so the word still reads
          through it. Desktop shows the word end to end, unveiled */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[36%] bg-gradient-to-t from-background via-background/55 to-transparent lg:hidden"
      />

      {/* ------------ main composition ------------ */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-24 md:px-8 lg:pt-24">
        {/*
          On mobile the copy wrapper is display:contents, so its blocks and
          the portrait interleave in one grid: name → portrait → statement.
          On lg the wrapper is a TOP-ANCHORED flex column in column 1 (masthead
          alignment under the nav), beside the centered portrait in column 2 —
          so the copy column ends high above the foundation word.
        */}
        <div className="grid w-full items-center gap-10 lg:h-[calc(100svh-217px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="contents lg:flex lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex-col lg:self-stretch lg:justify-start">
            {/* --- name block: masthead + name + role --- */}
            <motion.div
              style={reduce ? undefined : { y: copyY, opacity: fade }}
              className="relative z-[5] order-1"
            >
              {/* masthead */}
              <motion.div {...enter(0.62)} className="mb-5 flex items-center gap-4">
                <span className="rounded-full border border-border/90 bg-card/50 px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.18em] text-foreground/75 backdrop-blur-sm">
                  00 · ARRIVAL
                </span>
                <motion.span
                  aria-hidden
                  className="h-px flex-1 origin-left bg-border/80"
                  initial={{ scaleX: 0 }}
                  animate={canEnter ? { scaleX: 1 } : undefined}
                  transition={{ duration: 1, ease: EASE_OUT, delay: d(0.7) }}
                />
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground sm:inline">
                  Portfolio — 2026
                </span>
              </motion.div>

              {/* the name: grotesque force + serif italic grace */}
              <h1 className="font-display font-extrabold leading-[0.96] tracking-[-0.02em]">
                <span className="sr-only">Naomi Wambui — Graduate Actuarial Analyst</span>
                <span aria-hidden className="block overflow-hidden pb-[0.05em] -mb-[0.05em]">
                  <motion.span
                    className="block text-[clamp(3.5rem,8.6vw,7.6rem)] text-foreground will-change-transform"
                    initial={canEnter ? (reduce ? { y: 0, opacity: 0 } : { y: "112%", opacity: 0.001 }) : { opacity: 0 }}
                    animate={canEnter ? { y: 0, opacity: 1 } : undefined}
                    transition={{ duration: 1.05, ease: EASE, delay: d(0.74) }}
                  >
                    NAOMI
                  </motion.span>
                </span>
                <span aria-hidden className="block overflow-hidden pb-[0.12em] -mb-[0.04em]">
                  <motion.span
                    className="text-gradient-hero block font-accent text-[clamp(3.9rem,9.4vw,8.2rem)] font-normal italic leading-[0.9] will-change-transform"
                    style={{ transformOrigin: "0% 100%" }}
                    initial={canEnter ? (reduce ? { y: 0, opacity: 0 } : { y: "115%", rotate: 2.5, opacity: 0.001 }) : { opacity: 0 }}
                    animate={canEnter ? { y: 0, rotate: 0, opacity: 1 } : undefined}
                    transition={{ duration: 1.15, ease: EASE, delay: d(0.88) }}
                  >
                    Wambui
                  </motion.span>
                </span>
              </h1>

              {/* role line */}
              <motion.div {...enter(1.02)} className="mt-4 flex items-center gap-4">
                <motion.span
                  aria-hidden
                  className="h-px w-12 origin-left bg-gradient-to-r from-risk via-actuary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={canEnter ? { scaleX: 1 } : undefined}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: d(1.12) }}
                />
                <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.34em] text-foreground/85">
                  Graduate Actuarial Analyst · Class of 2026
                </p>
              </motion.div>
            </motion.div>

            {/* --- statement block: statement + supporting + CTAs --- */}
            <motion.div
              style={reduce ? undefined : { y: copyY, opacity: fade }}
              className="relative z-[5] order-3 mt-1 lg:mt-3"
            >
              <motion.p
                {...enter(1.12, 22)}
                className="mt-4 max-w-[34ch] text-[18px] font-medium leading-snug text-foreground/90 md:text-[19.5px]"
              >
                I model <UncertainWord reduce={reduce} /> — turning probability, data and
                honest assumptions into decisions that hold up.
              </motion.p>

              <motion.p
                {...enter(1.2, 16)}
                className="mt-3 max-w-[52ch] text-[13.5px] leading-relaxed text-muted-foreground"
              >
                {profile.eyebrow} — seven applied studies across insurance, pensions,
                reserving and investment risk, each built to be defended, not just displayed.
              </motion.p>

              {/* CTAs — each lands on its own beat, primary sweeps once */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <motion.div {...enter(1.3, 14, 0.96)}>
                  <Magnetic strength={0.22}>
                    <a
                      href="#featured"
                      data-cursor="hover"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-primary to-primary/88 px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-risk/30 ring-1 ring-primary/60 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-risk/40 hover:brightness-110 active:scale-[0.98]"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                      >
                        {canEnter && !reduce && (
                          <motion.span
                            initial={{ x: "-140%" }}
                            animate={{ x: "340%" }}
                            transition={{ duration: 1.15, ease: "easeInOut", delay: d(2.05) }}
                            className="absolute inset-y-0 left-0 w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                          />
                        )}
                      </span>
                      Explore the work
                      <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
                    </a>
                  </Magnetic>
                </motion.div>
                <motion.div {...enter(1.38, 14, 0.96)}>
                  <Magnetic strength={0.22}>
                    <a
                      href="#contact"
                      data-cursor="hover"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/75 px-6 py-3 text-sm font-semibold text-foreground shadow-lg shadow-black/10 backdrop-blur-md transition-colors hover:border-risk/50 hover:text-risk"
                    >
                      <FileText size={15} />
                      Download CV
                    </a>
                  </Magnetic>
                </motion.div>
                <motion.div {...enter(1.46, 14, 0.96)}>
                  <a
                    href="#about"
                    data-cursor="hover"
                    className="link-sweep rounded-full bg-card/55 px-4 py-3 text-sm font-semibold text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                  >
                    About Naomi
                    <ArrowUpRight size={14} className="ml-1 inline" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ================= portrait column ================= */}
          <div className="relative z-[1] order-2 mt-2 flex items-center justify-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:justify-end lg:self-stretch lg:pr-7">
            {/* data embers — equations drifting up behind the portrait */}
            {!reduce && (
              <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden select-none lg:block">
                {EMBERS.map((e) => (
                  <span
                    key={e.g}
                    className={`ember absolute font-mono ${e.c} ${e.s}`}
                    style={
                      {
                        left: e.left,
                        bottom: e.bottom,
                        "--ember-t": e.t,
                        "--ember-d": e.d,
                        "--ember-x": e.x,
                        "--ember-o": e.o,
                      } as CSSProperties
                    }
                  >
                    {e.g}
                  </span>
                ))}
              </div>
            )}

            <motion.div
              style={reduce ? undefined : { y: portraitY }}
              className="relative z-[1] w-full max-w-[440px] lg:h-full lg:max-w-none"
            >
              <div className="flex h-full items-center justify-center [perspective:1300px]">
                <motion.div
                  style={reduce ? undefined : { rotateX: tiltRX, rotateY: tiltRY }}
                  className="relative w-full lg:h-[min(72svh,41rem)] lg:w-auto lg:aspect-[4/5]"
                >
                  {/* offset editorial frame */}
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-[28px] border border-border/70"
                  />
                  {/* registration crosshairs — print-crop precision */}
                  <Crosshair className="-left-2.5 -top-2.5" />
                  <Crosshair className="-right-2.5 -top-2.5" />
                  <Crosshair className="-bottom-[18px] -left-[18px]" />
                  <Crosshair className="-bottom-[18px] -right-[18px]" />

                  {/* arch portrait — the face is never covered */}
                  <motion.div
                    initial={canEnter ? (reduce ? { opacity: 0 } : { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" }) : { opacity: 0 }}
                    animate={
                      canEnter
                        ? reduce
                          ? { opacity: 1 }
                          : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
                        : undefined
                    }
                    transition={{ duration: 1.25, ease: EASE_OUT, delay: d(0.34) }}
                    data-cursor="hover"
                    className="relative aspect-[4/5] w-full overflow-hidden border border-border/90 shadow-2xl shadow-black/20 [border-radius:999px_999px_22px_22px] lg:h-full"
                  >
                    <motion.img
                      src="/images/portrait-hero.jpg"
                      alt="Naomi Wambui — Actuarial Science graduate"
                      className="absolute -top-[7%] left-0 h-[114%] w-full object-cover will-change-transform"
                      width={624}
                      height={780}
                      fetchPriority="high"
                      decoding="async"
                      initial={canEnter ? { scale: reduce ? 1 : 1.22 } : { scale: 1.22 }}
                      animate={canEnter ? { scale: 1 } : undefined}
                      transition={{ duration: 1.7, ease: EASE, delay: d(0.4) }}
                      style={reduce ? undefined : { y: imgY }}
                    />
                    {/* film grain — editorial finish */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                      style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
                    />
                    {/* inner vignette — lifts the portrait off the foundation word */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.32)] [border-radius:inherit]"
                    />
                    {/* measurement ruler — the portrait as instrument */}
                    <div aria-hidden className="absolute left-2.5 top-1/2 hidden h-[42%] -translate-y-1/2 mix-blend-difference lg:block">
                      <span className="absolute left-0 top-0 h-full w-px bg-white/30" />
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className="absolute left-0 bg-white/40"
                          style={{ top: `${i * 25}%`, height: 1, width: i % 2 === 0 ? 10 : 6 }}
                        />
                      ))}
                      <span className="absolute -top-4 left-0 font-mono text-[7px] tracking-[0.2em] text-white/55">
                        1.0
                      </span>
                      <span className="absolute -bottom-4 left-0 font-mono text-[7px] tracking-[0.2em] text-white/55">
                        0.0
                      </span>
                    </div>
                    {/* bottom veil — hands the portrait's base to the
                        foundation word that passes in front of it */}
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-background/85 via-background/30 to-transparent" />

                    {/* one-shot light sweep */}
                    {canEnter && !reduce && (
                      <motion.span
                        aria-hidden
                        initial={{ x: "-160%" }}
                        animate={{ x: "320%" }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: d(1.55) }}
                        className="absolute -inset-y-[24%] left-0 w-[38%] rotate-[12deg] bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-overlay"
                      />
                    )}
                  </motion.div>
                </motion.div>
              </div>

              {/* meridian label — outside the frame, right edge */}
              <motion.span
                {...enter(0.72)}
                className="absolute -right-7 top-1/2 hidden -translate-y-1/2 font-mono text-[9.5px] uppercase tracking-[0.32em] text-muted-foreground/50 [writing-mode:vertical-rl] xl:block"
              >
                1.2921° S — 36.8219° E
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ------------ instrument console — the hero's floor ------------ */}
      <ConsoleBar canEnter={canEnter} d={d} reduce={reduce} />
    </section>
  );
}
