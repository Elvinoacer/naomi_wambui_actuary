"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChartFrame } from "./chart-frame";

/* Poisson & Negative Binomial PMFs for claim frequency */
function poissonPmf(k: number, lambda: number): number {
  let logP = -lambda + k * Math.log(lambda);
  for (let i = 2; i <= k; i++) logP -= Math.log(i);
  return Math.exp(logP);
}

function negBinPmf(k: number, r: number, p: number): number {
  // PMF with combinatorial via logs for stability
  let logC = 0;
  for (let i = 1; i <= k; i++) logC += Math.log(r + i - 1) - Math.log(i);
  return Math.exp(logC + r * Math.log(p) + k * Math.log(1 - p));
}

/** Animated frequency distribution chart — Poisson vs Negative Binomial. */
export function FrequencyChart({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  const K = 6;
  const lambda = 0.42; // average claims per policy-year
  const r = 1.15;
  const p = r / (r + lambda);

  const data = useMemo(() => {
    const pois = Array.from({ length: K + 1 }, (_, k) => poissonPmf(k, lambda));
    const nb = Array.from({ length: K + 1 }, (_, k) => negBinPmf(k, r, p));
    return { pois, nb };
  }, []);

  const W = 560;
  const H = 300;
  const padL = 46;
  const padB = 34;
  const padT = 12;
  const maxP = Math.max(...data.pois, ...data.nb) * 1.12;
  const groupW = (W - padL - 12) / (K + 1);
  const barW = groupW * 0.3;
  const scaleY = (v: number) => padT + (H - padB - padT) * (1 - v / maxP);

  return (
    <ChartFrame
      title="Claim Frequency — Count Models"
      legend={[
        { label: "Poisson", color: "risk" },
        { label: "Negative Binomial", color: "actuary" },
      ]}
      caption="Fitted distributions for claims per policy-year. The Negative Binomial's heavier tail captures overdispersion observed in the data — more mass at zero claims and at high counts."
      delay={delay}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Bar chart comparing Poisson and Negative Binomial probability mass functions for claim counts"
      >
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = padT + (H - padB - padT) * (1 - f);
          return (
            <g key={f}>
              <line
                x1={padL}
                x2={W - 8}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray={f === 0 ? undefined : "3 5"}
              />
              <text
                x={padL - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fill="var(--muted-foreground)"
                fontFamily="var(--font-plex-mono)"
              >
                {f === 0 ? "0" : `${f}`.replace("0.", ".")}
              </text>
            </g>
          );
        })}

        {data.pois.map((pv, k) => {
          const nbv = data.nb[k];
          const cx = padL + groupW * k + groupW / 2;
          const hP = H - padB - scaleY(pv);
          const hN = H - padB - scaleY(nbv);
          return (
            <g key={k}>
              {/* Poisson bar */}
              <motion.rect
                x={cx - barW - 3}
                width={barW}
                rx={3}
                fill="var(--risk)"
                fillOpacity={0.85}
                initial={reduce ? { height: hP, y: scaleY(pv) } : { height: 0, y: H - padB }}
                whileInView={{ height: hP, y: scaleY(pv) }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + 0.15 + k * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* NegBin bar */}
              <motion.rect
                x={cx + 3}
                width={barW}
                rx={3}
                fill="var(--actuary)"
                fillOpacity={0.85}
                initial={reduce ? { height: hN, y: scaleY(nbv) } : { height: 0, y: H - padB }}
                whileInView={{ height: hN, y: scaleY(nbv) }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + 0.3 + k * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
              <text
                x={cx}
                y={H - padB + 16}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--muted-foreground)"
                fontFamily="var(--font-plex-mono)"
              >
                {k}
              </text>
            </g>
          );
        })}
        <text
          x={padL + (W - padL) / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="10.5"
          fill="var(--muted-foreground)"
          fontFamily="var(--font-plex-mono)"
        >
          Number of claims in a policy-year
        </text>
      </svg>
    </ChartFrame>
  );
}
