"use client";

import React from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function PreFooterBand() {
  const { openInspectionModal } = useInspectionModal();

  return (
    <section
      aria-label="Schedule Structural Assessment"
      className="bg-structural-grid text-white py-20 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C85A32]">
            SAME-WEEK APPOINTMENTS ACROSS CENTRAL OHIO
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
            {siteConfig.preFooterBand.headline}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto">
            {siteConfig.preFooterBand.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <button
              type="button"
              onClick={() => openInspectionModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <span>{siteConfig.preFooterBand.primaryCtaLabel}</span>
              <ArrowUpRight className="h-5 w-5" />
            </button>

            <a
              href={siteConfig.company.phoneHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 px-7 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4 text-[#C85A32]" />
              <span>{siteConfig.preFooterBand.secondaryCtaLabel}</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
