# Naomi Wambui — Actuarial Science Portfolio

A state-of-the-art, single-page portfolio for **Naomi Wambui**, Actuarial Science
graduate (BSc, Moi University, Kenya). Positioned honestly as a fresh graduate
with strong quantitative foundations in risk modelling, insurance analytics and
financial mathematics.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**,
**shadcn/ui**, **Framer Motion 12**, **Lenis** (buttery smooth scrolling), **GSAP +
ScrollTrigger** (pinned horizontal gallery), a custom **WebGL aurora shader** in the
hero, a cinematic **preloader**, a **custom dual-layer cursor**,
**scroll-velocity marquees**, and hand-crafted animated SVG actuarial charts.

---

## ✨ What's inside

| Area | Details |
|---|---|
| **Chaptered scroll experience** | The page reads like a film in 11 chapters — `00 ARRIVAL → 10 INVITATION` — with a living HUD (current chapter, live Nairobi clock, scroll depth) tracking your position |
| **CH.01 · The Snapshot** | Pinned “living dossier”: the six key facts every recruiter asks first lock into the record one by one, with a scanner line, ghost numerals and a self-building fact rail |
| **CH.02 · The Manifesto** | Pinned philosophy scrub — the statement reveals word by word, then recedes as the five principles activate in sequence; the sentence is the table of contents for the cards |
| **CH.03 · The Case Cinema** | The flagship final-year project as a four-stage scroll film: The Problem → The Data (nine-field ledger) → The Model (frequency & severity panels) → The Outcome (evidence checklist + headline result) |
| **CH.08 · The Journey** | Sticky stacking cards — the years, coursework, honest exam progress and the learning frontier physically stack up as you scroll |
| **Majestic hero** | Editorial-cover composition: grotesque "NAOMI" + serif-italic gradient "Wambui", broadsheet masthead, and "ACTUARY" as a **full-bleed duotone foundation band** — chromatic blue/green stroke layers with pointer counter-parallax, per-letter rise, dissolving edge masks, colliding only with the portrait. Full-height arch portrait with curtain unveil, light sweep, pointer tilt, scroll parallax, registration crosshairs, film grain, measurement ruler and rising actuarial glyphs (σ², λ, n→∞) — face never covered. Glass **instruments console** with self-drawing charts floats over the word; "uncertainty" waves letter-by-letter; fog gradient keeps all copy crisp |
| **Animated actuarial charts** | Poisson vs Negative Binomial frequency bars, Gamma/Lognormal severity densities, Kaplan-Meier survival curve with confidence band, claims development triangle heatmap, sensitivity tornado — all pure SVG, drawing themselves on scroll |
| **Case-study dialogs** | Every project opens a full case study: problem → approach → tools → evidence |
| **Interactive skills** | Tabbed skill groups with animated proficiency bars, tool rings, marquee |
| **Theming** | Dark (default) & light themes per the design spec, with animated toggle |
| **UX & a11y** | WCAG-AA-minded: semantic HTML, ARIA labels, keyboard-friendly dialogs (Esc), focus rings, `prefers-reduced-motion` support (calm static variants of every pinned chapter), responsive from 360px to 4K |
| **SEO** | Metadata, Open Graph, JSON-LD `Person` + `EducationalOccupationalCredential` structured data |

## 🚀 Quick start

```bash
# 1. Install dependencies (any one of these)
npm install
# or: pnpm install
# or: bun install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Deploy in one click to [Vercel](https://vercel.com) — zero configuration needed.

## 📁 Project structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts (Manrope · Geist · IBM Plex Mono), SEO, JSON-LD, theme provider
│   ├── page.tsx            # Section composition
│   ├── globals.css         # Design tokens, actuarial palette, textures, utilities
│   └── icon.svg            # Favicon (animated-bars monogram)
├── components/
│   ├── site/               # All page sections (hero, projects, experience, …)
│   ├── charts/             # Animated SVG actuarial charts
│   └── motion/             # Reveal, counter, magnetic, marquee, spotlight, text-reveal
├── lib/
│   └── portfolio.ts        # ✏️ ALL CONTENT LIVES HERE — edit this file to customise
└── ...
public/images/              # Optimised imagery (portrait, projects, skyline)
```

## ✏️ Customising the content

Every word of content lives in **`src/lib/portfolio.ts`** — profile, snapshot
stats, projects, experience, capabilities, skills, exams, education, timeline,
philosophy, recruiter summary and contact details. Edit that single file to
make the portfolio yours.

Theme colours are CSS variables in **`src/app/globals.css`** (`:root` for
light, `.dark` for dark): `--risk` (blue), `--actuary` (green), `--sens`
(amber), plus background/surface/border tokens.

## 📋 Publishing checklist (before going live)

This build follows the portfolio specification's honest-placeholder policy.
Verify and replace the following before publishing:

- [ ] Real portrait photo (`public/images/portrait.jpg`)
- [ ] Correct graduation year & degree classification
- [ ] Real email address (`profile.email` in `portfolio.ts`)
- [ ] Real LinkedIn URL (`profile.linkedin`)
- [ ] Attach a real CV and wire up the **Download CV** buttons
- [ ] Verify professional exam status (never mark an exam *passed* unless verified)
- [ ] Verify project titles & outputs against real coursework
- [ ] Replace the example internship/attachment entry with real experience
- [ ] Confirm tool proficiency levels honestly
- [ ] Remove any confidential data from project write-ups
- [ ] Test all charts, links and the CV download
- [ ] Run an accessibility & Lighthouse pass

> **Integrity rule baked into the design:** the site deliberately does *not*
> present Naomi as a qualified actuary — exam statuses render as
> *Preparing* / *Planned*, the attachment section is labelled as example
> placement content, and the positioning statement says it plainly.

## 🛠 Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui (New York) + Lucide icons
- **Framer Motion 12** for scroll-driven choreography (`useScroll`/`useTransform` pinned chapters, scrub reveals, stacking cards)
- **Lenis 1.3** smooth scrolling synced to the GSAP ticker
- **GSAP 3.15 + ScrollTrigger** for the pinned horizontal project gallery
- **WebGL fragment shader** (aurora flow field) as the hero backdrop
- Editorial serif accent (Instrument Serif italic) over the Manrope/Geist/Plex Mono system
- Cinematic preloader with counter + dual-curtain exit
- Custom cursor (dot + springy ring, "Open case" morph on project panels)
- Living HUD: chapter tracker, live Nairobi clock (EAT), scroll depth meter
- Scroll-velocity-reactive marquees (hero disciplines + footer name band)
- Full `prefers-reduced-motion` fallbacks: native scroll, no pins, static dossier/cinema/manifesto variants
- Charts are hand-built **SVG** (no chart library) — lightweight, themeable, crisp
- **next-themes** for dark/light mode

## 📄 License

Personal portfolio project. Imagery is placeholder stock photography sourced
for demonstration — replace with licensed/personal assets before publication.
