"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Activity,
  ShieldCheck,
  Layers,
  Camera,
} from "lucide-react";
import { siteConfig } from "@/config/site";

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
    shortLabel: "Cove Joint Leak",
    title: "Wall-Floor Hydrostatic Seepage",
    solution: "Sub-Floor Perimeter French Drain + Rigid Vapor Wall",
    metrics: "1-2 Days • 0% Exterior Digging",
    priceHint: "$4,500 - $10,000",
    pos: { left: "34%", top: "73%" },
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
}

export function InteractiveBlueprint({
  activeZoneId,
  onSelectZone,
  onDiagnoseZone,
}: InteractiveBlueprintProps) {
  const [viewMode, setViewMode] = useState<"blueprint" | "photo">("blueprint");

  const activeZone =
    BLUEPRINT_ZONES.find((z) => z.id === activeZoneId) || BLUEPRINT_ZONES[0];

  return (
    <div className="rounded-3xl bg-[#121418] border border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)] overflow-hidden">
      {/* Top Diagnostic Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 border-b border-white/10 bg-[#0E1014]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono-spec text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
            Central Ohio Foundation Cutaway • Interactive
          </span>
        </div>

        {/* View Mode Toggle */}
        <div
          role="group"
          aria-label="Hero visualization mode"
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
            <span>Blueprint</span>
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

      {/* Stage Viewport */}
      {viewMode === "blueprint" ? (
        <div className="relative aspect-16/9 w-full bg-[#121418] select-none overflow-hidden">
          <svg
            viewBox="0 0 680 340"
            className="h-full w-full"
            role="img"
            aria-label="Interactive architectural cutaway of Central Ohio basement foundation, exterior clay soil pressure, French drain, and dual sump backup system"
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
                  stroke="rgba(255,255,255,0.035)"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient
                id="soil-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1D222B" />
                <stop offset="100%" stopColor="#15181E" />
              </linearGradient>
              <linearGradient
                id="water-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(56,189,248,0.12)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.55)" />
              </linearGradient>
            </defs>

            {/* Technical Grid */}
            <rect width="680" height="340" fill="url(#blueprint-grid)" />

            {/* Exterior Ground Grade & Clay Soil Mass (Left) */}
            <path
              d="M 0 112 L 170 112 L 170 284 L 0 284 Z"
              fill="url(#soil-grad)"
            />
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
              x="22"
              y="100"
              fill="#71717A"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              EXTERIOR GRADE
            </text>
            <text
              x="22"
              y="148"
              fill="#52525B"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              SATURATED OHIO
            </text>
            <text
              x="22"
              y="162"
              fill="#52525B"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              GLACIAL CLAY SOIL
            </text>

            {/* Hydrostatic Pressure Vectors */}
            <g
              stroke={
                activeZoneId === "bowing-walls" || activeZoneId === "active-leak"
                  ? "#38BDF8"
                  : "rgba(56,189,248,0.45)"
              }
              strokeWidth="1.75"
              strokeDasharray="4 3"
            >
              <line x1="92" y1="184" x2="162" y2="184" />
              <line x1="84" y1="224" x2="162" y2="224" />
              <line x1="96" y1="258" x2="162" y2="258" />
            </g>
            <g
              fill={
                activeZoneId === "bowing-walls" || activeZoneId === "active-leak"
                  ? "#38BDF8"
                  : "rgba(56,189,248,0.55)"
              }
            >
              <polygon points="165,184 157,180 157,188" />
              <polygon points="165,224 157,220 157,228" />
              <polygon points="165,258 157,254 157,262" />
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
              x="335"
              y="54"
              fill="#71717A"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              FIRST FLOOR JOIST ENVELOPE
            </text>

            {/* Poured Concrete Foundation Wall (Left) */}
            <rect
              x="170"
              y="80"
              width="32"
              height="194"
              fill="#3F3F46"
              stroke="#71717A"
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

            {/* Rigid White Vapor Wall Liner (Highlighted when cove joint or sump active) */}
            <rect
              x="202"
              y="86"
              width="5"
              height="172"
              fill={
                activeZoneId === "active-leak" || activeZoneId === "crawl-space"
                  ? "#E4E4E7"
                  : "#71717A"
              }
            />

            {/* Carbon Fiber Reinforcement Strap on Wall (Highlighted for bowing-walls) */}
            <rect
              x="197"
              y="92"
              width="6"
              height="158"
              rx="1"
              fill={activeZoneId === "bowing-walls" ? "#C85A32" : "#52525B"}
            />
            {activeZoneId === "bowing-walls" && (
              <g stroke="#C85A32" strokeWidth="1.5">
                <line x1="206" y1="115" x2="238" y2="115" />
                <text
                  x="244"
                  y="119"
                  fill="#E8845F"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  CARBON FIBER LOCK
                </text>
              </g>
            )}

            {/* Diagonal Crack Graphic (Highlighted for wall-cracks) */}
            <path
              d="M 172 156 L 184 172 L 178 186 L 198 205"
              fill="none"
              stroke={activeZoneId === "wall-cracks" ? "#E8845F" : "#71717A"}
              strokeWidth={activeZoneId === "wall-cracks" ? "3" : "1.75"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Sub-Floor French Drain Channel + Flow Path to Sump */}
            <circle
              cx="230"
              cy="283"
              r="11"
              fill="#09090B"
              stroke={activeZoneId === "active-leak" ? "#38BDF8" : "#52525B"}
              strokeWidth="2"
            />
            <line
              x1="241"
              y1="283"
              x2="496"
              y2="283"
              stroke={
                activeZoneId === "active-leak" || activeZoneId === "crawl-space"
                  ? "url(#water-grad)"
                  : "#3F3F46"
              }
              strokeWidth="4"
              strokeDasharray="6 4"
            />

            {/* Sealed Sump Basin & Dual Pump + Discharge Pipe (Right) */}
            <rect
              x="496"
              y="244"
              width="58"
              height="56"
              rx="4"
              fill="#09090B"
              stroke={activeZoneId === "crawl-space" ? "#1E6B4B" : "#71717A"}
              strokeWidth="2"
            />
            {/* Sealed Radon/Odor Lid */}
            <rect x="492" y="241" width="66" height="5" rx="2" fill="#A1A1AA" />
            {/* Primary + Backup Discharge Risers */}
            <path
              d="M 516 241 L 516 112 L 640 112"
              fill="none"
              stroke={activeZoneId === "crawl-space" ? "#34D399" : "#71717A"}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Battery Backup Unit */}
            <rect
              x="558"
              y="214"
              width="26"
              height="38"
              rx="3"
              fill="#18181B"
              stroke={activeZoneId === "crawl-space" ? "#34D399" : "#52525B"}
              strokeWidth="1.5"
            />
            <circle
              cx="571"
              cy="226"
              r="3"
              fill={activeZoneId === "crawl-space" ? "#34D399" : "#52525B"}
            />

            {/* Subtle Interior Labels */}
            <text
              x="315"
              y="246"
              fill="#71717A"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              POURED CONCRETE SLAB
            </text>
            <text
              x="472"
              y="102"
              fill="#71717A"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              FREEZE-PROOF DISCHARGE
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
                    ? "bg-[#C85A32] text-white shadow-[0_0_0_6px_rgba(200,90,50,0.28)] scale-105 z-20"
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
        <div className="relative aspect-16/9 w-full overflow-hidden bg-[#121418]">
          <img
            src={siteConfig.hero.heroImage}
            alt="Clean newly waterproofed Central Ohio poured concrete basement interior with perimeter drainage and sealed sump system"
            className="h-full w-full object-cover object-center"
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
      <div className="bg-[#0E1014] border-t border-white/10 px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-[#18181B] hover:bg-[#C85A32] hover:text-white px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer shrink-0"
        >
          <span>Diagnose This Issue</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
