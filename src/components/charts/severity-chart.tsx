"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChartFrame } from "./chart-frame";

/* Lanczos log-gamma approximation */
function lnGamma(z: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  let x0 = c[0];
  const t = z + g + 0.5;
  for (let i = 1; i < g + 2; i++) x0 += c[i] / (z + i);
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x0);
}

/* Gamma & Lognormal PDFs for claim severity (in KES thousands) */
function gammaPdf(x: number, k: number, theta: number): number {
  return (
    Math.exp((k - 1) * Math.log(x) - x / theta - lnGamma(k) - k * Math.log(theta))
  );
}

function lognormalPdf(x: number, mu: number, sigma: number): number {
  const lx = Math.log(x);
  return (
    Math.exp(-((lx - mu) ** 2) / (2 * sigma * sigma)) /
    (x * sigma * Math.sqrt(2 * Math.PI))
  );
}

/** Animated severity density curves — Gamma vs Lognormal. */
export function SeverityChart({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  const { gammaPath, lognPath, areaPath, ticks, maxDens } = useMemo(() => {
    // Mean 180k, sd 95k (KES thousands: mean 180)
    const k = Math.pow(180 / 95, 2);
    const theta = Math.pow(95, 2) / 180;
    const sigma = Math.sqrt(Math.log(1 + Math.pow(95 / 180, 2)));
    const mu = Math.log(180) - (sigma * sigma) / 2;

    const W = 560;
    const H = 300;
    const padL = 46;
    const padR = 12;
    const padB = 34;
    const padT = 12;
    const xMax = 520;
    const N = 140;

    const gx: number[] = [];
    const gy: number[] = [];
    const ly: number[] = [];
    const vals: number[] = [];
    for (let i = 0; i <= N; i++) {
      const x = (xMax / N) * i + 0.01;
      gx.push(x);
      const g = gammaPdf(x, k, theta);
      const l = lognormalPdf(x, mu, sigma);
      gy.push(g);
      ly.push(l);
      vals.push(g, l);
    }
    const maxV = Math.max(...vals) * 1.1;
    const px = (x: number) => padL + ((W - padL - padR) * x) / xMax;
    const py = (v: number) => padT + (H - padB - padT) * (1 - v / maxV);

    const toPath = (ys: number[]) =>
      gx.map((x, i) => `${i === 0 ? "M" : "L"}${px(x).toFixed(1)},${py(ys[i]).toFixed(1)}`).join(" ");

    const area =
      `M${px(gx[0]).toFixed(1)},${(H - padB).toFixed(1)} ` +
      gy.map((y, i) => `L${px(gx[i]).toFixed(1)},${py(y).toFixed(1)}`).join(" ") +
      ` L${px(gx[gx.length - 1]).toFixed(1)},${(H - padB).toFixed(1)} Z`;

    return {
      gammaPath: toPath(gy),
      lognPath: toPath(ly),
      areaPath: area,
      ticks: [0, 100, 200, 300, 400, 500],
      maxDens: maxV,
      // expose geometry for axis
      W, H, padL, padR, padB, padT,
    };
  }, []);

  const { W, H, padL, padR, padB, padT } = {
    W: 560, H: 300, padL: 46, padR: 12, padB: 34, padT: 12,
  };

  const yTicks = [0, maxDens / 2, maxDens].map((v) => v);

  return (
    <ChartFrame
      title="Claim Severity — Density Models"
      legend={[
        { label: "Gamma", color: "risk" },
        { label: "Lognormal", color: "sens", dashed: true },
      ]}
      caption="Fitted densities for claim size given a claim occurred (Claim Amount | Claim > 0). Both distributions are right-skewed: most claims are moderate, but the tail drives the expected cost — normal models would understate it."
      delay={delay}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Line chart of Gamma and Lognormal density curves for claim severity"
      >
        {yTicks.map((v, i) => {
          const y = padT + (H - padB - padT) * (1 - v / maxDens);
          return (
            <g key={i}>
              <line
                x1={padL}
                x2={W - padR}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray={i === 0 ? undefined : "3 5"}
              />
              {i > 0 ? (
                <text
                  x={padL - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--muted-foreground)"
                  fontFamily="var(--font-plex-mono)"
                >
                  {v.toFixed(2)}
                </text>
              ) : (
                <text
                  x={padL - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--muted-foreground)"
                  fontFamily="var(--font-plex-mono)"
                >
                  0
                </text>
              )}
            </g>
          );
        })}

        {ticks.map((t) => {
          const x = padL + ((W - padL - padR) * t) / 520;
          return (
            <text
              key={t}
              x={x}
              y={H - padB + 16}
              textAnchor="middle"
              fontSize="10.5"
              fill="var(--muted-foreground)"
              fontFamily="var(--font-plex-mono)"
            >
              {t}
            </text>
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
          Claim amount (KES '000)
        </text>

        {/* Gamma area fill */}
        <motion.path
          d={areaPath}
          fill="var(--risk)"
          fillOpacity={0.1}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 1.4 }}
        />

        {/* Gamma curve — draws itself */}
        <motion.path
          d={gammaPath}
          fill="none"
          stroke="var(--risk)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: delay + 0.2, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* Lognormal curve */}
        <motion.path
          d={lognPath}
          fill="none"
          stroke="var(--sens)"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: delay + 0.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </ChartFrame>
  );
}
