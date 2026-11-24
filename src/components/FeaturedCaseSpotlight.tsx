"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowUpRight, Film } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  MaskedHeadline,
  ArchitecturalRule,
} from "@/components/motion/EditorialMotion";
import {
  ComparisonSlider,
  type ComparisonAnnotation,
} from "@/components/ComparisonSlider";

const CASE1_ANNOTATIONS: ComparisonAnnotation[] = [
  {
    side: "before",
    label: "Active Diagonal Shear Crack",
    xPercent: 28,
    yPercent: 52,
  },
  {
    side: "after",
    label: "Carbon Fiber Lock + Vapor Wall",
    xPercent: 72,
    yPercent: 48,
  },
];

export function FeaturedCaseSpotlight() {
  const project = siteConfig.beforeAfterSection.cases[0];

  return (
    <section
      aria-labelledby="featured-project-heading"
      className="py-20 sm:py-24 bg-[#F3F2EE] surface-grain"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 font-mono-spec text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
              <span>FEATURED CENTRAL OHIO PROJECT</span>
            </div>
            <MaskedHeadline
              as="h2"
              id="featured-project-heading"
              className="font-heading text-display-section font-bold text-[#18181B]"
            >
              Documented Repairs. Bone-Dry Basements.
            </MaskedHeadline>
          </div>

          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full bg-[#18181B] hover:bg-[#C85A32] text-white px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 self-start lg:self-end shrink-0"
          >
            <Film className="h-4 w-4 text-[#E8845F]" />
            <span>View All 3 Case Studies &amp; Video</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <ArchitecturalRule className="mb-10" />

        {/* Shared ViewTransition Anchor Morphing Into /case-studies */}
        <FadeIn delay={0.05}>
          <div
            style={{ viewTransitionName: "case-study-hero-card" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center rounded-3xl surface-card p-5 sm:p-8 lg:p-10"
          >
            {/* Left 7 Cols: Unified Precision Before/After Slider */}
            <div className="lg:col-span-7">
              <ComparisonSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                beforeLabel={project.beforeLabel}
                afterLabel={project.afterLabel}
                location={project.location}
                annotations={CASE1_ANNOTATIONS}
              />
            </div>

            {/* Right 5 Cols: Project Dossier Summary */}
            <div className="lg:col-span-5 space-y-5">
              <div className="border-b border-zinc-900/10 pb-4">
                <span className="font-mono-spec text-xs text-zinc-400">
                  CASE STUDY 01 // VERIFIED RECORD
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#18181B] mt-0.5">
                  {project.location}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-mono-spec text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Initial Condition
                  </p>
                  <p className="text-[#18181B] font-medium mt-1">
                    {project.problem}
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-900/8">
                  <p className="font-mono-spec text-[11px] font-semibold uppercase tracking-wider text-[#1E6B4B]">
                    Engineered Scope
                  </p>
                  <p className="text-[#18181B] font-medium mt-1">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.specs.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F2EE] border border-zinc-900/6 px-3 py-1 text-xs font-semibold text-zinc-700"
                  >
                    <Check className="h-3.5 w-3.5 text-[#1E6B4B]" />
                    {spec}
                  </span>
                ))}
              </div>

              <blockquote className="pt-4 border-t border-zinc-900/10 space-y-2.5">
                <p className="font-serif-editorial text-lg sm:text-[19px] text-zinc-800 leading-snug">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <footer className="flex items-center justify-between text-xs pt-1">
                  <span className="font-semibold text-[#18181B]">
                    {project.testimonial.author}
                  </span>
                  <span className="font-medium text-[#1E6B4B]">
                    {project.testimonial.badge}
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
