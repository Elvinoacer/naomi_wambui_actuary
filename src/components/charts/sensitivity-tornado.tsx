"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChartFrame } from "./chart-frame";

/** Tornado sensitivity chart — how each assumption moves the result. */
export function SensitivityTornado({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  const factors = [
    { label: "Discount rate ±1%", minus: -7.8, plus: 8.9 },
    { label: "Mortality basis ±5%", minus: -4.6, plus: 4.9 },
    { label: "Claim frequency ±10%", minus: -9.8, plus: 9.8 },
    { label: "Severity inflation ±2%", minus: -5.4, plus: 6.1 },
    { label: "Lapse rate ±10%", minus: -2.2, plus: 2.4 },
  ];

  const W = 560;
  const H = 280;
  const padL = 158;
  const padR = 44;
  const padT = 14;
  const padB = 40;
  const maxAbs = 10.5;
  const rowH = (H - padT - padB) / factors.length;

  const px = (v: number) => padL + ((W - padL - padR) / 2) * (v / maxAbs) * -1;
  const pxPlus = (v: number) => padL + ((W - padL - padR) / 2) * (v / maxAbs);
  // centre line
  const cx = padL;

  return (
    <ChartFrame
      title="Sensitivity — Premium Impact"
      legend={[
        { label: "Assumption decrease", color: "risk" },
        { label: "Assumption increase", color: "sens" },
      ]}
      caption="One-way sensitivity of the modelled premium to each core assumption, holding others constant. Claim frequency and the discount rate dominate — the assumptions that deserve the most scrutiny."
      delay={delay}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Tornado chart showing premium sensitivity to discount rate, mortality, claim frequency, severity inflation and lapse rate"
      >
        {/* centre axis */}
        <line
          x1={cx}
          x2={cx}
          y1={padT - 4}
          y2={H - padB + 4}
          stroke="var(--muted-foreground)"
          strokeWidth="1.2"
        />
        {/* x gridlines */}
        {[-10, -5, 0, 5, 10].map((v) => {
          const gx = v === 0 ? cx : v < 0 ? px(Math.abs(v)) : pxPlus(v);
          return (
            <g key={v}>
              <line
                x1={gx}
                x2={gx}
                y1={padT - 4}
                y2={H - padB + 4}
                stroke="var(--border)"
                strokeDasharray={v === 0 ? undefined : "3 5"}
              />
              <text
                x={gx}
                y={H - padB + 18}
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted-foreground)"
                fontFamily="var(--font-plex-mono)"
              >
                {v > 0 ? `+${v}%` : `${v}%`}
              </text>
            </g>
          );
        })}

        {factors.map((f, i) => {
          const y = padT + i * rowH + rowH * 0.18;
          const h = rowH * 0.64;
          return (
            <g key={f.label}>
              <text
                x={padL - 12}
                y={y + h / 2 + 3.5}
                textAnchor="end"
                fontSize="11"
                fill="var(--foreground)"
                fontFamily="var(--font-plex-mono)"
              >
                {f.label}
              </text>
              <motion.rect
                x={px(-f.minus)}
                width={Math.abs(px(f.minus) - cx)}
                y={y}
                height={h}
                rx="5"
                fill="var(--risk)"
                fillOpacity={0.75}
                initial={reduce ? { width: Math.abs(px(f.minus) - cx) } : { width: 0 }}
                whileInView={{ width: Math.abs(px(f.minus) - cx) }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: delay + 0.2 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.rect
                x={cx}
                width={pxPlus(f.plus) - cx}
                y={y}
                height={h}
                rx="5"
                fill="var(--sens)"
                fillOpacity={0.8}
                initial={reduce ? { width: pxPlus(f.plus) - cx } : { width: 0 }}
                whileInView={{ width: pxPlus(f.plus) - cx }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: delay + 0.28 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              />
              <text
                x={px(f.minus) - 6}
                y={y + h / 2 + 3.5}
                textAnchor="end"
                fontSize="9.5"
                fill="var(--muted-foreground)"
                fontFamily="var(--font-plex-mono)"
              >
                {f.minus}%
              </text>
              <text
                x={pxPlus(f.plus) + 6}
                y={y + h / 2 + 3.5}
                textAnchor="start"
                fontSize="9.5"
                fill="var(--muted-foreground)"
                fontFamily="var(--font-plex-mono)"
              >
                +{f.plus}%
              </text>
            </g>
          );
        })}
        <text
          x={padL + (W - padL - padR) / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="10"
          fill="var(--muted-foreground)"
          fontFamily="var(--font-plex-mono)"
        >
          Change in modelled premium
        </text>
      </svg>
    </ChartFrame>
  );
}
