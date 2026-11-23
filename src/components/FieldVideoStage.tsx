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
import { useInspectionModal } from "@/context/InspectionModalContext";

interface TelemetryChip {
  id: string;
  label: string;
  detail: string;
  problemId: string;
}

const HERO_CHIPS: TelemetryChip[] = [
  {
    id: "laser",
    label: '±0.125" Laser Plumb Check',
    detail:
      "Every inspection includes digital laser wall-deflection & slab-elevation readings to prove whether structural stabilization is needed.",
    problemId: "bowing-walls",
  },
  {
    id: "excavation",
    label: "85% Zero Exterior Digging",
    detail:
      "Sub-floor perimeter French drains install cleanly from inside, preserving porches, driveways, and mature landscaping.",
    problemId: "active-leak",
  },
  {
    id: "backup",
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

  const [mode, setMode] = useState<"video" | "blueprint">("video");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChipId, setActiveChipId] = useState<string>("laser");
  const [activeZoneId, setActiveZoneId] = useState<string>("active-leak");

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || mode !== "video") return;
    if (prefersReducedMotion) {
      vid.pause();
      setIsPlaying(false);
    } else {
      vid.play().catch(() => {});
    }
  }, [prefersReducedMotion, mode]);

  const activeChip =
    HERO_CHIPS.find((c) => c.id === activeChipId) || HERO_CHIPS[0];

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  if (mode === "blueprint") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Interactive Engineering Cutaway
          </span>
          <button
            type="button"
            onClick={() => setMode("video")}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Film className="h-3.5 w-3.5 text-[#E8845F]" />
            <span>Switch to Field Reel</span>
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
    <div className="rounded-3xl bg-[#121418] border border-white/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.75)] overflow-hidden">
      {/* Stage Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 border-b border-white/10 bg-[#0E1014]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono-spec text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
            Central Ohio Field Reel • Real Installations
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMode("blueprint")}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] hover:bg-[#C85A32] border border-white/10 px-3 py-1 text-[11px] font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <Layers className="h-3 w-3" />
          <span>Interactive Cutaway</span>
        </button>
      </div>

      {/* Video Viewport */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#0B0C0E] group">
        <video
          ref={videoRef}
          src={siteConfig.hero.heroVideo}
          poster={siteConfig.hero.heroImage}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="h-full w-full object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/15 to-transparent"
          aria-hidden="true"
        />

        {/* Top-Right Play/Pause Glass Control */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause field video" : "Play field video"}
          className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 hover:bg-zinc-950/90 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:scale-105 cursor-pointer"
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

        {/* Bottom Interactive Telemetry Chips (Click to pop detail inline) */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center gap-2">
          {HERO_CHIPS.map((chip) => {
            const isSelected = chip.id === activeChipId;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveChipId(chip.id)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur-md transition-all cursor-pointer hover:-translate-y-0.5 ${
                  isSelected
                    ? "bg-white text-[#18181B] shadow-md scale-[1.03]"
                    : "bg-zinc-950/75 text-zinc-200 border border-white/15 hover:bg-zinc-900"
                }`}
              >
                {chip.id === "laser" ? (
                  <Compass
                    className={`h-3.5 w-3.5 ${
                      isSelected ? "text-[#C85A32]" : "text-[#E8845F]"
                    }`}
                  />
                ) : chip.id === "excavation" ? (
                  <Activity
                    className={`h-3.5 w-3.5 ${
                      isSelected ? "text-[#1E6B4B]" : "text-emerald-400"
                    }`}
                  />
                ) : (
                  <ShieldCheck
                    className={`h-3.5 w-3.5 ${
                      isSelected ? "text-[#1E6B4B]" : "text-emerald-400"
                    }`}
                  />
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Pop-Out Engineering Spec Footer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChip.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0E1014] border-t border-white/10 px-4 py-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="space-y-0.5 min-w-0">
            <p className="font-heading text-xs sm:text-sm font-bold text-white">
              {activeChip.label}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {activeChip.detail}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              openInspectionModal({ problemId: activeChip.problemId })
            }
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-[#18181B] hover:bg-[#C85A32] hover:text-white px-4 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            <span>Inspect This</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
