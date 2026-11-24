"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
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

export function ProcessSteps() {
  const { openInspectionModal } = useInspectionModal();
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="process-heading"
      className="py-20 sm:py-24 lg:py-28 bg-[#F3F2EE] surface-grain"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 mb-8 sm:mb-10">
          <div className="flex items-center gap-2 font-mono-spec text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
            <span>{siteConfig.processSection.eyebrow}</span>
          </div>
          <MaskedHeadline
            as="h2"
            id="process-heading"
            className="font-heading text-display-section font-bold text-[#18181B]"
          >
            {siteConfig.processSection.headline}
          </MaskedHeadline>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            {siteConfig.processSection.subheadline}
          </p>
        </div>

        <ArchitecturalRule className="mb-10 sm:mb-12" />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {siteConfig.processSection.steps.map((step) => {
            const isOpen = activeStep === step.stepNumber;
            return (
              <StaggerItem key={step.stepNumber}>
                <TactileCard
                  isActive={isOpen}
                  onToggle={() =>
                    setActiveStep(isOpen ? null : step.stepNumber)
                  }
                  className="h-full p-7 sm:p-8 flex flex-col justify-between"
                  expandedContent={
                    <div className="mt-5 pt-4 border-t border-zinc-200/80 space-y-3">
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {step.detail}
                      </p>
                      <button
                        type="button"
                        onClick={() => openInspectionModal()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85A32] hover:underline cursor-pointer"
                      >
                        <span>Start Step 01 Now</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-spec text-xs font-semibold uppercase tracking-widest text-[#C85A32]">
                        STEP {step.stepNumber}
                      </span>
                      <span className="text-xs font-medium text-[#1E6B4B]">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#18181B] leading-snug">
                      {step.title.replace(/^Step \d:\s*/, "")}
                    </h3>

                    <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900/8 flex items-center justify-between text-xs font-semibold text-zinc-500">
                    <span>
                      {isOpen ? "Hide details" : "Inspect step specs"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180 text-[#C85A32]" : ""
                      }`}
                    />
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
