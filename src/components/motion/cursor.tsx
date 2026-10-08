"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Elite dual-layer cursor: instant dot + springy trailing ring.
 * Morphs over links/buttons ("data-cursor='hover'") and shows a "View"
 * label over project cards (data-cursor="view").
 * Visibility is CSS-driven: only shown for fine pointers without reduced motion.
 */
export function Cursor() {
  const [mode, setMode] = useState<"default" | "hover" | "view" | "text">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const val = el?.getAttribute("data-cursor");
      if (val === "view") {
        setMode("view");
        setLabel(el?.getAttribute("data-cursor-label") || "View");
      } else if (val === "hover") {
        setMode("hover");
      } else if (val === "text") {
        setMode("text");
      } else {
        setMode("default");
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [dotX, dotY]);

  const ringSize = mode === "view" ? 88 : mode === "hover" ? 52 : mode === "text" ? 6 : 34;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="cursor-layer pointer-events-none fixed left-0 top-0 z-[190]"
        style={{ x: ringX, y: ringY }}
        data-visible={visible}
      >
        <motion.div
          animate={{ width: ringSize, height: ringSize, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-[2px] transition-colors duration-200 ${
            mode === "view"
              ? "border-white/0 bg-white text-black"
              : mode === "text"
                ? "border-[#60a5fa] bg-[#60a5fa]"
                : "border-white/60 bg-white/5 mix-blend-difference"
          }`}
        >
          {mode === "view" && (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* instant dot */}
      <motion.div
        aria-hidden
        className="cursor-layer pointer-events-none fixed left-0 top-0 z-[190]"
        style={{ x: dotX, y: dotY }}
        data-visible={visible}
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference" />
      </motion.div>
    </>
  );
}
