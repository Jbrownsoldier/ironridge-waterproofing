"use client";

import React from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  MaskedHeadline,
  MagneticButton,
} from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function PreFooterBand() {
  const { openInspectionModal } = useInspectionModal();

  return (
    <section
      aria-label="Schedule Structural Assessment"
      className="bg-structural-grid surface-grain text-white py-20 sm:py-24 border-t border-white/10"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <p className="font-mono-spec text-xs font-semibold uppercase tracking-[0.16em] text-[#E8845F]">
            SAME-WEEK APPOINTMENTS ACROSS CENTRAL OHIO
          </p>

          <MaskedHeadline
            as="h2"
            className="font-heading text-display-section sm:text-5xl font-bold text-white"
          >
            {siteConfig.preFooterBand.headline}
          </MaskedHeadline>

          <FadeIn delay={0.1} distance={10} className="space-y-6">
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto">
              {siteConfig.preFooterBand.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <MagneticButton className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openInspectionModal()}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_-10px_rgba(200,90,50,0.6)] transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  <span>{siteConfig.preFooterBand.primaryCtaLabel}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>

              <a
                href={siteConfig.company.phoneHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-7 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 text-[#E8845F]" />
                <span>{siteConfig.preFooterBand.secondaryCtaLabel}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
