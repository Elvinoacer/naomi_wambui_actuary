"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL aurora field — the signature hero backdrop.
 * A fragment shader paints slow, flowing fbm gradients in brand colors.
 * Rendered at reduced resolution and upscaled (soft by design) at a capped
 * DPR, and paused when off-screen — effectively free when not visible.
 * Graceful fallback: layered CSS radial gradients when WebGL is missing.
 */
export function Aurora({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("webgl", { antialias: false, alpha: true, powerPreference: "low-power" });
    if (!context) return;
    const gl = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vert = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

    const frag = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1; // risk blue
uniform vec3 u_c2; // emerald
uniform vec3 u_c3; // amber
uniform float u_light; // 0 = dark mode, 1 = light

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  mat2 r=mat2(0.8,-0.6,0.6,0.8);
  for(int i=0;i<3;i++){ v+=a*noise(p); p=r*p*2.1+vec2(3.1); a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy/u_res;
  vec2 st = uv; st.x *= u_res.x/u_res.y;
  float t = u_time*0.045;

  // two fbm fields (third derived) — 3 octaves each, cheap even in software
  float f1 = fbm(st*1.6 + vec2(t, -t*0.6));
  float f2 = fbm(st*2.2 - vec2(t*0.7, t*0.4) + 4.7);
  float f3 = f1*0.35 + f2*0.45 + 0.12*sin(t+st.x);

  // domain-warped flow field
  float field = f1*0.6 + f2*0.3 + f3*0.15;
  float band1 = smoothstep(0.42, 0.62, field + 0.10*sin(t*2.0+st.y*2.0));
  float band2 = smoothstep(0.52, 0.74, field + 0.08*cos(t*1.6+st.x*2.4));
  float band3 = smoothstep(0.62, 0.85, f2 + 0.06*sin(t+st.x));

  vec3 col = vec3(0.0);
  col += u_c1 * band1 * (u_light>0.5 ? 0.36 : 0.42);
  col += u_c2 * band2 * (u_light>0.5 ? 0.27 : 0.34);
  col += u_c3 * band3 * (u_light>0.5 ? 0.19 : 0.20);

  // vertical falloff — brightest at top, dies toward fold
  col *= smoothstep(-0.15, 0.85, 1.0-uv.y*1.35);

  // subtle vignette
  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5,0.45)));
  col *= mix(0.55, 1.0, vig);

  float alpha = max(max(col.r,col.g),col.b)*1.35;
  gl_FragColor = vec4(col, min(1.0, alpha));
}`;

    function compile(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uC1 = gl.getUniformLocation(prog, "u_c1");
    const uC2 = gl.getUniformLocation(prog, "u_c2");
    const uC3 = gl.getUniformLocation(prog, "u_c3");
    const uLight = gl.getUniformLocation(prog, "u_light");

    function hexToRgb(hex: string): [number, number, number] {
      const v = parseInt(hex.slice(1), 16);
      return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
    }

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5; // render small, upscale — soft is the aesthetic
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const t0 = performance.now();
    let lastTheme = "";
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      resize();
      const dark = document.documentElement.classList.contains("dark");
      const themeKey = dark ? "dark" : "light";
      if (themeKey !== lastTheme) {
        lastTheme = themeKey;
        const c1 = hexToRgb(dark ? "#60a5fa" : "#2563eb");
        const c2 = hexToRgb(dark ? "#34d399" : "#0f9d76");
        const c3 = hexToRgb(dark ? "#fbbf24" : "#d97706");
        gl.uniform3fv(uC1, c1);
        gl.uniform3fv(uC2, c2);
        gl.uniform3fv(uC3, c3);
        gl.uniform1f(uLight, dark ? 0 : 1);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 12.0 : (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div aria-hidden className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* CSS fallback under the canvas — also enriches the shader's edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 42% at 18% 8%, color-mix(in srgb, var(--risk) 16%, transparent), transparent 70%), radial-gradient(46% 38% at 85% 22%, color-mix(in srgb, var(--actuary) 12%, transparent), transparent 70%), radial-gradient(38% 34% at 60% 90%, color-mix(in srgb, var(--sens) 9%, transparent), transparent 72%)",
        }}
      />
    </div>
  );
}
