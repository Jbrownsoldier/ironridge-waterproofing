"use client";

import React, { useState } from "react";
import { Check, ArrowUpRight, FileSearch, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CostEstimator } from "@/components/CostEstimator";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/FadeIn";
import { TactileCard } from "@/components/motion/TactileCard";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function CostGuideSection() {
  const { openInspectionModal } = useInspectionModal();
  const [activeCardTitle, setActiveCardTitle] = useState<string | null>(null);

  return (
    <section
      id="cost-financing"
      aria-labelledby="cost-heading"
      className="py-16 sm:py-24 bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Interactive Central Ohio Repair & Financing Estimator */}
        <FadeIn>
          <CostEstimator
            id="cost-estimator"
            onLockEstimate={(payload) =>
              openInspectionModal({
                problemId: payload.problemId,
                spaceType: payload.spaceType,
                estimateSummary: payload.estimateSummary,
              })
            }
          />
        </FadeIn>

        {/* Reference Price Index Header */}
        <FadeIn className="max-w-3xl space-y-2 pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
            <span>{siteConfig.costSection.eyebrow}</span>
          </div>
          <h2
            id="cost-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight"
          >
            Central Ohio Typical Project Ranges
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            Click any system card to compare inclusions or launch an inspection
            for your exact footage.
          </p>
        </FadeIn>

        {/* 4 Tactile Architectural Price Index Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.costSection.cards.map((card, idx) => {
            const isOpen = activeCardTitle === card.title;
            return (
              <StaggerItem key={card.title}>
                <TactileCard
                  isActive={isOpen}
                  onToggle={() =>
                    setActiveCardTitle(isOpen ? null : card.title)
                  }
                  className="group h-full p-7 flex flex-col justify-between"
                  expandedContent={
                    <div className="pt-4 mt-4 border-t border-zinc-200/70">
                      <button
                        type="button"
                        onClick={() =>
                          openInspectionModal({
                            problemId: card.qualifierOptionId,
                          })
                        }
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C85A32] hover:bg-[#B04A25] text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <span>Book Free Assessment</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-spec">
                      <span>0{idx + 1}</span>
                      <span>{siteConfig.costSection.rangeBadgeLabel}</span>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#18181B] leading-snug">
                        {card.title}
                      </h3>
                      <p className="font-heading text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight tabular-nums-spec mt-2.5">
                        {card.priceRange}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1 leading-snug">
                        {card.unitNote}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-zinc-100 text-xs sm:text-sm text-zinc-600">
                      {card.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-[#1E6B4B] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!isOpen && (
                    <div className="pt-5 mt-5 border-t border-zinc-100">
                      <span className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#F3F2EE] group-hover:bg-[#18181B] text-[#18181B] group-hover:text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors">
                        <span>Select &amp; Book</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  )}
                </TactileCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Asymmetric 2-Card Bento: 0% Financing + Free 2nd Opinion Competitor Quote Audit */}
        <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-3xl bg-[#F3F2EE] p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1E6B4B]">
                <ShieldCheck className="h-4 w-4" />
                <span>Homeowner Financing</span>
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#18181B] leading-snug">
                $0 Down • 0% APR for 12 Months
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Low monthly payment plans starting from{" "}
                <strong className="text-[#18181B]">$119/mo</strong>, and every
                written fixed-price quote is locked in for a full 30 days.
              </p>
            </div>
            <p className="text-xs text-zinc-500 pt-4 border-t border-zinc-200/80">
              {siteConfig.costSection.financingBanner.note}
            </p>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-[#18181B] text-white p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                <FileSearch className="h-4 w-4" />
                <span>{siteConfig.costSection.secondOpinionBox.badge}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                {siteConfig.costSection.secondOpinionBox.headline}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {siteConfig.costSection.secondOpinionBox.copy}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
              <span className="text-xs text-zinc-400">
                Pre-selects &ldquo;2nd Opinion&rdquo; so you can upload your
                quote
              </span>
              <button
                type="button"
                onClick={() =>
                  openInspectionModal({
                    urgency: "Just Planning / 2nd Opinion",
                    secondOpinionMode: true,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer shrink-0"
              >
                <span>{siteConfig.costSection.secondOpinionBox.ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
