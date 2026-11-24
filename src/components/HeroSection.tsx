"use client";

import React from "react";
import Link from "next/link";
import { Phone, Check, Calculator, ArrowUpRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FieldVideoStage } from "@/components/FieldVideoStage";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  MaskedHeadline,
  ArchitecturalRule,
  MagneticButton,
} from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function HeroSection() {
  const { openInspectionModal } = useInspectionModal();

  return (
    <section
      id="top"
      aria-label="Hero and Structural Overview"
      className="relative bg-obsidian-blueprint surface-grain text-white overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24"
    >
      {/* Subtle Bottom Hairline Transition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Architectural Metadata Bar (Replaces Generic SaaS Floating Pill) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 sm:mb-10 border-b border-white/10 font-mono-spec text-[11px] uppercase tracking-[0.14em] text-zinc-400">
          <div className="flex items-center gap-2.5 text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>
              Columbus &amp; Central Ohio • Independent Engineers Since{" "}
              {siteConfig.company.established}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              {siteConfig.company.bbbRating}
            </span>
            <span className="text-zinc-500">/</span>
            <span className="text-[#E8845F]">
              {siteConfig.company.basementsProtected}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (6 Cols): Crisp Architectural Grotesque + Clear 3-Second Conversion Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            <MaskedHeadline
              as="h1"
              immediate
              className="font-heading text-display-hero font-bold text-white"
            >
              {siteConfig.hero.headlinePrimary}
              <br />
              <span className="text-zinc-400">
                {siteConfig.hero.headlineSecondary}
              </span>
            </MaskedHeadline>

            <FadeIn
              direction="up"
              delay={0.14}
              distance={12}
              className="space-y-6"
            >
              <p className="text-base sm:text-[17px] text-zinc-300/92 leading-relaxed max-w-xl font-normal">
                {siteConfig.hero.subheadline}
              </p>

              {/* Primary Magnetic Terracotta CTA + Secondary Architectural Cost Estimator */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
                <MagneticButton className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => openInspectionModal()}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_14px_34px_-8px_rgba(200,90,50,0.62)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                  >
                    <span>Book Free Inspection</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </MagneticButton>

                <Link
                  href="/cost-estimator"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Calculator className="h-4 w-4 text-[#E8845F]" />
                  <span>Estimate Repair Cost</span>
                </Link>
              </div>

              <ArchitecturalRule dark className="pt-1" />

              {/* Trust Ledger + Direct Live Columbus Dispatch Line */}
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-medium text-zinc-200">
                  {siteConfig.hero.trustPills.map((pill) => (
                    <div key={pill} className="flex items-center gap-2">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#1E6B4B]/30 text-emerald-400 border border-emerald-400/25">
                        <Check className="h-2.5 w-2.5 stroke-[2.75]" />
                      </span>
                      <span>{pill}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                  <span>{siteConfig.hero.phonePrompt}</span>
                  <a
                    href={siteConfig.company.phoneHref}
                    className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#E8845F] transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#E8845F]" />
                    <span className="font-mono-spec tabular-nums-spec">
                      {siteConfig.company.phoneDisplay}
                    </span>
                  </a>
                  <span className="text-emerald-400 font-medium">
                    • {siteConfig.hero.phoneSubtext}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column (6 Cols): Unobstructed Field Video Stage + Interactive Storm Simulator */}
          <FadeIn direction="up" delay={0.12} className="lg:col-span-6 w-full">
            <FieldVideoStage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
