"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChartFrame } from "./chart-frame";

/** Animated survival (retention) curve with confidence band. */
export function SurvivalCurve({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <ChartFrame
      title="Policy Survival — Retention Curve"
      legend={[
        { label: "S(t) — proportion still in force", color: "actuary" },
        { label: "95% confidence band", color: "risk", dashed: true },
      ]}
      caption="Survival-model thinking applied to policy lapse: the proportion of policies still in force over time. Censored observations (policies ending mid-study for reasons other than lapse) are handled honestly rather than dropped."
      delay={delay}
    >
      <SurvivalSvg delay={delay} reduce={!!reduce} />
    </ChartFrame>
  );
}

function SurvivalSvg({ delay, reduce }: { delay: number; reduce: boolean }) {
  const W = 560;
  const H = 300;
  const padL = 46;
  const padR = 14;
  const padB = 34;
  const padT = 12;
  const tMax = 60;

  const sValues = [1, 0.96, 0.9, 0.84, 0.79, 0.75, 0.72, 0.695, 0.675, 0.66];
  const ciValues = [0, 0.012, 0.021, 0.027, 0.031, 0.034, 0.036, 0.038, 0.039, 0.04];
  const pts = sValues.map((s, i) => ({
    t: i * (tMax / 9),
    s,
    ci: ciValues[i],
  }));

  const px = (t: number) => padL + ((W - padL - padR) * t) / tMax;
  const py = (s: number) => padT + (H - padB - padT) * (1 - s);

  let curvePath = `M${px(0)},${py(1)}`;
  for (let i = 1; i < pts.length; i++) {
    curvePath += ` L${px(pts[i].t)},${py(pts[i - 1].s)} L${px(pts[i].t)},${py(pts[i].s)}`;
  }
  let bandPath = `M${px(0)},${py(1)}`;
  for (let i = 1; i < pts.length; i++) {
    bandPath += ` L${px(pts[i].t)},${py(pts[i - 1].s + pts[i - 1].ci)} L${px(pts[i].t)},${py(pts[i].s + pts[i].ci)}`;
  }
  for (let i = pts.length - 1; i >= 1; i--) {
    bandPath += ` L${px(pts[i].t)},${py(pts[i].s - pts[i].ci)}`;
  }
  bandPath += ` L${px(0)},${py(1)} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Step-function survival curve showing the proportion of policies still in force over 60 months, with a shaded 95 percent confidence band"
    >
      {/* gridlines */}
      {[1, 0.75, 0.5, 0.25].map((s) => (
        <g key={s}>
          <line
            x1={padL}
            x2={W - padR}
            y1={py(s)}
            y2={py(s)}
            stroke="var(--border)"
            strokeDasharray={s === 1 ? undefined : "3 5"}
          />
          <text
            x={padL - 8}
            y={py(s) + 3}
            textAnchor="end"
            fontSize="10"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-plex-mono)"
          >
            {s === 1 ? "1.0" : s.toFixed(2).replace("0.", ".")}
          </text>
        </g>
      ))}
      {[0, 12, 24, 36, 48, 60].map((t) => (
        <text
          key={t}
          x={px(t)}
          y={H - padB + 16}
          textAnchor="middle"
          fontSize="10.5"
          fill="var(--muted-foreground)"
          fontFamily="var(--font-plex-mono)"
        >
          {t}
        </text>
      ))}
      <text
        x={padL + (W - padL) / 2}
        y={H - 4}
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--muted-foreground)"
        fontFamily="var(--font-plex-mono)"
      >
        Months since policy inception
      </text>

      {/* confidence band */}
      <motion.path
        d={bandPath}
        fill="var(--risk)"
        fillOpacity={0.1}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 1.2 }}
      />

      {/* survival step curve */}
      <motion.path
        d={curvePath}
        fill="none"
        stroke="var(--actuary)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: delay + 0.25, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* point markers */}
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={px(p.t)}
          cy={py(p.s)}
          r="3.2"
          fill="var(--card)"
          stroke="var(--actuary)"
          strokeWidth="2"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: delay + 0.4 + (i / pts.length) * 1.8 }}
        />
      ))}
    </svg>
  );
}
