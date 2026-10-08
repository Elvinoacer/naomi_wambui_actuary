"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
    >
      {/* Icon swaps via CSS to avoid hydration mismatch */}
      <motion.span
        key="sun"
        className="hidden dark:flex"
        whileTap={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Sun size={16} />
      </motion.span>
      <motion.span
        key="moon"
        className="flex dark:hidden"
        whileTap={{ rotate: -90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Moon size={16} />
      </motion.span>
    </button>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // hide when scrolling down beyond hero-ish zone, reveal when scrolling up
        if (y > 480 && y - lastY > 6) setHidden(true);
        else if (lastY - y > 6 || y < 480) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = [...navLinks.map((l) => l.href.slice(1)), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{ transform: hidden && !open ? "translateY(-100%)" : "translateY(0)" }}
    >
      {/* scroll progress */}
      <motion.div
        aria-hidden
        className="h-[2px] origin-left bg-gradient-to-r from-risk via-risk to-actuary"
        style={{ scaleX: progress }}
      />
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "glass-solid border-b border-border/70 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.45)]"
            : "bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        >
          {/* Brand */}
          <a
            href="#top"
            className="group flex items-baseline gap-2.5"
            aria-label="Back to top — Naomi Wambui"
          >
            <span className="font-display text-base font-extrabold tracking-tight text-foreground">
              {profile.fullName}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60 sm:inline">
              Actuarial Science Graduate
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                  active === link.href.slice(1)
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden lg:block" strength={0.2}>
              <a
                href="#contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-risk/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Contact
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {/* Mobile panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="glass overflow-hidden border-b border-border/70 lg:hidden"
            >
              <div className="space-y-1 px-5 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium text-foreground hover:bg-accent"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="text-muted-foreground" />
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-[15px] font-semibold text-primary-foreground"
                >
                  Contact <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
