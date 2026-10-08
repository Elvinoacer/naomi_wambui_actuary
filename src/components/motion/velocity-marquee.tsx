"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Infinite marquee whose direction and speed react to scroll velocity —
 * the page literally responds to how hard you scroll. Skews slightly at
 * high velocity for an elastic, alive feel.
 */
export function VelocityMarquee({
  children,
  baseDuration = 26,
  className = "",
}: {
  children: ReactNode;
  baseDuration?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let x = 0;
    let dir = -1; // start flowing left
    let targetVel = 0;
    let vel = 0;
    let width = 0;
    let last = performance.now();
    let raf = 0;
    let paused = false;

    const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
    io.observe(track);

    const measure = () => { width = track.scrollWidth / 2; };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let lastScroll = window.scrollY;
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - last);
      // px per second of page scroll
      targetVel = ((window.scrollY - lastScroll) / dt) * 1000;
      lastScroll = window.scrollY;
      if (targetVel > 0.1) dir = -1;
      else if (targetVel < -0.1) dir = 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(64, now - last);
      last = now;
      if (paused || !width) return;

      // velocity decay toward 0
      vel += (targetVel - vel) * 0.08;
      targetVel *= 0.9;
      const speed = Math.abs(vel);

      // px/frame base drift + velocity contribution
      const base = width / (baseDuration * 60);
      const px = (base + Math.min(speed, 1400) * 0.016) * (dt / 16.67);
      x += dir * px;
      if (x <= -width) x += width;
      if (x >= 0) x -= width;

      const skew = Math.max(-6, Math.min(6, (dir * Math.min(speed, 1600)) / 260));
      // Transient frame updates should not render the React subtree every frame.
      if (movingRef.current) {
        movingRef.current.style.transform = `translateX(${x.toFixed(1)}px) skewX(${skew.toFixed(2)}deg)`;
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [baseDuration]);

  return (
    <div ref={trackRef} className={`relative overflow-hidden ${className}`} aria-hidden>
      <div
        ref={movingRef}
        className="flex w-max will-change-transform"
        style={{
          transform: "translateX(0px)",
          transition: "none",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
