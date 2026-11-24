"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import {
  InteractiveBlueprint,
  BLUEPRINT_ZONES,
  type SimulationState,
} from "@/components/InteractiveBlueprint";
import {
  MaskedHeadline,
  ArchitecturalRule,
} from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const DIAGNOSTIC_CHAPTERS: Array<{
  zoneId: string;
  simState: SimulationState;
  stepLabel: string;
  summary: string;
}> = [
  {
    zoneId: "active-leak",
    simState: "storm",
    stepLabel: "01 // SATURATED CLAY & HYDROSTATIC PRESSURE",
    summary:
      "During a 3-inch Central Ohio rainstorm, expansive clay holds water around the foundation like a bowl, forcing groundwater under the slab and through the cove joint.",
  },
  {
    zoneId: "wall-cracks",
    simState: "storm",
    stepLabel: "02 // FULL-DEPTH CONCRETE WALL FRACTURES",
    summary:
      "Seasonal freeze-thaw cycles widen shrinkage fissures into active water channels. Surface sealants peel off; high-pressure polyurethane seals all 8 inches of concrete.",
  },
  {
    zoneId: "bowing-walls",
    simState: "protected",
    stepLabel: "03 // ±0.125\" LASER PLUMB & CARBON FIBER LOCK",
    summary:
      "We verify lateral movement with a digital plumb laser. Aerospace carbon fiber straps bond flush to the concrete wall, halting deflection permanently with zero yard excavation.",
  },
  {
    zoneId: "crawl-space",
    simState: "protected",
    stepLabel: "04 // SUB-FLOOR RELIEF & STORM BATTERY BACKUP",
    summary:
      "Our perimeter sub-floor drain relieves water pressure before it hits your floor, routing it into an airtight cast-iron pump backed by a deep-cycle marine battery.",
  },
];

export function DiagnosticsCutawaySection() {
  const { openInspectionModal } = useInspectionModal();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<string>("active-leak");
  const [simState, setSimState] = useState<SimulationState>("storm");

  // Scroll-linked desktop scrollytelling: smoothly step through zones 01 -> 04
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        DIAGNOSTIC_CHAPTERS.forEach((chapter, idx) => {
          ScrollTrigger.create({
            trigger: `[data-diag-chapter="${idx}"]`,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setActiveZoneId(chapter.zoneId);
              setSimState(chapter.simState);
            },
            onEnterBack: () => {
              setActiveZoneId(chapter.zoneId);
              setSimState(chapter.simState);
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Interactive Structural Foundation Cutaway"
      className="py-16 sm:py-24 bg-[#0D0F13] surface-grain text-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="font-mono-spec text-xs font-semibold uppercase tracking-widest text-[#E8845F]">
              SCROLL-DRIVEN ENGINEERING WALKTHROUGH
            </p>
            <MaskedHeadline
              as="h2"
              className="font-heading text-display-section font-bold text-white"
            >
              See How Central Ohio Clay Breaks Foundations — And How We Stop It.
            </MaskedHeadline>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
            Scroll through the 4 engineering zones below or toggle the Storm
            Simulator directly to compare unprotected hydrostatic load against
            an Ironridge installation.
          </p>
        </div>

        <ArchitecturalRule dark />

        {/* Sticky Left Cutaway + Scroll-Stepped Engineering Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 lg:sticky lg:top-28">
            <InteractiveBlueprint
              activeZoneId={activeZoneId}
              onSelectZone={setActiveZoneId}
              simulationState={simState}
              onSimulationStateChange={setSimState}
              onDiagnoseZone={(zoneId) =>
                openInspectionModal({ problemId: zoneId })
              }
            />
          </div>

          <div className="lg:col-span-4 space-y-4">
            {DIAGNOSTIC_CHAPTERS.map((chapter, idx) => {
              const zone = BLUEPRINT_ZONES.find(
                (z) => z.id === chapter.zoneId
              );
              const isActive = activeZoneId === chapter.zoneId;
              return (
                <button
                  key={chapter.zoneId}
                  type="button"
                  data-diag-chapter={idx}
                  onClick={() => {
                    setActiveZoneId(chapter.zoneId);
                    setSimState(chapter.simState);
                  }}
                  aria-pressed={isActive}
                  className={`w-full text-left rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white/[0.08] border-[#C85A32]/70 shadow-[0_14px_40px_-14px_rgba(200,90,50,0.35)]"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] opacity-75 hover:opacity-100"
                  }`}
                >
                  <p className="font-mono-spec text-[10px] font-semibold uppercase tracking-widest text-[#E8845F]">
                    {chapter.stepLabel}
                  </p>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white mt-1.5">
                    {zone?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed mt-2">
                    {chapter.summary}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between font-mono-spec text-[11px]">
                    <span className="text-emerald-400">{zone?.priceHint}</span>
                    <span className="text-zinc-400">{zone?.metrics}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
