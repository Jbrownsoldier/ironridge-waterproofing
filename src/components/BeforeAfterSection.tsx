"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Check, Star, MoveHorizontal, Play, Film } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/FadeIn";
import { TactileCard } from "@/components/motion/TactileCard";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  location: string;
}

function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  location,
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(4, Math.min(96, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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
      className="relative w-full aspect-16/10 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#18181B] touch-pan-y focus-visible:outline-2 focus-visible:outline-[#C85A32]"
    >
      <img
        src={afterImage}
        alt={`${location} after permanent repair`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${location} before repair`}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E6B4B]/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
          <Check className="h-3 w-3 stroke-[2.5]" />
          {afterLabel}
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

      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="inline-flex items-center rounded-full bg-zinc-950/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-zinc-200">
          Drag to compare Before &amp; After
        </span>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeChapter, setActiveChapter] = useState<string>(
    siteConfig.beforeAfterSection.cases[0].id
  );
  const [activeReviewAuthor, setActiveReviewAuthor] = useState<string | null>(
    null
  );

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (!prefersReducedMotion) {
      vid.play().catch(() => {});
    }
  }, [prefersReducedMotion]);

  const handleJumpChapter = (caseId: string, startSec: number) => {
    setActiveChapter(caseId);
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = startSec;
      vid.play().catch(() => {});
    }
  };

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="py-16 sm:py-24 bg-[#F3F2EE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 3-Chapter Transformation Video Reel */}
        <FadeIn className="rounded-3xl bg-[#121418] text-white overflow-hidden shadow-[0_24px_56px_-14px_rgba(24,24,27,0.22)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 relative bg-black">
              <video
                ref={videoRef}
                src={siteConfig.beforeAfterSection.transformationVideo}
                poster={siteConfig.beforeAfterSection.cases[0].afterImage}
                controls
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-16/10 object-cover"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-[#E8845F]">
                  <Film className="h-3.5 w-3.5" />
                  <span>3-CHAPTER FIELD WALKTHROUGH</span>
                </span>
                <h2
                  id="before-after-heading"
                  className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight"
                >
                  Watch the Full Before-to-After Repairs
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Select a Central Ohio neighborhood below to jump straight to
                  that project transformation.
                </p>
              </div>

              <div className="space-y-2">
                {siteConfig.beforeAfterSection.cases.map((project, idx) => {
                  const active = activeChapter === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() =>
                        handleJumpChapter(project.id, project.videoStartSec)
                      }
                      aria-pressed={active}
                      className={`w-full text-left rounded-2xl px-4 py-3 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        active
                          ? "bg-[#C85A32] text-white shadow-md scale-[1.01]"
                          : "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.11] hover:text-white"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="font-mono-spec text-[10px] opacity-80">
                          CHAPTER 0{idx + 1}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold truncate">
                          {project.location}
                        </p>
                      </div>
                      <Play className="h-3.5 w-3.5 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Project Case Study Tabs + Interactive Slider Dossier */}
        <FadeIn delay={0.06}>
          <div className="mb-8 space-y-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B]">
              Interactive Before &amp; After Project Dossiers
            </h3>
            <p className="text-sm sm:text-base text-zinc-600">
              {siteConfig.beforeAfterSection.subheadline}
            </p>
          </div>

          <Tabs
            defaultValue={siteConfig.beforeAfterSection.cases[0].id}
            className="w-full"
          >
            <div className="flex justify-start mb-6">
              <TabsList className="flex flex-wrap sm:flex-nowrap h-auto w-full sm:w-auto gap-1">
                {siteConfig.beforeAfterSection.cases.map((project) => (
                  <TabsTrigger
                    key={project.id}
                    value={project.id}
                    className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 px-4"
                  >
                    {project.tabLabel}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {siteConfig.beforeAfterSection.cases.map((project, index) => (
              <TabsContent key={project.id} value={project.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center rounded-3xl surface-card p-5 sm:p-8 lg:p-10">
                  <div className="lg:col-span-7">
                    <ComparisonSlider
                      beforeImage={project.beforeImage}
                      afterImage={project.afterImage}
                      beforeLabel={project.beforeLabel}
                      afterLabel={project.afterLabel}
                      location={project.location}
                    />
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                      <div>
                        <span className="font-mono-spec text-xs text-zinc-400">
                          CASE STUDY 0{index + 1}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-[#18181B] mt-0.5">
                          {project.location}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 text-sm">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          Initial Condition
                        </p>
                        <p className="text-[#18181B] font-medium mt-1 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-zinc-100">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#1E6B4B]">
                          Engineered Scope
                        </p>
                        <p className="text-[#18181B] font-medium mt-1 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
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

                    <blockquote className="pt-4 border-t border-zinc-200/80 space-y-3">
                      <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed">
                        &ldquo;{project.testimonial.quote}&rdquo;
                      </p>
                      <footer className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-[#18181B]">
                          {project.testimonial.author}
                        </span>
                        <span className="font-medium text-[#1E6B4B]">
                          Verified Google Review ★★★★★
                        </span>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>

        {/* Tactile Verified Google Reviews Strip */}
        <div id="reviews" className="pt-4 scroll-mt-24">
          <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1E6B4B] mb-1.5">
                VERIFIED HOMEOWNER FEEDBACK
              </p>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B]">
                What Central Ohio Homeowners Say After Heavy Storms
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#18181B]">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <span>
                4.9 / 5.0 ({siteConfig.company.reviewCount} Google Reviews)
              </span>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.beforeAfterSection.additionalReviews.map((review) => {
              const isOpen = activeReviewAuthor === review.author;
              return (
                <StaggerItem key={review.author}>
                  <TactileCard
                    isActive={isOpen}
                    onToggle={() =>
                      setActiveReviewAuthor(isOpen ? null : review.author)
                    }
                    className="h-full p-7 flex flex-col justify-between space-y-5"
                    expandedContent={
                      <div className="mt-4 pt-3 border-t border-zinc-200/80 text-xs text-zinc-600">
                        <span className="font-semibold text-[#1E6B4B]">
                          Verified Job Scope:
                        </span>{" "}
                        {review.verifiedScope}
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      <span className="inline-block text-xs font-semibold text-[#1E6B4B]">
                        {review.highlightTag}
                      </span>
                      <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-[#18181B]">
                          {review.author} • {review.suburb}
                        </p>
                        <p className="text-zinc-400 mt-0.5">{review.date}</p>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-amber-500 text-amber-500"
                          />
                        ))}
                      </div>
                    </div>
                  </TactileCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
