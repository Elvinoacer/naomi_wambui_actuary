"use client";

import { useRef, type ReactNode, type MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * Card with a soft radial spotlight that follows the cursor,
 * plus a hairline border glow. Pure CSS variables — no re-renders.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "var(--risk)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border bg-card transition-all duration-500",
        active ? "border-risk/40 shadow-[0_0_44px_-12px_var(--risk)]" : "border-border",
        className
      )}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--spot-x) var(--spot-y), color-mix(in srgb, ${spotlightColor} 13%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
