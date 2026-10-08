"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChartFrame } from "./chart-frame";

/**
 * Animated claims development triangle.
 * Upper-left: observed cumulative claims. Lower-right: projected (dashed outline).
 * Colour intensity encodes magnitude — the signature actuarial visual.
 */
export function ReservingTriangle({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  // Cumulative claims (KES m) by accident year × development year
  const rows = [
    [420, 742, 918, 1015, 1062, 1081],
    [510, 886, 1084, 1186, 1235, null],
    [585, 1002, 1213, 1318, null, null],
    [640, 1098, 1316, null, null, null],
    [712, 1204, null, null, null, null],
    [786, null, null, null, null, null],
  ];
  const all = rows.flat().filter((v): v is number => v !== null);
  const maxV = Math.max(...all);
  const minV = Math.min(...all);

  const heat = (v: number) => {
    const t = (v - minV) / (maxV - minV);
    return t;
  };

  const W = 560;
  const H = 316;
  const padL = 60;
  const padT = 40;
  const cell = 74;
  const gap = 4;

  return (
    <ChartFrame
      title="Claims Reserving — Development Triangle"
      legend={[
        { label: "Observed cumulative claims", color: "actuary" },
        { label: "Projected (chain ladder)", color: "sens", dashed: true },
      ]}
      caption="Cumulative claims by accident year (rows) and development year (columns). Age-to-age factors from the observed upper triangle project the unobserved lower-right — the basis of the reserve estimate."
      delay={delay}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Claims development triangle heatmap: cumulative claims by accident year and development year, observed in the upper left and projected in the lower right"
      >
        {/* column headers */}
        {[0, 1, 2, 3, 4, 5].map((j) => (
          <text
            key={`col-${j}`}
            x={padL + j * (cell + gap) + cell / 2}
            y={padT - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-plex-mono)"
          >
            DY{j + 1}
          </text>
        ))}
        {/* row headers */}
        {["AY1", "AY2", "AY3", "AY4", "AY5", "AY6"].map((label, i) => (
          <text
            key={`row-${label}`}
            x={padL - 10}
            y={padT + i * (cell * 0.62 + gap) + (cell * 0.62) / 2 + 3}
            textAnchor="end"
            fontSize="10"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-plex-mono)"
          >
            {label}
          </text>
        ))}

        {rows.map((row, i) =>
          row.map((v, j) => {
            if (v === null) return null;
            const isProjected = j > rows.length - 1 - i;
            const t = heat(v);
            const cw = cell;
            const ch = cell * 0.62;
            const x = padL + j * (cell + gap);
            const y = padT + i * (ch + gap);
            return (
              <motion.g
                key={`${i}-${j}`}
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: delay + 0.2 + (i + j) * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: `${x + cw / 2}px ${y + ch / 2}px` }}
              >
                <rect
                  x={x}
                  y={y}
                  width={cw}
                  height={ch}
                  rx="7"
                  fill={isProjected ? "var(--sens)" : "var(--actuary)"}
                  fillOpacity={isProjected ? 0.1 + t * 0.16 : 0.12 + t * 0.55}
                  stroke={isProjected ? "var(--sens)" : "transparent"}
                  strokeWidth="1.4"
                  strokeDasharray={isProjected ? "5 4" : undefined}
                />
                <text
                  x={x + cw / 2}
                  y={y + ch / 2 + 3.5}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="600"
                  fill={isProjected ? "var(--sens)" : "var(--foreground)"}
                  fontFamily="var(--font-plex-mono)"
                >
                  {v.toLocaleString()}
                </text>
              </motion.g>
            );
          })
        )}
      </svg>
    </ChartFrame>
  );
}
