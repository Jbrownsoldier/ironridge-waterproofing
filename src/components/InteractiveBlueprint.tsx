"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Compass,
  Activity,
  ShieldCheck,
  Layers,
  Camera,
  CloudRain,
  Sun,
} from "lucide-react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { SpotlightSurface } from "@/components/motion/EditorialMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(DrawSVGPlugin, useGSAP);
}

export type SimulationState = "baseline" | "storm" | "protected";

export interface BlueprintZone {
  id: string;
  code: string;
  shortLabel: string;
  title: string;
  solution: string;
  metrics: string;
  priceHint: string;
  pos: { left: string; top: string };
}

export const BLUEPRINT_ZONES: BlueprintZone[] = [
  {
    id: "active-leak",
    code: "ZONE 01 // HYDROSTATIC COVE JOINT",
    shortLabel: "Cove Joint",
    title: "Wall-Floor Hydrostatic Seepage",
    solution: "Sub-Floor Perimeter French Drain + Rigid Vapor Wall",
    metrics: "1-2 Days • 0% Exterior Digging",
    priceHint: "$4,500 - $10,000",
    pos: { left: "34%", top: "74%" },
  },
  {
    id: "wall-cracks",
    code: "ZONE 02 // POURED WALL FRACTURE",
    shortLabel: "Wall Crack",
    title: "Full-Depth Structural Wall Crack",
    solution: "High-Pressure Polyurethane / Structural Epoxy Injection",
    metrics: "3-4 Hours • 8\" Full-Depth Seal",
    priceHint: "$750 - $1,500",
    pos: { left: "26.5%", top: "53%" },
  },
  {
    id: "bowing-walls",
    code: "ZONE 03 // LATERAL CLAY LOAD",
    shortLabel: "Bowing Wall",
    title: "Expansive Clay Wall Deflection",
    solution: "Aerospace Carbon Fiber Straps / Galvanized Wall Anchors",
    metrics: "±0.125\" Laser Plumb Check",
    priceHint: "$5,000 - $15,000+",
    pos: { left: "26.5%", top: "32%" },
  },
  {
    id: "crawl-space",
    code: "ZONE 04 // SUMP & VAPOR ENVELOPE",
    shortLabel: "Sump & Vapor",
    title: "Dual Battery Sump & Moisture Barrier",
    solution: "Cast-Iron Pump + Marine Backup + 20-Mil Encapsulation",
    metrics: "Storm Power-Outage Protected",
    priceHint: "$1,800 - $3,500",
    pos: { left: "77%", top: "69%" },
  },
];

interface InteractiveBlueprintProps {
  activeZoneId: string;
  onSelectZone: (zoneId: string) => void;
  onDiagnoseZone: (zoneId: string) => void;
  simulationState?: SimulationState;
  onSimulationStateChange?: (state: SimulationState) => void;
}

export function InteractiveBlueprint({
  activeZoneId,
  onSelectZone,
  onDiagnoseZone,
  simulationState,
  onSimulationStateChange,
}: InteractiveBlueprintProps) {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<"blueprint" | "photo">("blueprint");
  const [internalSim, setInternalSim] = useState<SimulationState>("protected");
  const svgRef = useRef<SVGSVGElement | null>(null);

  const simState = simulationState ?? internalSim;
  const setSimState = (next: SimulationState) => {
    setInternalSim(next);
    onSimulationStateChange?.(next);
  };

  const activeZone =
    BLUEPRINT_ZONES.find((z) => z.id === activeZoneId) || BLUEPRINT_ZONES[0];

  // Animate Ironridge engineering retrofit drawing in via GSAP DrawSVGPlugin
  useGSAP(
    () => {
      if (prefersReducedMotion || viewMode !== "blueprint") return;
      if (simState === "protected") {
        gsap.fromTo(
          ".ironridge-draw-fix",
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: svgRef, dependencies: [simState, viewMode, prefersReducedMotion] }
  );

  const isStorm = simState === "storm";
  const isProtected = simState === "protected";

  const interiorHumidity = isStorm ? "84% RH" : isProtected ? "44% RH" : "58% RH";
  const wallDeflection = isStorm
    ? '+0.42" BOW'
    : isProtected
    ? '0.00" LOCKED'
    : '±0.08" PLUMB';

  return (
    <SpotlightSurface className="rounded-3xl bg-[#111317] border border-white/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Top Diagnostic Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 border-b border-white/10 bg-[#0D0F13]">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isStorm
                ? "bg-sky-400 animate-ping"
                : isProtected
                ? "bg-emerald-400 animate-pulse"
                : "bg-zinc-400"
            }`}
          />
          <span className="font-mono-spec text-[11px] font-semibold tracking-wider text-zinc-200 uppercase">
            Hydrostatic Storm &amp; Structural Simulator
          </span>
        </div>

        {/* View Mode Toggle */}
        <div
          role="group"
          aria-label="Blueprint visualization mode"
          className="inline-flex items-center rounded-full bg-white/[0.06] p-1 border border-white/10"
        >
          <button
            type="button"
            onClick={() => setViewMode("blueprint")}
            aria-pressed={viewMode === "blueprint"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              viewMode === "blueprint"
                ? "bg-[#C85A32] text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Simulator</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("photo")}
            aria-pressed={viewMode === "photo"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              viewMode === "photo"
                ? "bg-[#C85A32] text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Camera className="h-3 w-3" />
            <span>Field Photo</span>
          </button>
        </div>
      </div>

      {/* 3-State Physical Environment Controller (Simulator mode only) */}
      {viewMode === "blueprint" && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-5 bg-[#0A0C10] border-b border-white/10">
          <div
            role="radiogroup"
            aria-label="Central Ohio storm simulation state"
            className="inline-flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              role="radio"
              aria-checked={simState === "baseline"}
              onClick={() => setSimState("baseline")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                simState === "baseline"
                  ? "bg-zinc-200 text-[#18181B]"
                  : "bg-white/[0.06] text-zinc-400 hover:text-white"
              }`}
            >
              <Sun className="h-3 w-3" />
              <span>Dry Baseline</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={simState === "storm"}
              onClick={() => setSimState("storm")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                simState === "storm"
                  ? "bg-sky-500 text-zinc-950 shadow-[0_0_18px_rgba(56,189,248,0.4)]"
                  : "bg-white/[0.06] text-zinc-400 hover:text-sky-300"
              }`}
            >
              <CloudRain className="h-3 w-3" />
              <span>3&quot; Ohio Storm (Unprotected)</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={simState === "protected"}
              onClick={() => setSimState("protected")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                simState === "protected"
                  ? "bg-[#1E6B4B] text-white shadow-[0_0_18px_rgba(30,107,75,0.45)]"
                  : "bg-white/[0.06] text-zinc-400 hover:text-emerald-300"
              }`}
            >
              <ShieldCheck className="h-3 w-3" />
              <span>Ironridge Protected</span>
            </button>
          </div>

          {/* Live Sensor Readout Pills */}
          <div className="hidden sm:flex items-center gap-3 font-mono-spec text-[10px] uppercase tracking-wider">
            <span className="text-zinc-400">
              HUMIDITY:{" "}
              <strong
                className={
                  isStorm
                    ? "text-sky-400"
                    : isProtected
                    ? "text-emerald-400"
                    : "text-zinc-200"
                }
              >
                {interiorHumidity}
              </strong>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">
              LASER:{" "}
              <strong
                className={
                  isStorm
                    ? "text-[#E8845F]"
                    : isProtected
                    ? "text-emerald-400"
                    : "text-zinc-200"
                }
              >
                {wallDeflection}
              </strong>
            </span>
          </div>
        </div>
      )}

      {/* Stage Viewport */}
      {viewMode === "blueprint" ? (
        <div className="relative aspect-16/9 w-full bg-[#111317] select-none overflow-hidden">
          <svg
            ref={svgRef}
            viewBox="0 0 680 340"
            className="h-full w-full"
            role="img"
            aria-label="Interactive architectural cutaway simulating Central Ohio hydrostatic clay pressure, laser wall deflection scanning, interior French drain, and dual battery sump system"
          >
            <defs>
              <pattern
                id="blueprint-grid"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.032)"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient id="soil-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={isStorm ? "#182838" : "#1D222B"}
                />
                <stop
                  offset="100%"
                  stopColor={isStorm ? "#0F1D2C" : "#15181E"}
                />
              </linearGradient>
              <linearGradient
                id="water-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(56,189,248,0.2)" />
                <stop offset="100%" stopColor="rgba(52,211,153,0.85)" />
              </linearGradient>
              <linearGradient
                id="storm-puddle"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(56,189,248,0.68)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.08)" />
              </linearGradient>
            </defs>

            {/* Technical Grid */}
            <rect width="680" height="340" fill="url(#blueprint-grid)" />

            {/* Animated Storm Rain Above Exterior Grade (Storm & Protected states) */}
            {(isStorm || isProtected) && (
              <g
                stroke="rgba(56,189,248,0.45)"
                strokeWidth="1.25"
                strokeDasharray="6 6"
                className="animate-storm-rain"
              >
                <line x1="28" y1="18" x2="16" y2="108" />
                <line x1="62" y1="10" x2="50" y2="108" />
                <line x1="98" y1="22" x2="86" y2="108" />
                <line x1="134" y1="14" x2="122" y2="108" />
                <line x1="162" y1="26" x2="150" y2="108" />
              </g>
            )}

            {/* Exterior Ground Grade & Clay Soil Mass (Left) */}
            <path
              d="M 0 112 L 170 112 L 170 284 L 0 284 Z"
              fill="url(#soil-grad)"
            />

            {/* Saturated Water Table Fill Inside Clay Soil */}
            {(isStorm || isProtected) && (
              <rect
                x="0"
                y={isStorm ? "148" : "212"}
                width="170"
                height={isStorm ? "136" : "72"}
                fill="rgba(56,189,248,0.12)"
                className="transition-all duration-700"
              />
            )}

            {/* Exterior Grass / Grade Line */}
            <line
              x1="0"
              y1="112"
              x2="170"
              y2="112"
              stroke="#1E6B4B"
              strokeWidth="3"
            />
            <text
              x="18"
              y="98"
              fill="#71717A"
              fontSize="9.5"
              fontFamily="var(--font-jetbrains), monospace"
            >
              EXTERIOR GRADE
            </text>
            <text
              x="18"
              y="142"
              fill={isStorm ? "#7DD3FC" : "#52525B"}
              fontSize="9.5"
              fontFamily="var(--font-jetbrains), monospace"
            >
              {isStorm ? "SATURATED CLAY (HIGH PSI)" : "OHIO GLACIAL CLAY"}
            </text>

            {/* Animated Hydrostatic Pressure Vectors Pushing Against Wall */}
            <g
              stroke={
                isStorm
                  ? "#38BDF8"
                  : activeZoneId === "bowing-walls" ||
                    activeZoneId === "active-leak"
                  ? "rgba(56,189,248,0.75)"
                  : "rgba(56,189,248,0.38)"
              }
              strokeWidth={isStorm ? "2.25" : "1.6"}
              strokeDasharray="6 4"
              className={
                isStorm
                  ? "animate-water-flow-fast"
                  : isProtected
                  ? "animate-water-flow"
                  : ""
              }
            >
              <line x1="72" y1="176" x2="162" y2="176" />
              <line x1="60" y1="216" x2="162" y2="216" />
              <line x1="76" y1="256" x2="162" y2="256" />
            </g>
            <g
              fill={
                isStorm
                  ? "#38BDF8"
                  : "rgba(56,189,248,0.65)"
              }
            >
              <polygon points="166,176 157,171.5 157,180.5" />
              <polygon points="166,216 157,211.5 157,220.5" />
              <polygon points="166,256 157,251.5 157,260.5" />
            </g>

            {/* Upper Floor Joist & Living Space Line */}
            <rect
              x="170"
              y="64"
              width="454"
              height="16"
              fill="#27272A"
              stroke="#3F3F46"
              strokeWidth="1"
            />
            <text
              x="328"
              y="54"
              fill="#71717A"
              fontSize="9.5"
              fontFamily="var(--font-jetbrains), monospace"
            >
              FIRST FLOOR JOIST ENVELOPE
            </text>

            {/* Poured Concrete Foundation Wall (Left) — Subtle Inward Flex Highlight During Unprotected Storm */}
            <path
              d={
                isStorm
                  ? "M 170 80 L 202 80 Q 209 178 202 274 L 170 274 Q 177 178 170 80 Z"
                  : "M 170 80 L 202 80 L 202 274 L 170 274 Z"
              }
              fill="#3F3F46"
              stroke={isStorm ? "#E8845F" : "#71717A"}
              strokeWidth="1.5"
            />

            {/* Concrete Footing (Left) */}
            <rect
              x="154"
              y="274"
              width="64"
              height="24"
              rx="2"
              fill="#52525B"
              stroke="#A1A1AA"
              strokeWidth="1.5"
            />

            {/* Right Foundation Wall & Footing */}
            <rect
              x="592"
              y="80"
              width="32"
              height="194"
              fill="#3F3F46"
              stroke="#71717A"
              strokeWidth="1.5"
            />
            <rect
              x="576"
              y="274"
              width="64"
              height="24"
              rx="2"
              fill="#52525B"
              stroke="#A1A1AA"
              strokeWidth="1.5"
            />

            {/* Basement Concrete Floor Slab */}
            <rect
              x="218"
              y="258"
              width="374"
              height="18"
              fill="#27272A"
              stroke="#52525B"
              strokeWidth="1"
            />
            {/* Washed Gravel Sub-Base */}
            <rect
              x="218"
              y="276"
              width="358"
              height="22"
              fill="#18181B"
              stroke="#27272A"
              strokeWidth="1"
            />

            {/* UNPROTECTED STORM STATE: Standing Water Puddle Seeping Through Cove Joint */}
            {isStorm && (
              <g>
                <rect
                  x="202"
                  y="249"
                  width="248"
                  height="9"
                  rx="3"
                  fill="url(#storm-puddle)"
                />
                <text
                  x="266"
                  y="238"
                  fill="#7DD3FC"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="var(--font-jetbrains), monospace"
                >
                  ACTIVE COVE JOINT SEEPAGE
                </text>
              </g>
            )}

            {/* IRONRIDGE PROTECTED RETROFIT ELEMENTS (Drawn with GSAP DrawSVGPlugin) */}
            {isProtected && (
              <g>
                {/* Rigid White Vapor Wall Liner */}
                <path
                  d="M 205 86 L 205 262"
                  fill="none"
                  stroke="#F4F4F5"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  className="ironridge-draw-fix"
                />

                {/* Carbon Fiber Reinforcement Strap on Wall */}
                <path
                  d="M 199 90 L 199 252"
                  fill="none"
                  stroke={
                    activeZoneId === "bowing-walls" ? "#C85A32" : "#E8845F"
                  }
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="ironridge-draw-fix"
                />

                {/* Sub-Floor French Drain Channel + Animated Drainage Flow to Sump */}
                <circle
                  cx="230"
                  cy="284"
                  r="11"
                  fill="#09090B"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
                <path
                  d="M 241 284 L 496 284"
                  fill="none"
                  stroke="url(#water-grad)"
                  strokeWidth="4.5"
                  strokeDasharray="8 5"
                  className="ironridge-draw-fix animate-water-flow"
                />

                {/* Freeze-Proof Discharge Riser */}
                <path
                  d="M 516 241 L 516 112 L 642 112"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeDasharray="10 5"
                  className="ironridge-draw-fix animate-sump-flow"
                />
              </g>
            )}

            {/* Unprotected/Baseline Subtle Wall & Sump Elements */}
            {!isProtected && (
              <g>
                <circle
                  cx="230"
                  cy="284"
                  r="10"
                  fill="#09090B"
                  stroke="#3F3F46"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <path
                  d="M 516 241 L 516 112 L 642 112"
                  fill="none"
                  stroke="#52525B"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </g>
            )}

            {/* Diagonal Crack Graphic */}
            <path
              d="M 172 156 L 184 172 L 178 186 L 198 205"
              fill="none"
              stroke={
                isProtected
                  ? "#34D399"
                  : activeZoneId === "wall-cracks" || isStorm
                  ? "#E8845F"
                  : "#71717A"
              }
              strokeWidth={
                activeZoneId === "wall-cracks" || isStorm ? "3" : "2"
              }
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated ±0.125" Digital Laser Plumb Beam Sweep (Active on Bowing Wall Zone) */}
            {activeZoneId === "bowing-walls" && (
              <g>
                <line
                  x1="214"
                  y1="88"
                  x2="214"
                  y2="254"
                  stroke="rgba(232,132,95,0.45)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <g className="animate-laser-sweep">
                  <line
                    x1="204"
                    y1="96"
                    x2="252"
                    y2="96"
                    stroke="#FF5A36"
                    strokeWidth="2"
                  />
                  <circle cx="214" cy="96" r="3" fill="#FF5A36" />
                  <text
                    x="258"
                    y="100"
                    fill="#E8845F"
                    fontSize="9.5"
                    fontWeight="700"
                    fontFamily="var(--font-jetbrains), monospace"
                  >
                    LASER PLUMB: {wallDeflection}
                  </text>
                </g>
              </g>
            )}

            {/* Sealed Sump Basin & Dual Pump + Battery Backup Unit (Right) */}
            <rect
              x="496"
              y="244"
              width="58"
              height="56"
              rx="4"
              fill="#09090B"
              stroke={isProtected ? "#34D399" : "#71717A"}
              strokeWidth="2"
            />
            <rect x="492" y="241" width="66" height="5" rx="2" fill="#A1A1AA" />
            <rect
              x="558"
              y="214"
              width="28"
              height="40"
              rx="3"
              fill="#18181B"
              stroke={isProtected ? "#34D399" : "#52525B"}
              strokeWidth="1.5"
            />
            <circle
              cx="572"
              cy="226"
              r="3.5"
              fill={isProtected ? "#34D399" : isStorm ? "#EF4444" : "#52525B"}
            />

            {/* Subtle Interior Spec Labels */}
            <text
              x="315"
              y={isStorm ? "222" : "246"}
              fill={isProtected ? "#A1A1AA" : "#71717A"}
              fontSize="9.5"
              fontFamily="var(--font-jetbrains), monospace"
            >
              {isProtected
                ? "BONE-DRY POURED SLAB (44% RH)"
                : "POURED CONCRETE SLAB"}
            </text>
            <text
              x="468"
              y="102"
              fill={isProtected ? "#34D399" : "#71717A"}
              fontSize="9.5"
              fontFamily="var(--font-jetbrains), monospace"
            >
              {isProtected
                ? "ACTIVE STORM DISCHARGE"
                : "FREEZE-PROOF DISCHARGE"}
            </text>
          </svg>

          {/* Accessible Interactive Hotspot Pins */}
          {BLUEPRINT_ZONES.map((zone, idx) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => onSelectZone(zone.id)}
                aria-pressed={isActive}
                style={{ left: zone.pos.left, top: zone.pos.top }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1 text-[11px] font-semibold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-white ${
                  isActive
                    ? "bg-[#C85A32] text-white shadow-[0_0_0_6px_rgba(200,90,50,0.3)] scale-105 z-20"
                    : "bg-[#18181B]/90 text-zinc-200 border border-white/20 hover:border-[#C85A32] hover:bg-[#18181B] z-10"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full font-mono-spec text-[10px] font-bold ${
                    isActive
                      ? "bg-white text-[#C85A32]"
                      : "bg-white/10 text-zinc-200 group-hover:bg-[#C85A32] group-hover:text-white"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span className="hidden sm:inline whitespace-nowrap">
                  {zone.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="relative aspect-16/9 w-full overflow-hidden bg-[#111317]">
          <Image
            src={siteConfig.hero.heroImage}
            alt="Clean newly waterproofed Central Ohio poured concrete basement interior with perimeter drainage and sealed sump system"
            fill
            quality={82}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/15 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-[#18181B] shadow-sm">
                <Compass className="h-3.5 w-3.5 text-[#C85A32]" />
                <span className="font-mono-spec text-[11px]">
                  ±0.125&quot; Laser Deflection Check
                </span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-[#18181B] shadow-sm">
                <Activity className="h-3.5 w-3.5 text-[#1E6B4B]" />
                <span className="font-mono-spec text-[11px]">
                  85% Zero Exterior Excavation
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Dublin, OH Field Installation
            </span>
          </div>
        </div>
      )}

      {/* Live Engineering Telemetry Readout Bar */}
      <div className="bg-[#0D0F13] border-t border-white/10 px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-spec text-[11px] font-semibold text-[#E8845F]">
              {activeZone.code}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono-spec text-[11px] text-emerald-400">
              {activeZone.priceHint}
            </span>
          </div>
          <p className="font-heading text-sm sm:text-base font-bold text-white truncate">
            {activeZone.title}
          </p>
          <p className="text-xs text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1E6B4B] shrink-0" />
            <span className="truncate">
              {activeZone.solution} ({activeZone.metrics})
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => onDiagnoseZone(activeZone.id)}
          className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-[#18181B] hover:bg-[#C85A32] hover:text-white px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <span>Diagnose This Issue</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </SpotlightSurface>
  );
}
