"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Layers,
  Film,
  Compass,
  Activity,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { InteractiveBlueprint } from "@/components/InteractiveBlueprint";
import { SpotlightSurface } from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

interface TelemetryChip {
  id: string;
  code: string;
  label: string;
  detail: string;
  problemId: string;
}

const HERO_SPECS: TelemetryChip[] = [
  {
    id: "laser",
    code: "01",
    label: '±0.125" Laser Plumb',
    detail:
      "Every inspection includes digital laser wall-deflection & slab-elevation readings to prove whether structural stabilization is needed.",
    problemId: "bowing-walls",
  },
  {
    id: "excavation",
    code: "02",
    label: "85% Zero Digging",
    detail:
      "Sub-floor perimeter French drains install cleanly from inside, preserving porches, driveways, and mature landscaping.",
    problemId: "active-leak",
  },
  {
    id: "backup",
    code: "03",
    label: "Marine Battery Backup",
    detail:
      "Dual cast-iron pumps automatically switch to deep-cycle marine battery power when Ohio storms knock out utility lines.",
    problemId: "crawl-space",
  },
];

export function FieldVideoStage() {
  const { openInspectionModal } = useInspectionModal();
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<"video" | "blueprint">("video");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userPaused, setUserPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeSpecId, setActiveSpecId] = useState<string>("laser");
  const [activeZoneId, setActiveZoneId] = useState<string>("active-leak");

  // Auto-pause video whenever scrolled out of view to save CPU & mobile battery
  useEffect(() => {
    const vid = videoRef.current;
    const container = stageRef.current;
    if (!vid || !container || mode !== "video") return;

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
  }, [prefersReducedMotion, mode, userPaused]);

  const activeSpec =
    HERO_SPECS.find((c) => c.id === activeSpecId) || HERO_SPECS[0];

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      setUserPaused(false);
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      setUserPaused(true);
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  };

  const handleScrub = (e: React.MouseEvent<HTMLButtonElement>) => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    vid.currentTime = ratio * vid.duration;
    setProgress(ratio * 100);
  };

  if (mode === "blueprint") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Live Hydrostatic Storm Simulator
          </span>
          <button
            type="button"
            onClick={() => setMode("video")}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Film className="h-3.5 w-3.5 text-[#E8845F]" />
            <span>Back to Field Reel</span>
          </button>
        </div>
        <InteractiveBlueprint
          activeZoneId={activeZoneId}
          onSelectZone={setActiveZoneId}
          onDiagnoseZone={(zoneId) =>
            openInspectionModal({ problemId: zoneId })
          }
        />
      </div>
    );
  }

  return (
    <SpotlightSurface className="rounded-3xl bg-[#111317] border border-white/10 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Stage Top Architectural Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 border-b border-white/10 bg-[#0D0F13]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono-spec text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
            Central Ohio Field Reel • Real Installations
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMode("blueprint")}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] hover:bg-[#C85A32] border border-white/12 px-3.5 py-1 text-[11px] font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <Layers className="h-3 w-3" />
          <span>Storm Simulator Cutaway</span>
        </button>
      </div>

      {/* Completely Unobstructed 16:10 Field Video Viewport */}
      <div
        ref={stageRef}
        className="relative aspect-16/10 w-full overflow-hidden bg-[#0B0C0E] group"
      >
        <video
          ref={videoRef}
          src={siteConfig.hero.heroVideo}
          poster={siteConfig.hero.heroImage}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          className="h-full w-full object-cover"
        />

        {/* Minimal corner vignette only — keeps sump & vapor barrier fully crisp */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 to-transparent"
          aria-hidden="true"
        />

        {/* Subtle Play/Pause Glass Control */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause field video" : "Play field video"}
          className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 hover:bg-zinc-950/95 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:scale-105 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="h-3 w-3 text-[#E8845F]" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 text-emerald-400" />
              <span>Play Reel</span>
            </>
          )}
        </button>

        {/* Subtle Location Watermark + Interactive Hairline Scrub Bar */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
          <span className="font-mono-spec text-[10px] uppercase tracking-widest text-zinc-200/90 shrink-0">
            Dublin &amp; Westerville Crew
          </span>
          <button
            type="button"
            onClick={handleScrub}
            aria-label="Seek field installation reel"
            className="flex-1 h-3 flex items-center cursor-pointer group/scrub"
          >
            <span className="relative w-full h-1 rounded-full bg-white/20 overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-[#C85A32] transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Calibrated 3-Segment Engineering Spec Dock (Outside Video Frame) */}
      <div className="bg-[#0D0F13] border-t border-white/10">
        <div
          role="tablist"
          aria-label="Engineering specification highlights"
          className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10"
        >
          {HERO_SPECS.map((spec) => {
            const isSelected = spec.id === activeSpecId;
            return (
              <button
                key={spec.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveSpecId(spec.id)}
                className={`relative px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.06] text-white"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="hero-spec-active"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    className="absolute top-0 inset-x-0 h-[2px] bg-[#C85A32]"
                    aria-hidden="true"
                  />
                )}
                <span className="flex items-center gap-1.5 text-[11px] font-semibold truncate">
                  {spec.id === "laser" ? (
                    <Compass className="h-3.5 w-3.5 text-[#E8845F] shrink-0" />
                  ) : spec.id === "excavation" ? (
                    <Activity className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span className="truncate">{spec.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Spec Readout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpec.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="px-4 py-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
          >
            <div className="space-y-0.5 min-w-0">
              <p className="font-mono-spec text-[10px] uppercase tracking-widest text-[#E8845F]">
                SPEC {activeSpec.code} // FIELD VERIFIED
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeSpec.detail}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                openInspectionModal({ problemId: activeSpec.problemId })
              }
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-[#18181B] hover:bg-[#C85A32] hover:text-white px-4 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              <span>Inspect This</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </SpotlightSurface>
  );
}
