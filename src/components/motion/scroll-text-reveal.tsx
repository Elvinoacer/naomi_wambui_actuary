"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

/**
 * Word-by-word text reveal driven by scroll progress.
 * Words fade from muted to full colour as the reader scrolls through.
 */
export function ScrollTextReveal({
  text,
  className,
  highlightWords = [],
  highlightClass = "text-gradient",
}: ScrollTextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("relative flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const isHighlight = highlightWords.some((h) =>
          word.toLowerCase().includes(h.toLowerCase())
        );
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            reduce={!!reduce}
            highlight={isHighlight ? highlightClass : undefined}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
  highlight,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduce: boolean;
  highlight?: string;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [8, 0]);

  if (reduce) {
    return (
      <span className={cn("mr-[0.32em] inline-block", highlight)}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("mr-[0.32em] inline-block will-change-transform", highlight)}
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  );
}
