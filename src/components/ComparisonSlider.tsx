"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Check, MoveHorizontal } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export interface ComparisonAnnotation {
  side: "before" | "after";
  label: string;
  xPercent: number;
  yPercent: number;
}

export interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  location: string;
  priority?: boolean;
  annotations?: ComparisonAnnotation[];
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  location,
  priority = false,
  annotations = [],
}: ComparisonSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasPeekedRef = useRef(false);

  // Subtle one-time "peek nudge" when scrolled into view so homeowners intuit drag interactivity
  useEffect(() => {
    if (prefersReducedMotion || hasInteracted || hasPeekedRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasPeekedRef.current) return;
        hasPeekedRef.current = true;
        observer.disconnect();

        const startTime = performance.now();
        const duration = 1150;
        const animatePeek = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / duration);
          // Smooth damped sine nudge: 50 -> 39 -> 55 -> 50
          const offset = Math.sin(t * Math.PI * 2) * (1 - t) * 14;
          setSliderPos(50 - offset);
          if (t < 1) {
            rafId = requestAnimationFrame(animatePeek);
          } else {
            setSliderPos(50);
          }
        };
        rafId = requestAnimationFrame(animatePeek);
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, hasInteracted]);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(4, Math.min(96, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setHasInteracted(true);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setHasInteracted(true);
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((p) => Math.max(5, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((p) => Math.min(95, p + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Before and after comparison slider for ${location}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="group relative w-full aspect-16/10 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#121418] touch-pan-y focus-visible:outline-2 focus-visible:outline-[#C85A32]"
    >
      {/* After Layer (Base) */}
      <Image
        src={afterImage}
        alt={`${location} after permanent repair`}
        fill
        priority={priority}
        quality={82}
        sizes="(max-width: 1024px) 100vw, 58vw"
        draggable={false}
        className="object-cover pointer-events-none"
      />

      {/* Before Layer (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${location} before repair`}
          fill
          priority={priority}
          quality={82}
          sizes="(max-width: 1024px) 100vw, 58vw"
          draggable={false}
          className="object-cover"
        />
      </div>

      {/* Subtle Structural Callout Annotations that cross-fade with the wipe */}
      {annotations.map((ann) => {
        const visible =
          ann.side === "before"
            ? sliderPos > ann.xPercent + 4
            : sliderPos < ann.xPercent - 4;
        return (
          <div
            key={`${ann.side}-${ann.label}`}
            style={{ left: `${ann.xPercent}%`, top: `${ann.yPercent}%` }}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono-spec font-semibold tracking-wide backdrop-blur-md border transition-all duration-300 ${
              visible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            } ${
              ann.side === "before"
                ? "bg-zinc-950/80 text-zinc-100 border-[#C85A32]/50"
                : "bg-[#12261E]/85 text-emerald-100 border-emerald-400/40"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                ann.side === "before" ? "bg-[#E8845F]" : "bg-emerald-400"
              }`}
            />
            <span>{ann.label}</span>
          </div>
        );
      })}

      {/* Corner Badges (Collision-free on narrow mobile screens) */}
      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 max-w-[45%] pointer-events-none">
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-zinc-950/88 md:bg-zinc-950/80 md:backdrop-blur-md border border-white/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32] shrink-0" />
          <span className="truncate">{beforeLabel}</span>
        </span>
      </div>

      <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 max-w-[45%] pointer-events-none">
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#1E6B4B]/95 md:bg-[#1E6B4B]/90 md:backdrop-blur-md border border-emerald-300/20 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-white">
          <Check className="h-3 w-3 stroke-[2.5] shrink-0" />
          <span className="truncate">{afterLabel}</span>
        </span>
      </div>

      {/* Divider Hairline + Calibrated Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-px bg-white/95 shadow-[0_0_16px_rgba(0,0,0,0.6)] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white text-[#18181B] shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-4 transition-transform duration-150 flex items-center justify-center ${
            isDragging
              ? "scale-110 ring-[#C85A32]/45"
              : "ring-white/25 group-hover:scale-105"
          }`}
        >
          <MoveHorizontal className="h-4 w-4 text-[#18181B]" />
        </div>
      </div>

      {/* Bottom Interactive Prompt */}
      <div
        className={`absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300 ${
          hasInteracted ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/10 px-3.5 py-1 text-[11px] font-medium text-zinc-100">
          <MoveHorizontal className="h-3 w-3 text-[#E8845F]" />
          <span>Drag to compare Before &amp; After</span>
        </span>
      </div>
    </div>
  );
}
