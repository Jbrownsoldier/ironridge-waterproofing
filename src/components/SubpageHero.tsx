"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  MaskedHeadline,
  MagneticButton,
} from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

interface SubpageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
  ctaLabel?: string;
}

export function SubpageHero({
  eyebrow,
  title,
  description,
  badges = [],
  ctaLabel = "Book Free Inspection",
}: SubpageHeroProps) {
  const { openInspectionModal } = useInspectionModal();

  return (
    <section
      id="top"
      className="relative bg-obsidian-blueprint surface-grain text-white pt-10 pb-14 sm:pt-14 sm:pb-16 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Overview</span>
          </Link>

          <div className="flex items-center gap-2 font-mono-spec text-xs font-semibold uppercase tracking-[0.16em] text-[#E8845F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
            <span>{eyebrow}</span>
          </div>

          <MaskedHeadline
            as="h1"
            immediate
            className="font-heading text-display-section sm:text-5xl font-bold text-white leading-[1.06]"
          >
            {title}
          </MaskedHeadline>

          <FadeIn delay={0.1} distance={10} className="space-y-5">
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => openInspectionModal()}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-8px_rgba(200,90,50,0.6)] transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  <span>{ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>

              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/12 px-3.5 py-2 text-xs font-medium text-zinc-200"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
