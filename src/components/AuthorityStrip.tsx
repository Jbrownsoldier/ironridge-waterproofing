"use client";

import React, { useState } from "react";
import { MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { useInspectionModal } from "@/context/InspectionModalContext";

const metrics = [
  {
    id: "years",
    value: "19 Yrs",
    label: "Locally Owned in Columbus",
    detail: "Independent, zero franchise royalties",
    note: "Founded in West Columbus in 2007. Every dollar goes to W-2 engineers and materials, never corporate royalty fees.",
  },
  {
    id: "homes",
    value: "3,400+",
    label: "Central Ohio Foundations",
    detail: "Proven across expansive clay soils",
    note: "Calibrated specifically for Scioto and Olentangy glacial clay-loam freeze-thaw cycles.",
  },
  {
    id: "reviews",
    value: "4.9 ★",
    label: "214 Verified Google Reviews",
    detail: "BBB A+ Accredited since 2007",
    note: "Zero unresolved BBB complaints across 19 years of Central Ohio structural and waterproofing work.",
  },
  {
    id: "warranty",
    value: "100%",
    label: "Lifetime Transferable Warranty",
    detail: "Transfers free to future home buyers",
    note: "Serial-numbered certificate transfers at $0 fee during real estate closing with zero re-inspection hoops.",
  },
  {
    id: "insured",
    value: "$2M",
    label: "Bonded & Liability Insured",
    detail: "Ohio Reg. #OH-FDN-84921",
    note: "Full commercial liability and Ohio workers compensation coverage on every in-house installation crew.",
  },
];

export function AuthorityStrip() {
  const { openInspectionModal } = useInspectionModal();
  const [activeMetricId, setActiveMetricId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(
    siteConfig.suburbProfiles[0].city
  );

  const activeSuburb =
    siteConfig.suburbProfiles.find((s) => s.city === selectedCity) ||
    siteConfig.suburbProfiles[0];

  return (
    <section
      aria-label="Credentials and Central Ohio Soil Coverage"
      className="bg-[#F3F2EE] border-y border-zinc-200/70 py-8 sm:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Tactile Click-to-Pop-Inline Credentials Strip */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((item) => {
            const isActive = activeMetricId === item.id;
            return (
              <StaggerItem key={item.id}>
                <motion.button
                  type="button"
                  onClick={() =>
                    setActiveMetricId(isActive ? null : item.id)
                  }
                  aria-expanded={isActive}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  animate={{
                    y: isActive ? -4 : 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  className={`w-full h-full text-left rounded-2xl p-4 transition-shadow cursor-pointer ${
                    isActive
                      ? "bg-white ring-1 ring-[#C85A32]/40 shadow-[0_18px_36px_-10px_rgba(24,24,27,0.12)]"
                      : "bg-white/60 hover:bg-white shadow-2xs"
                  }`}
                >
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight tabular-nums-spec">
                    {item.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#18181B] mt-1">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {item.detail}
                  </p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden text-[11px] text-zinc-600 leading-relaxed pt-2.5 mt-2.5 border-t border-zinc-200/70"
                      >
                        {item.note}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Central Ohio Suburb Soil & Dispatch Selector */}
        <div className="rounded-2xl bg-white/80 border border-zinc-200/70 px-4 py-3.5 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mr-1">
              <MapPin className="h-3.5 w-3.5 text-[#C85A32]" />
              <span>Local Crew Coverage:</span>
            </span>
            {siteConfig.suburbProfiles.map((suburb) => {
              const active = suburb.city === selectedCity;
              return (
                <button
                  key={suburb.city}
                  type="button"
                  onClick={() => setSelectedCity(suburb.city)}
                  aria-pressed={active}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#18181B] text-white shadow-xs scale-[1.03]"
                      : "bg-[#F3F2EE] text-zinc-700 hover:bg-[#E7E4DC]"
                  }`}
                >
                  {suburb.city}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSuburb.city}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap items-center justify-between lg:justify-end gap-3 text-xs"
            >
              <span className="inline-flex items-center gap-1.5 text-zinc-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1E6B4B] shrink-0" />
                <span>
                  <strong className="text-[#18181B]">{activeSuburb.soil}:</strong>{" "}
                  {activeSuburb.projectsCompleted} repairs • Next slot{" "}
                  <strong className="text-[#1E6B4B]">
                    {activeSuburb.nextSlot}
                  </strong>
                </span>
              </span>
              <button
                type="button"
                onClick={() => openInspectionModal()}
                className="inline-flex items-center gap-1 font-semibold text-[#C85A32] hover:underline cursor-pointer shrink-0"
              >
                <span>Reserve Window</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
