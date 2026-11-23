"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Check, MoveHorizontal, ArrowUpRight, Film } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/FadeIn";

export function FeaturedCaseSpotlight() {
  const project = siteConfig.beforeAfterSection.cases[0];
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(4, Math.min(96, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  return (
    <section
      aria-labelledby="featured-project-heading"
      className="py-20 sm:py-24 bg-[#F3F2EE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
              <span>FEATURED CENTRAL OHIO PROJECT</span>
            </div>
            <h2
              id="featured-project-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#18181B] tracking-tight leading-[1.12]"
            >
              Documented Repairs. Bone-Dry Basements.
            </h2>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full bg-[#18181B] hover:bg-[#C85A32] text-white px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 self-start lg:self-end shrink-0"
          >
            <Film className="h-4 w-4 text-[#E8845F]" />
            <span>View All 3 Case Studies &amp; Video</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <FadeIn
          delay={0.05}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center rounded-3xl surface-card p-5 sm:p-8 lg:p-10"
        >
          {/* Left 7 Cols: Drag Before/After Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              role="slider"
              tabIndex={0}
              aria-label={`Before and after comparison slider for ${project.location}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPos)}
              onPointerDown={(e) => {
                setIsDragging(true);
                e.currentTarget.setPointerCapture(e.pointerId);
                updatePosition(e.clientX);
              }}
              onPointerMove={(e) => isDragging && updatePosition(e.clientX)}
              onPointerUp={(e) => {
                if (!isDragging) return;
                setIsDragging(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
              }}
              onPointerCancel={() => setIsDragging(false)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  setSliderPos((p) => Math.max(5, p - 5));
                } else if (e.key === "ArrowRight") {
                  e.preventDefault();
                  setSliderPos((p) => Math.min(95, p + 5));
                }
              }}
              className="relative w-full aspect-16/10 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#18181B] touch-pan-y focus-visible:outline-2 focus-visible:outline-[#C85A32]"
            >
              <img
                src={project.afterImage}
                alt={`${project.location} after permanent repair`}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              />
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={project.beforeImage}
                  alt={`${project.location} before repair`}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
                  {project.beforeLabel}
                </span>
              </div>
              <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E6B4B]/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                  {project.afterLabel}
                </span>
              </div>

              <div
                className="absolute top-0 bottom-0 z-20 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.45)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white text-[#18181B] shadow-xl flex items-center justify-center">
                  <MoveHorizontal className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Project Dossier Summary */}
          <div className="lg:col-span-5 space-y-5">
            <div className="border-b border-zinc-200/80 pb-4">
              <span className="font-mono-spec text-xs text-zinc-400">
                CASE STUDY 01
              </span>
              <h3 className="font-heading text-xl font-bold text-[#18181B] mt-0.5">
                {project.location}
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Initial Condition
                </p>
                <p className="text-[#18181B] font-medium mt-1">
                  {project.problem}
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1E6B4B]">
                  Engineered Scope
                </p>
                <p className="text-[#18181B] font-medium mt-1">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F2EE] px-3 py-1 text-xs font-semibold text-zinc-700"
                >
                  <Check className="h-3.5 w-3.5 text-[#1E6B4B]" />
                  {spec}
                </span>
              ))}
            </div>

            <blockquote className="pt-4 border-t border-zinc-200/80 space-y-2">
              <p className="text-sm text-zinc-700 leading-relaxed">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <footer className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#18181B]">
                  {project.testimonial.author}
                </span>
                <span className="font-medium text-[#1E6B4B]">
                  {project.testimonial.badge}
                </span>
              </footer>
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
