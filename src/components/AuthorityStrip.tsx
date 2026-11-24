"use client";

import React, { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CentralOhioSoilMap } from "@/components/CentralOhioSoilMap";
import { ArchitecturalRule } from "@/components/motion/EditorialMotion";

const metrics = [
  {
    id: "years",
    value: "19 Yrs",
    label: "Locally Owned in Columbus",
    detail: "Independent since 2007",
    note: "Founded in West Columbus in 2007. Every dollar goes to W-2 structural craftspeople and engineering materials, never corporate franchise royalties.",
  },
  {
    id: "homes",
    value: "3,400+",
    label: "Central Ohio Foundations",
    detail: "Proven on glacial clay",
    note: "Calibrated specifically for Scioto and Olentangy glacial clay-loam freeze-thaw expansion cycles.",
  },
  {
    id: "reviews",
    value: "4.9 ★",
    label: "214 Verified Reviews",
    detail: "BBB A+ Accredited",
    note: "Zero unresolved Better Business Bureau complaints across 19 years of Central Ohio structural and waterproofing work.",
  },
  {
    id: "warranty",
    value: "100%",
    label: "Transferable Warranty",
    detail: "$0 fee at closing",
    note: "Serial-numbered lifetime dry-basement certificate transfers at $0 fee to future home buyers during real estate closing.",
  },
  {
    id: "insured",
    value: "$2M",
    label: "Bonded & Insured",
    detail: "Reg. #OH-FDN-84921",
    note: "Full commercial general liability and Ohio workers compensation coverage on every in-house structural crew.",
  },
];

export function AuthorityStrip() {
  const [activeMetricId, setActiveMetricId] = useState<string | null>(null);
  const activeMetric = metrics.find((m) => m.id === activeMetricId) || null;

  return (
    <section
      aria-label="Credentials and Central Ohio Soil Coverage"
      className="bg-[#F3F2EE] surface-grain border-y border-zinc-900/10 py-10 sm:py-14"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Editorial Typographic Architectural Ledger (Replaces 5 Identical Cards) */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-zinc-900/12 border-y border-zinc-900/12">
            {metrics.map((item) => {
              const isActive = activeMetricId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveMetricId(isActive ? null : item.id)
                  }
                  aria-expanded={isActive}
                  className={`group relative text-left px-4 py-5 sm:px-5 sm:py-6 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C85A32] ${
                    isActive
                      ? "bg-white/90"
                      : "hover:bg-white/55"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute top-0 inset-x-0 h-[2px] bg-[#C85A32]"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-heading text-2xl sm:text-[32px] font-bold text-[#18181B] tracking-tight tabular-nums-spec leading-none">
                      {item.value}
                    </p>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 mt-1 ${
                        isActive
                          ? "rotate-180 text-[#C85A32]"
                          : "group-hover:text-[#18181B]"
                      }`}
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#18181B] mt-2">
                    {item.label}
                  </p>
                  <p className="font-mono-spec text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {activeMetric && (
              <motion.div
                key={activeMetric.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl bg-white border border-zinc-900/10 px-5 py-4 flex items-start gap-3 text-sm text-zinc-700">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#1E6B4B] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-[#18181B]">
                      {activeMetric.label}:
                    </strong>{" "}
                    {activeMetric.note}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ArchitecturalRule />

        {/* Interactive Greater Columbus Soil Geology & Crew Dispatch Map */}
        <CentralOhioSoilMap />
      </div>
    </section>
  );
}
