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
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/FadeIn";
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

  return (
    <section
      id="problems"
      aria-labelledby="symptoms-heading"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Section Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
              <span>{siteConfig.symptomsSection.eyebrow}</span>
            </div>
            <h2
              id="symptoms-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#18181B] tracking-tight leading-[1.12]"
            >
              {siteConfig.symptomsSection.headline}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              {siteConfig.symptomsSection.subheadline}
            </p>
          </div>

          {previewMode && (
            <Link
              href="/diagnostics"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F2EE] hover:bg-[#18181B] text-[#18181B] hover:text-white px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 self-start lg:self-end shrink-0"
            >
              <span>Full Structural Cutaway</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </FadeIn>

        {/* 2x2 Bento Diagnostic Grid with Tactile Click-to-Pop-Inline Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {siteConfig.symptomsSection.cards.map((card, idx) => {
            const Icon = iconMap[card.iconName];
            const isActive = activeCardId === card.id;

            return (
              <StaggerItem key={card.id}>
                <TactileCard
                  isActive={isActive}
                  onToggle={() =>
                    setActiveCardId(isActive ? null : card.id)
                  }
                  className="group overflow-hidden h-full p-7 sm:p-8 flex flex-col justify-between"
                  expandedContent={
                    <div className="mt-5 pt-5 border-t border-zinc-200/80 space-y-4">
                      <div className="rounded-2xl bg-[#F7F6F2] p-4 space-y-2 text-xs sm:text-sm text-zinc-600">
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
                      <div
                        className={`h-12 w-12 rounded-2xl transition-colors flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-[#18181B] text-white"
                            : "bg-[#F3F2EE] text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono-spec text-xs font-medium text-zinc-400">
                        0{idx + 1} / {card.tag.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#18181B] leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                        {card.whatYouSee}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-zinc-100 flex items-center justify-between gap-4">
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
