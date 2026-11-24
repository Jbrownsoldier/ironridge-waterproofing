"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Check,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/FadeIn";
import {
  MaskedHeadline,
  ArchitecturalRule,
  SpotlightSurface,
} from "@/components/motion/EditorialMotion";
import { TactileCard } from "@/components/motion/TactileCard";
import {
  ComparisonSlider,
  type ComparisonAnnotation,
} from "@/components/ComparisonSlider";

const CASE_ANNOTATIONS: Record<string, ComparisonAnnotation[]> = {
  westerville: [
    { side: "before", label: "Active Diagonal Shear Crack", xPercent: 28, yPercent: 52 },
    { side: "after", label: "Carbon Fiber Lock + Vapor Wall", xPercent: 72, yPercent: 48 },
  ],
  dublin: [
    { side: "before", label: "Cove Joint Groundwater Seepage", xPercent: 26, yPercent: 68 },
    { side: "after", label: "Sub-Floor French Drain + Battery Sump", xPercent: 72, yPercent: 62 },
  ],
  "upper-arlington": [
    { side: "before", label: "78% Humidity Exposed Dirt Floor", xPercent: 28, yPercent: 60 },
    { side: "after", label: "20-Mil Antimicrobial Encapsulation", xPercent: 72, yPercent: 56 },
  ],
};

export function BeforeAfterSection() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoStageRef = useRef<HTMLDivElement | null>(null);
  const cases = siteConfig.beforeAfterSection.cases;

  const [activeChapter, setActiveChapter] = useState<string>(cases[0].id);
  const [activeTab, setActiveTab] = useState<string>(cases[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userPaused, setUserPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(15.5);
  const [activeReviewAuthor, setActiveReviewAuthor] = useState<string | null>(
    null
  );

  // Auto-pause video when scrolled out of view to save mobile & CPU cycles
  useEffect(() => {
    const vid = videoRef.current;
    const container = videoStageRef.current;
    if (!vid || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          vid.pause();
        } else if (!prefersReducedMotion && !userPaused) {
          vid.play().catch(() => {});
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion, userPaused]);

  // Real-time chapter sync as playback crosses 0s -> 5.2s -> 10.2s
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const t = vid.currentTime;
    setCurrentTime(t);
    if (vid.duration && !Number.isNaN(vid.duration)) {
      setDuration(vid.duration);
    }

    let matchedId = cases[0].id;
    for (let i = cases.length - 1; i >= 0; i--) {
      if (t >= cases[i].videoStartSec - 0.15) {
        matchedId = cases[i].id;
        break;
      }
    }
    if (matchedId !== activeChapter) {
      setActiveChapter(matchedId);
    }
  };

  const handleJumpChapter = (caseId: string, startSec: number) => {
    setActiveChapter(caseId);
    setActiveTab(caseId);
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = startSec;
      vid.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      setUserPaused(false);
      vid.play().catch(() => {});
    } else {
      setUserPaused(true);
      vid.pause();
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const getChapterFillPercent = (index: number) => {
    const start = cases[index].videoStartSec;
    const end =
      index < cases.length - 1 ? cases[index + 1].videoStartSec : duration;
    if (currentTime <= start) return 0;
    if (currentTime >= end) return 100;
    return Math.min(100, Math.max(0, ((currentTime - start) / (end - start)) * 100));
  };

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="py-16 sm:py-24 bg-[#F3F2EE] surface-grain"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Custom Branded 3-Chapter Transformation Video Player */}
        <SpotlightSurface className="rounded-3xl bg-[#111317] text-white border border-white/10 overflow-hidden shadow-[0_28px_70px_-18px_rgba(24,24,27,0.3)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 relative bg-black flex flex-col justify-between">
              <div
                ref={videoStageRef}
                className="relative w-full aspect-16/10 bg-black overflow-hidden"
              >
                <video
                  ref={videoRef}
                  src={siteConfig.beforeAfterSection.transformationVideo}
                  poster={cases[0].afterImage}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="none"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={(e) => {
                    const d = e.currentTarget.duration;
                    if (d && !Number.isNaN(d)) setDuration(d);
                  }}
                  onClick={togglePlay}
                  className="h-full w-full object-cover cursor-pointer"
                />

                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent"
                  aria-hidden="true"
                />

                {/* Custom Architectural Transport Bar */}
                <div className="absolute bottom-3.5 left-4 right-4 flex flex-col gap-2.5">
                  {/* 3 Segmented Chapter Scrub Tracks */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {cases.map((project, idx) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() =>
                          handleJumpChapter(project.id, project.videoStartSec)
                        }
                        aria-label={`Jump to chapter ${idx + 1}: ${project.location}`}
                        className="h-2 flex items-center cursor-pointer group"
                      >
                        <span className="relative w-full h-1 rounded-full bg-white/25 overflow-hidden">
                          <span
                            className="absolute inset-y-0 left-0 bg-[#C85A32] transition-[width] duration-150"
                            style={{ width: `${getChapterFillPercent(idx)}%` }}
                          />
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold text-white transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-3 w-3 text-[#E8845F]" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 text-emerald-400" />
                            <span>Play</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/15 p-1.5 text-white transition-colors cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="h-3.5 w-3.5 text-zinc-300" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </button>
                    </div>

                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-zinc-200 tabular-nums-spec">
                      00:{String(Math.floor(currentTime)).padStart(2, "0")} / 00:
                      {String(Math.round(duration)).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-[#E8845F]">
                  <Film className="h-3.5 w-3.5" />
                  <span>SYNCED 3-CHAPTER FIELD WALKTHROUGH</span>
                </span>
                <h2
                  id="before-after-heading"
                  className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight"
                >
                  Watch the Full Before-to-After Repairs
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Chapters auto-track live playback. Click any Central Ohio
                  project to scrub the video and sync the slider dossier below.
                </p>
              </div>

              <div className="space-y-2">
                {cases.map((project, idx) => {
                  const active = activeChapter === project.id;
                  const fill = getChapterFillPercent(idx);
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() =>
                        handleJumpChapter(project.id, project.videoStartSec)
                      }
                      aria-pressed={active}
                      className={`relative overflow-hidden w-full text-left rounded-2xl px-4 py-3 flex items-center justify-between gap-3 transition-all cursor-pointer border ${
                        active
                          ? "bg-[#C85A32] border-[#E8845F]/40 text-white shadow-md"
                          : "bg-white/[0.05] border-white/8 text-zinc-300 hover:bg-white/[0.1] hover:text-white"
                      }`}
                    >
                      {active && (
                        <span
                          className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-white/80 transition-[width] duration-150"
                          style={{ width: `${fill}%` }}
                          aria-hidden="true"
                        />
                      )}
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
        </SpotlightSurface>

        {/* Project Case Study Tabs + Unified Interactive Slider Dossiers */}
        <FadeIn delay={0.06}>
          <div className="mb-8 space-y-2">
            <MaskedHeadline
              as="h3"
              className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B]"
            >
              Interactive Before &amp; After Project Dossiers
            </MaskedHeadline>
            <p className="text-sm sm:text-base text-zinc-600">
              {siteConfig.beforeAfterSection.subheadline}
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-start mb-6">
              <TabsList className="flex flex-wrap sm:flex-nowrap h-auto w-full sm:w-auto gap-1">
                {cases.map((project) => (
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

            {cases.map((project, index) => (
              <TabsContent key={project.id} value={project.id}>
                <div
                  style={
                    index === 0
                      ? { viewTransitionName: "case-study-hero-card" }
                      : undefined
                  }
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center rounded-3xl surface-card p-5 sm:p-8 lg:p-10"
                >
                  <div className="lg:col-span-7">
                    <ComparisonSlider
                      beforeImage={project.beforeImage}
                      afterImage={project.afterImage}
                      beforeLabel={project.beforeLabel}
                      afterLabel={project.afterLabel}
                      location={project.location}
                      priority={index === 0}
                      annotations={CASE_ANNOTATIONS[project.id] || []}
                    />
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-900/10 pb-4">
                      <div>
                        <span className="font-mono-spec text-xs text-zinc-400">
                          CASE STUDY 0{index + 1} // VERIFIED RECORD
                        </span>
                        <h3 className="font-heading text-xl font-bold text-[#18181B] mt-0.5">
                          {project.location}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 text-sm">
                      <div>
                        <p className="font-mono-spec text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                          Initial Condition
                        </p>
                        <p className="text-[#18181B] font-medium mt-1 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-zinc-900/8">
                        <p className="font-mono-spec text-[11px] font-semibold uppercase tracking-wider text-[#1E6B4B]">
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
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F2EE] border border-zinc-900/6 px-3 py-1 text-xs font-semibold text-zinc-700"
                        >
                          <Check className="h-3.5 w-3.5 text-[#1E6B4B]" />
                          {spec}
                        </span>
                      ))}
                    </div>

                    <blockquote className="pt-4 border-t border-zinc-900/10 space-y-3">
                      <p className="font-serif-editorial text-lg text-zinc-800 leading-snug">
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

        <ArchitecturalRule />

        {/* Tactile Verified Google Reviews Strip */}
        <div id="reviews" className="pt-2 scroll-mt-24">
          <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono-spec text-xs font-semibold uppercase tracking-[0.14em] text-[#1E6B4B] mb-1.5">
                VERIFIED HOMEOWNER FEEDBACK
              </p>
              <MaskedHeadline
                as="h3"
                className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B]"
              >
                What Central Ohio Homeowners Say After Heavy Storms
              </MaskedHeadline>
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
                      <span className="inline-block font-mono-spec text-[11px] font-semibold uppercase tracking-wide text-[#1E6B4B]">
                        {review.highlightTag}
                      </span>
                      <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-900/8 flex items-center justify-between text-xs">
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
