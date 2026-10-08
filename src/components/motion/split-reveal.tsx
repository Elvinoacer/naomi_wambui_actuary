"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Masked line-by-line (or word-by-word) reveal used for display typography.
 * Each unit rises from behind an overflow mask with a stagger — the
 * signature editorial motion of top-tier studio sites.
 */
export function SplitReveal({
  text,
  as = "span",
  by = "word",
  className = "",
  unitClassName = "",
  delay = 0,
  stagger = 0.045,
  duration = 0.85,
  once = true,
  y = "112%",
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  by?: "word" | "line";
  className?: string;
  unitClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  y?: string;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;
  const units = text.split(by === "word" ? " " : "\n");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block will-change-transform ${unitClassName}`}
            initial={{ y, opacity: 0.001 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once, margin: "-8% 0px" }}
            transition={{ duration, ease: EASE, delay: delay + i * stagger }}
          >
            {unit}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Rich variant: JSX children per line, each masked & risen in sequence.
 */
export function MaskLines({
  children,
  className = "",
  stagger = 0.09,
  delay = 0,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div className={className}>
      {children.map((child, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.div
            initial={{ y: "112%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
            className="will-change-transform"
          >
            {child}
          </motion.div>
        </span>
      ))}
    </div>
  );
}

export { Fragment };
