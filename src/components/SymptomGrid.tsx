"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Droplets,
  Split,
  MoveHorizontal,
  Wind,
  ArrowUpRight,
  Wrench,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/FadeIn";
import {
  MaskedHeadline,
  ArchitecturalRule,
} from "@/components/motion/EditorialMotion";
import { TactileCard } from "@/components/motion/TactileCard";
import { useInspectionModal } from "@/context/InspectionModalContext";

const iconMap = {
  Droplets,
  Split,
  MoveHorizontal,
  Wind,
};

interface SymptomGridProps {
  previewMode?: boolean;
}

export function SymptomGrid({ previewMode = false }: SymptomGridProps) {
  const { openInspectionModal } = useInspectionModal();
  const [activeCardId, setActiveCardId] = useState<string | null>(
    previewMode ? null : siteConfig.symptomsSection.cards[0].id
  );

  // Asymmetric 12-column architectural bento spans (7/5 then 5/7)
  const colSpans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
  ];

  return (
    <section
      id="problems"
      aria-labelledby="symptoms-heading"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-mono-spec text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
              <span>{siteConfig.symptomsSection.eyebrow}</span>
            </div>
            <MaskedHeadline
              as="h2"
              id="symptoms-heading"
              className="font-heading text-display-section font-bold text-[#18181B]"
            >
              {siteConfig.symptomsSection.headline}
            </MaskedHeadline>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              {siteConfig.symptomsSection.subheadline}
            </p>
          </div>

          {previewMode && (
            <Link
              href="/diagnostics"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#F3F2EE] hover:bg-[#18181B] border border-zinc-900/10 text-[#18181B] hover:text-white px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 self-start lg:self-end shrink-0"
            >
              <span>Full Storm Simulator &amp; Cutaway</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <ArchitecturalRule className="mb-10 sm:mb-12" />

        {/* Asymmetric Editorial Bento Grid (7/5 then 5/7) */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          {siteConfig.symptomsSection.cards.map((card, idx) => {
            const Icon = iconMap[card.iconName];
            const isActive = activeCardId === card.id;
            const isWideCard = idx === 0 || idx === 3;

            return (
              <StaggerItem key={card.id} className={colSpans[idx]}>
                <TactileCard
                  isActive={isActive}
                  onToggle={() =>
                    setActiveCardId(isActive ? null : card.id)
                  }
                  className="group overflow-hidden h-full p-7 sm:p-8 flex flex-col justify-between"
                  expandedContent={
                    <div className="mt-5 pt-5 border-t border-zinc-200/80 space-y-4">
                      <div className="rounded-2xl bg-[#F7F6F2] border border-zinc-900/6 p-4 space-y-2 text-xs sm:text-sm text-zinc-600">
                        <p className="font-semibold text-[#18181B]">
                          Engineering Root Cause &amp; Scope
                        </p>
                        <p className="leading-relaxed">
                          {card.whatIsHappening} {card.typicalFixDetail}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2 font-mono-spec text-[11px] font-semibold text-[#18181B]">
                          <span>Typical Range: {card.typicalRange}</span>
                          <span className="text-[#1E6B4B]">
                            Install Time: {card.installTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            openInspectionModal({
                              problemId: card.qualifierOptionId,
                            })
                          }
                          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C85A32] hover:bg-[#B04A25] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
                        >
                          <span>Book Free Inspection</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                        <Link
                          href="/cost-estimator"
                          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#F3F2EE] hover:bg-[#EAE8E1] text-[#18181B] px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
                        >
                          <span>Estimate Cost</span>
                        </Link>
                      </div>
                    </div>
                  }
                >
                  {/* Hover Conduit Bar */}
                  <div
                    className={`absolute top-0 right-0 w-1.5 h-full bg-[#C85A32] transition-transform duration-300 ${
                      isActive
                        ? "translate-x-0"
                        : "translate-x-full group-hover:translate-x-0"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-11 w-11 rounded-2xl transition-colors flex items-center justify-center shrink-0 ${
                            isActive
                              ? "bg-[#18181B] text-white"
                              : "bg-[#F3F2EE] text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono-spec text-[11px] font-semibold text-zinc-400">
                          0{idx + 1} // {card.tag.toUpperCase()}
                        </span>
                      </div>

                      {isWideCard && (
                        <span className="hidden sm:inline-flex items-center rounded-full bg-[#F3F2EE] border border-zinc-900/6 px-3 py-1 font-mono-spec text-[11px] font-semibold text-[#18181B]">
                          {card.typicalRange}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5">
                      <h3
                        className={`font-heading font-bold text-[#18181B] leading-snug ${
                          isWideCard
                            ? "text-2xl sm:text-[26px]"
                            : "text-xl sm:text-2xl"
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-2xl">
                        {card.whatYouSee}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-zinc-900/8 flex items-center justify-between gap-4">
                    <div className="space-y-0.5 min-w-0">
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1E6B4B]">
                        <Wrench className="h-3.5 w-3.5 shrink-0" />
                        <span>Engineered Fix</span>
                      </span>
                      <p className="text-sm font-semibold text-[#18181B] truncate">
                        {card.typicalFix}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-semibold transition-all shrink-0 ${
                        isActive
                          ? "bg-[#18181B] text-white"
                          : "bg-[#F3F2EE] text-[#18181B] group-hover:bg-[#C85A32] group-hover:text-white"
                      }`}
                    >
                      <span>{isActive ? "Less" : "Inspect"}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                </TactileCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
