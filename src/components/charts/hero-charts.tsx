"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Small decorative bar distribution used in the hero collage. */
export function MiniDistribution({ className }: { className?: string }) {
  const bars = [0.22, 0.48, 0.78, 0.95, 0.66, 0.38, 0.18, 0.07];
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 90" className={className} aria-hidden>
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={8 + i * 18.5}
          width={11}
          rx={3}
          fill="var(--risk)"
          initial={reduce ? { height: 68 * h, y: 76 - 68 * h } : { height: 0, y: 76 }}
          animate={{ height: 68 * h, y: 76 - 68 * h }}
          transition={{ duration: 0.9, delay: 0.45 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      <line x1="4" y1="77" x2="156" y2="77" stroke="var(--border)" strokeWidth="1.5" />
    </svg>
  );
}

/** Small decorative density curve used in the hero collage. */
export function MiniCurve({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const d =
    "M6,80 C28,78 38,30 58,22 C78,14 88,44 104,52 C120,60 138,68 154,78";
  return (
    <svg viewBox="0 0 160 90" className={className} aria-hidden>
      <path
        d={`${d} L154,82 L6,82 Z`}
        fill="var(--actuary)"
        fillOpacity={0.12}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--actuary)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.62, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/** Small decorative reserving triangle used in the hero collage. */
export function MiniTriangle({ className }: { className?: string }) {
  const cells = [
    // [x, y, opacity]
    [0, 0, 0.9], [1, 0, 0.7], [2, 0, 0.5], [3, 0, 0.32], [4, 0, 0.2],
    [0, 1, 0.72], [1, 1, 0.55], [2, 1, 0.38], [3, 1, 0.22],
    [0, 2, 0.55], [1, 2, 0.4], [2, 2, 0.24],
    [0, 3, 0.4], [1, 3, 0.26],
    [0, 4, 0.28],
  ];
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 90" className={className} aria-hidden>
      {cells.map(([x, y, o], i) => (
        <motion.rect
          key={i}
          x={8 + (x as number) * 29}
          y={6 + (y as number) * 15.5}
          width={25}
          height={12.5}
          rx={2.5}
          fill="var(--sens)"
          initial={reduce ? { opacity: o as number } : { opacity: 0 }}
          animate={{ opacity: (o as number) * 0.8 }}
          transition={{ duration: 0.5, delay: 0.75 + i * 0.03 }}
        />
      ))}
    </svg>
  );
}

/** Tiny sparkline for inline data accents. */
export function Sparkline({
  points,
  className,
  color = "var(--risk)",
}: {
  points: number[];
  className?: string;
  color?: string;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 28 - ((p - min) / range) * 24;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 32" className={className} aria-hidden preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
