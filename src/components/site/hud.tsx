"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

interface ChapterRef {
  label: string;
  top: number;
}

/**
 * The living HUD — a fixed frame that makes the page feel like a
 * running instrument: current chapter, live Nairobi time, scroll depth.
 * Blends with either theme via mix-blend-difference. Desktop only.
 *
 * Chapter tracking is deterministic: section tops are cached once (and
 * on resize), then the active chapter is derived from scroll position —
 * no observer lifecycle, no missed callbacks.
 */
export function Hud() {
  const [chapter, setChapter] = useState("00 · ARRIVAL");
  const [pct, setPct] = useState(0);
  const [time, setTime] = useState("--:--:--");
  const chapters = useRef<ChapterRef[]>([]);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    const list = chapters.current;
    if (!list.length) return;
    const midline = y + window.innerHeight * 0.5;
    let current = list[0];
    for (const c of list) {
      if (c.top <= midline) current = c;
    }
    setChapter((prev) => (prev === current.label ? prev : current.label));
  });

  useEffect(() => {
    // Cache chapter anchors — recomputed on resize (vh-based sections)
    const measure = () => {
      chapters.current = Array.from(
        document.querySelectorAll("[data-chapter]")
      ).map((el) => ({
        label: el.getAttribute("data-chapter") ?? "",
        top: (el as HTMLElement).offsetTop,
      }));
    };
    measure();
    window.addEventListener("resize", measure);

    // Nairobi runs on East Africa Time — the portfolio's home meridian
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Nairobi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);

    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(id);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] hidden items-end justify-between px-5 pb-4 text-white mix-blend-difference md:flex md:px-8"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.24em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={chapter}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="block"
          >
            [ {chapter} ]
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="tnum flex gap-5 font-mono text-[10px] uppercase tracking-[0.24em]">
        <span>NBO {time} EAT</span>
        <span>{String(pct).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
