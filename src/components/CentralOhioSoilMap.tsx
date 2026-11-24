"use client";

import React, { useState } from "react";
import { MapPin, ArrowUpRight, CheckCircle2, Layers, Clock } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useInspectionModal } from "@/context/InspectionModalContext";

interface MapPinCoord {
  city: string;
  zip: string;
  x: number;
  y: number;
  clayDepth: string;
}

const CENTRAL_OHIO_PINS: MapPinCoord[] = [
  { city: "Powell", zip: "43065", x: 245, y: 58, clayDepth: "9–14 ft Expansive Clay" },
  { city: "Dublin", zip: "43017", x: 146, y: 120, clayDepth: "8–12 ft Scioto Clay" },
  { city: "Westerville", zip: "43081", x: 355, y: 98, clayDepth: "10–15 ft Clay-Loam Basin" },
  { city: "New Albany", zip: "43054", x: 458, y: 138, clayDepth: "11–16 ft Poorly Drained Clay" },
  { city: "Upper Arlington", zip: "43220", x: 196, y: 182, clayDepth: "6–10 ft Limestone & Clay" },
  { city: "Columbus", zip: "43228", x: 274, y: 214, clayDepth: "8–13 ft Glacial Till" },
];

export function CentralOhioSoilMap() {
  const { openInspectionModal } = useInspectionModal();
  const prefersReducedMotion = useReducedMotion();
  const [selectedCity, setSelectedCity] = useState<string>("Dublin");

  const activeProfile =
    siteConfig.suburbProfiles.find((s) => s.city === selectedCity) ||
    siteConfig.suburbProfiles[0];
  const activeCoord =
    CENTRAL_OHIO_PINS.find((p) => p.city === selectedCity) ||
    CENTRAL_OHIO_PINS[0];

  return (
    <div className="rounded-3xl bg-white border border-zinc-900/10 shadow-[0_18px_46px_-18px_rgba(24,24,27,0.09)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left 7 Cols: Interactive Greater Columbus I-270 Soil & Dispatch SVG Map */}
        <div className="lg:col-span-7 relative bg-[#111317] text-white p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-zinc-200">
                Central Ohio Glacial Clay &amp; Crew Coverage
              </span>
            </div>
            <span className="font-mono-spec text-[10px] uppercase tracking-widest text-zinc-400">
              39.96° N, 82.99° W • I-270 BASIN
            </span>
          </div>

          <div className="relative my-3 aspect-16/9 w-full select-none">
            <svg
              viewBox="0 0 560 300"
              className="h-full w-full"
              role="img"
              aria-label="Interactive Central Ohio soil geology and service coverage map around Columbus and I-270"
            >
              <defs>
                <pattern
                  id="soil-map-grid"
                  width="28"
                  height="28"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 28 0 L 0 0 0 28"
                    fill="none"
                    stroke="rgba(255,255,255,0.035)"
                    strokeWidth="1"
                  />
                </pattern>
                <radialGradient id="clay-basin-glow" cx="50%" cy="52%" r="48%">
                  <stop offset="0%" stopColor="rgba(200,90,50,0.18)" />
                  <stop offset="65%" stopColor="rgba(30,107,75,0.08)" />
                  <stop offset="100%" stopColor="rgba(17,19,23,0)" />
                </radialGradient>
              </defs>

              <rect width="560" height="300" fill="url(#soil-map-grid)" />
              <rect width="560" height="300" fill="url(#clay-basin-glow)" />

              {/* Subtle Topographic Glacial Basin Contours */}
              <ellipse
                cx="275"
                cy="172"
                rx="220"
                ry="124"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 6"
              />
              <ellipse
                cx="275"
                cy="172"
                rx="156"
                ry="88"
                fill="none"
                stroke="rgba(255,255,255,0.07)"
              />

              {/* Scioto & Olentangy River Basins */}
              <path
                d="M 132 10 C 148 80, 174 132, 208 192 C 234 236, 244 268, 250 296"
                fill="none"
                stroke="rgba(56,189,248,0.28)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 244 8 C 248 64, 254 128, 260 198"
                fill="none"
                stroke="rgba(56,189,248,0.22)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* I-270 Outerbelt Ring & Primary Corridors (I-71 / I-70) */}
              <ellipse
                cx="274"
                cy="182"
                rx="148"
                ry="86"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="2"
              />
              <line
                x1="316"
                y1="14"
                x2="246"
                y2="294"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
              />
              <line
                x1="28"
                y1="210"
                x2="532"
                y2="196"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
              />

              {/* Highway & River Reference Labels */}
              <text
                x="428"
                y="186"
                fill="#71717A"
                fontSize="9"
                fontFamily="var(--font-jetbrains), monospace"
              >
                I-270 LOOP
              </text>
              <text
                x="114"
                y="72"
                fill="rgba(56,189,248,0.65)"
                fontSize="8.5"
                fontFamily="var(--font-jetbrains), monospace"
              >
                SCIOTO RIVER
              </text>
              <text
                x="255"
                y="34"
                fill="rgba(56,189,248,0.55)"
                fontSize="8.5"
                fontFamily="var(--font-jetbrains), monospace"
              >
                OLENTANGY
              </text>

              {/* Active Dispatch Radar Vector from West Columbus HQ */}
              {activeCoord.city !== "Columbus" && (
                <line
                  x1="274"
                  y1="214"
                  x2={activeCoord.x}
                  y2={activeCoord.y}
                  stroke="#C85A32"
                  strokeWidth="1.75"
                  strokeDasharray="4 4"
                  className="animate-water-flow"
                />
              )}

              {/* Interactive Suburb Pins */}
              {CENTRAL_OHIO_PINS.map((pin) => {
                const isSelected = pin.city === selectedCity;
                return (
                  <g
                    key={pin.city}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    onClick={() => setSelectedCity(pin.city)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCity(pin.city);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect Ironridge coverage and clay soil profile for ${pin.city}`}
                    aria-pressed={isSelected}
                    className="cursor-pointer focus:outline-none group"
                  >
                    {isSelected && !prefersReducedMotion && (
                      <circle
                        r="18"
                        fill="rgba(200,90,50,0.22)"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      r={isSelected ? "11" : "8"}
                      fill={isSelected ? "rgba(200,90,50,0.28)" : "rgba(255,255,255,0.08)"}
                      stroke={isSelected ? "#E8845F" : "rgba(255,255,255,0.28)"}
                      strokeWidth="1.25"
                    />
                    <circle
                      r={isSelected ? "4.5" : "3.5"}
                      fill={isSelected ? "#C85A32" : "#E4E4E7"}
                    />
                    <text
                      x="0"
                      y={isSelected ? -16 : -13}
                      textAnchor="middle"
                      fill={isSelected ? "#FFFFFF" : "#A1A1AA"}
                      fontSize={isSelected ? "11" : "10"}
                      fontWeight={isSelected ? "700" : "500"}
                      fontFamily="var(--font-jakarta), sans-serif"
                    >
                      {pin.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick-Tap Suburb Strip (Great for mobile & keyboard users) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
            {siteConfig.suburbProfiles.map((suburb) => {
              const active = suburb.city === selectedCity;
              return (
                <button
                  key={suburb.city}
                  type="button"
                  onClick={() => setSelectedCity(suburb.city)}
                  aria-pressed={active}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#C85A32] text-white shadow-xs"
                      : "bg-white/[0.07] text-zinc-300 hover:bg-white/[0.14] hover:text-white"
                  }`}
                >
                  {suburb.city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Selected Neighborhood Engineering Dossier */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF9F6]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile.city}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="flex items-start justify-between gap-3 border-b border-zinc-900/10 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-[#C85A32]">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      LOCAL SOIL DOSSIER • ZIP {activeCoord.zip}
                    </span>
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B] mt-1">
                    {activeProfile.city}, Ohio
                  </h3>
                </div>
                <span className="inline-flex flex-col items-end shrink-0">
                  <span className="font-heading text-xl font-bold text-[#18181B] tabular-nums-spec">
                    {activeProfile.projectsCompleted}
                  </span>
                  <span className="font-mono-spec text-[10px] uppercase tracking-wider text-zinc-500">
                    Homes Repaired
                  </span>
                </span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="rounded-2xl bg-[#F3F2EE] p-4 space-y-1">
                  <p className="flex items-center gap-1.5 font-mono-spec text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    <Layers className="h-3.5 w-3.5 text-[#C85A32]" />
                    <span>Subsoil Classification</span>
                  </p>
                  <p className="font-heading text-base font-bold text-[#18181B]">
                    {activeProfile.soil}
                  </p>
                  <p className="text-xs text-zinc-600">{activeCoord.clayDepth}</p>
                </div>

                <div className="space-y-1 px-1">
                  <p className="font-mono-spec text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Most Common Failure Pattern
                  </p>
                  <p className="text-sm font-medium text-[#18181B] leading-relaxed">
                    {activeProfile.commonIssue}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#1E6B4B]/10 border border-[#1E6B4B]/15 px-4 py-3 text-xs">
                  <span className="inline-flex items-center gap-2 font-semibold text-[#18181B]">
                    <Clock className="h-4 w-4 text-[#1E6B4B]" />
                    <span>Next Local Crew Window</span>
                  </span>
                  <span className="font-mono-spec font-bold text-[#1E6B4B]">
                    {activeProfile.nextSlot}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-6 mt-6 border-t border-zinc-900/10 space-y-2.5">
            <button
              type="button"
              onClick={() => openInspectionModal()}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#18181B] hover:bg-[#C85A32] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Reserve {activeProfile.city} Inspection Window</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#1E6B4B]" />
              <span>Dispatched from West Columbus HQ • Zero travel fees</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
