"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-scrubbed parallax wrapper. Children drift vertically (and optionally
 * scale) as the section traverses the viewport — GPU-transform only.
 */
export function Parallax({
  children,
  speed = 0.3,
  scale,
  className = "",
}: {
  children: ReactNode;
  /** negative = moves up slower (background feel), positive = falls behind */
  speed?: number;
  scale?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  const s = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduce ? undefined : { y, ...(scale ? { scale: s } : {}) }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
