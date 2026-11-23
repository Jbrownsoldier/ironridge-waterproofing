"use client";

import React from "react";
import Link from "next/link";
import { Phone, Check, Calculator, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FieldVideoStage } from "@/components/FieldVideoStage";
import { FadeIn } from "@/components/motion/FadeIn";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function HeroSection() {
  const { openInspectionModal } = useInspectionModal();

  return (
    <section
      id="top"
      aria-label="Hero and Structural Overview"
      className="relative bg-obsidian-blueprint text-white overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Subtle Bottom Hairline Transition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (6 Cols): Spacious Modern Architectural Copy + Dual CTAs */}
          <FadeIn direction="up" className="lg:col-span-6 space-y-6">
            {/* Live Dispatch Telemetry Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] border border-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>
                Central Ohio Independent Engineers • Est.{" "}
                {siteConfig.company.established}
              </span>
            </div>

            {/* Clean, Modern Architectural Headline (Zero em-dashes, zero italic serif) */}
            <h1 className="font-heading text-4xl sm:text-5xl xl:text-[56px] font-bold tracking-tight text-white leading-[1.06]">
              {siteConfig.hero.headlinePrimary}
              <br />
              <span className="text-zinc-400">
                {siteConfig.hero.headlineSecondary}
              </span>
            </h1>

            {/* Calm, Empathetic Subheadline */}
            <p className="text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-xl font-normal">
              {siteConfig.hero.subheadline}
            </p>

            {/* Primary Pop-Out Modal CTA + Secondary Cost Estimator Route */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => openInspectionModal()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_12px_32px_-8px_rgba(200,90,50,0.65)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span>Book Free Inspection</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <Link
                href="/cost-estimator"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calculator className="h-4 w-4 text-[#E8845F]" />
                <span>Estimate Repair Cost</span>
              </Link>
            </div>

            {/* Direct Live Columbus Line + Unboxed Telemetry Trust Ledger */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-medium text-zinc-200">
                {siteConfig.hero.trustPills.map((pill) => (
                  <div key={pill} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1E6B4B]/25 text-emerald-400 border border-emerald-400/20">
                      <Check className="h-3 w-3 stroke-[2.75]" />
                    </span>
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span>{siteConfig.hero.phonePrompt}</span>
                <a
                  href={siteConfig.company.phoneHref}
                  className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#E8845F] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E8845F]" />
                  <span className="tabular-nums-spec">
                    {siteConfig.company.phoneDisplay}
                  </span>
                </a>
                <span className="text-emerald-400 font-medium">
                  • {siteConfig.hero.phoneSubtext}
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Right Column (6 Cols): Field Video Reel + Switchable Structural Cutaway */}
          <FadeIn direction="up" delay={0.08} className="lg:col-span-6 w-full">
            <FieldVideoStage />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
