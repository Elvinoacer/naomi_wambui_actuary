"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartFrameProps {
  title: string;
  caption?: string;
  legend?: { label: string; color: "risk" | "actuary" | "sens"; dashed?: boolean }[];
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const legendColors: Record<string, string> = {
  risk: "var(--risk)",
  actuary: "var(--actuary)",
  sens: "var(--sens)",
};

/** Consistent framed container for chart visuals: title, legend, caption. */
export function ChartFrame({
  title,
  caption,
  legend,
  children,
  className,
  delay = 0,
}: ChartFrameProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm",
        className
      )}
    >
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
          {title}
        </span>
        {legend ? (
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legend.map((l) => (
              <span
                key={l.label}
                className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground"
              >
                <svg width="14" height="4" viewBox="0 0 14 4" aria-hidden>
                  <line
                    x1="0"
                    y1="2"
                    x2="14"
                    y2="2"
                    stroke={legendColors[l.color]}
                    strokeWidth="2.5"
                    strokeDasharray={l.dashed ? "4 3" : undefined}
                    strokeLinecap="round"
                  />
                </svg>
                {l.label}
              </span>
            ))}
          </span>
        ) : null}
      </figcaption>
      {children}
      {caption ? (
        <p className="mt-4 border-t border-border/70 pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </p>
      ) : null}
    </motion.figure>
  );
}
