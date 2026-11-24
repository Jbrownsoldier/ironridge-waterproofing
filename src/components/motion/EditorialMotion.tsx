"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

const ARCHITECTURAL_EASE = [0.16, 1, 0.3, 1] as const;

interface MaskedHeadlineProps {
  as?: "h1" | "h2" | "h3" | "p";
  children: React.ReactNode;
  className?: string;
  id?: string;
  immediate?: boolean;
  delay?: number;
}

/**
 * Editorial masked line-reveal headline powered by GSAP SplitText (free plugin)
 * with graceful fallback and full reduced-motion compliance.
 */
export function MaskedHeadline({
  as = "h2",
  children,
  className = "",
  id,
  immediate = false,
  delay = 0,
}: MaskedHeadlineProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion) return;

      let split: SplitText | null = null;
      let cancelled = false;

      const runReveal = () => {
        if (cancelled || !el) return;
        try {
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "editorial-split-line",
          });

          const targets = split.lines.length > 0 ? split.lines : [el];

          if (immediate) {
            gsap.fromTo(
              targets,
              { yPercent: 108, opacity: 0.001 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.78,
                stagger: 0.085,
                delay,
                ease: "power4.out",
                clearProps: "transform",
              }
            );
          } else {
            gsap.fromTo(
              targets,
              { yPercent: 108, opacity: 0.001 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.76,
                stagger: 0.08,
                delay,
                ease: "power4.out",
                clearProps: "transform",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          }
        } catch {
          gsap.fromTo(
            el,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay,
              ease: "power3.out",
              clearProps: "transform",
            }
          );
        }
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(runReveal);
      } else {
        runReveal();
      }

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [prefersReducedMotion, immediate, delay] }
  );

  const Tag = as;
  return (
    <Tag id={id} ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}

interface CurtainRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Editorial clip-path image/stage curtain reveal with subtle scale settle.
 */
export function CurtainReveal({
  children,
  className = "",
  delay = 0,
}: CurtainRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: "inset(8% 0% 0% 0%)", opacity: 0.2, scale: 1.035 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: ARCHITECTURAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ArchitecturalRuleProps {
  className?: string;
  dark?: boolean;
}

/**
 * Precision 1px architectural hairline that draws smoothly from left to right.
 */
export function ArchitecturalRule({
  className = "",
  dark = false,
}: ArchitecturalRuleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: ARCHITECTURAL_EASE }}
      className={`h-px w-full origin-left ${
        dark
          ? "bg-gradient-to-r from-white/20 via-white/10 to-transparent"
          : "bg-gradient-to-r from-zinc-900/18 via-zinc-900/10 to-transparent"
      } ${className}`}
    />
  );
}

interface RollingNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  roundTo?: number;
  className?: string;
}

/**
 * Smooth tabular-nums odometer counter for pricing and engineering readouts.
 */
export function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  roundTo = 1,
  className = "",
}: RollingNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, {
    stiffness: 170,
    damping: 26,
    mass: 0.8,
  });
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      motionVal.jump(value);
      return;
    }
    motionVal.set(value);
  }, [value, prefersReducedMotion, motionVal]);

  useMotionValueEvent(springVal, "change", (latest) => {
    if (prefersReducedMotion) return;
    const rounded = Math.round(latest / roundTo) * roundTo;
    setDisplay(rounded);
  });

  const shown = prefersReducedMotion
    ? Math.round(value / roundTo) * roundTo
    : display;

  return (
    <span className={`tabular-nums-spec ${className}`}>
      {prefix}
      {shown.toLocaleString()}
      {suffix}
    </span>
  );
}

interface SpotlightSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Obsidian architectural surface with zero-re-render CSS custom property
 * cursor-aware specular rim highlight.
 */
export function SpotlightSurface({
  children,
  className = "",
  onPointerMove,
  ...props
}: SpotlightSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = surfaceRef.current;
    if (el && e.pointerType === "mouse") {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    onPointerMove?.(e);
  };

  return (
    <div
      ref={surfaceRef}
      onPointerMove={handlePointerMove}
      className={`obsidian-spotlight ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Subtle damped magnetic micro-pull (max ~3px) for tactile primary CTAs.
 * Automatically inert on touch pointers and prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.14,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 24 });
  const springY = useSpring(y, { stiffness: 320, damping: 24 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = (e.clientX - rect.left - rect.width / 2) * strength;
        const relY = (e.clientY - rect.top - rect.height / 2) * strength;
        x.set(Math.max(-4, Math.min(4, relX)));
        y.set(Math.max(-3, Math.min(3, relY)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
