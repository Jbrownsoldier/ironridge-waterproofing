"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  CurtainReveal,
  SpotlightSurface,
  MagneticButton,
} from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

const comparisonRows = [
  {
    feature: "Who Inspects Your Home",
    ironridge: "Salaried structural & waterproofing specialist",
    franchise: "Commissioned sales closer paid % of contract",
    explanation:
      "Because our specialists earn a fixed salary with zero sales commission, they have zero financial incentive to upsell $18k tear-outs you do not need.",
  },
  {
    feature: "Pricing Overhead",
    ironridge: "0% franchise royalties or call-center fees",
    franchise: "25% to 35% corporate franchise & ad markup",
    explanation:
      "National franchises send 8% to 12% off the top to corporate headquarters plus TV ad budgets. Staying independent keeps our quotes dramatically lower.",
  },
  {
    feature: "Installation Crew",
    ironridge: "In-house W-2 Ironridge craftspeople",
    franchise: "Often rotated day-labor subcontractors",
    explanation:
      "Every crew member is background-checked, W-2 employed, and trained by Mark Callahan directly on dust containment and structural specs.",
  },
  {
    feature: "Quote Pressure",
    ironridge: "Itemized written quote locked 30 days",
    franchise: '"Sign tonight or lose the discount" tactics',
    explanation:
      "Take a full month to compare quotes or review your options with family. Your written price stays locked down to the penny.",
  },
  {
    feature: "Warranty Transfer",
    ironridge: "100% free real estate transfer to buyer",
    franchise: "Paid transfer fees & strict inspection hoops",
    explanation:
      "If you sell your Central Ohio home, your buyer receives full lifetime dry-basement coverage at zero transfer fee.",
  },
];

export function OwnerGuarantee() {
  const { openInspectionModal } = useInspectionModal();
  const [activeRowFeature, setActiveRowFeature] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="owner-guarantee-heading"
      className="py-20 sm:py-24 lg:py-28 bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightSurface className="rounded-3xl bg-[#141518] surface-grain text-white overflow-hidden border border-white/10 shadow-[0_30px_70px_-18px_rgba(24,24,27,0.24)]">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Mark Callahan Documentary Portrait (next/image + CurtainReveal) */}
            <CurtainReveal className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] bg-zinc-900 overflow-hidden">
              <Image
                src={siteConfig.ownerSection.ownerImage}
                alt={`${siteConfig.company.ownerName}, ${siteConfig.company.ownerTitle}`}
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/92 via-zinc-950/45 to-transparent p-6 pt-20">
                <span className="font-mono-spec text-[10px] uppercase tracking-[0.16em] text-[#E8845F]">
                  FOUNDER &amp; LEAD INSPECTOR • EST. 2007
                </span>
                <p className="font-heading text-lg font-bold text-white mt-0.5">
                  {siteConfig.company.ownerName}
                </p>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {siteConfig.company.ownerTitle}
                </p>
              </div>
            </CurtainReveal>

            {/* Right Column: Warm Editorial Serif Founder's Manifesto */}
            <div className="lg:col-span-7 p-7 sm:p-11 lg:p-14 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 font-mono-spec text-xs font-semibold uppercase tracking-[0.14em] text-[#E8845F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
                <span>{siteConfig.ownerSection.eyebrow}</span>
              </div>

              <h2
                id="owner-guarantee-heading"
                className="text-editorial-quote text-white font-normal"
              >
                {siteConfig.ownerSection.headline}
              </h2>

              <p className="text-base sm:text-[17px] text-zinc-300 leading-relaxed">
                &ldquo;{siteConfig.ownerSection.body}&rdquo;
              </p>

              <div className="flex flex-wrap gap-y-2.5 gap-x-6 pt-1 text-xs sm:text-sm font-medium text-zinc-200">
                {siteConfig.ownerSection.credentials.map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#E8845F]" />
                    {cred}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif-editorial italic text-2xl text-white leading-none">
                    {siteConfig.ownerSection.signatureName}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {siteConfig.ownerSection.signatureTitle}
                  </p>
                </div>

                <MagneticButton>
                  <button
                    type="button"
                    onClick={() => openInspectionModal()}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer shrink-0"
                  >
                    <span>Schedule With Mark&apos;s Team</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </SpotlightSurface>

        {/* Independent Local Engineers vs. National Franchise Chains Tactile Matrix */}
        <FadeIn
          delay={0.08}
          className="mt-8 rounded-3xl surface-card overflow-hidden"
        >
          <div className="px-6 py-6 sm:px-9 sm:py-7 border-b border-zinc-900/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-[#C85A32]">
                INDEPENDENT VS. NATIONAL FRANCHISES
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#18181B] mt-0.5">
                Why Central Ohio Homeowners Switch to Ironridge
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E6B4B]/10 px-3.5 py-1.5 text-xs font-semibold text-[#1E6B4B] self-start sm:self-center">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              Click any row to compare details
            </span>
          </div>

          <div className="divide-y divide-zinc-900/8">
            <div className="hidden md:grid md:grid-cols-12 bg-[#F7F6F2] px-9 py-3 font-mono-spec text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <div className="col-span-4">Category</div>
              <div className="col-span-4 text-[#1E6B4B]">
                Ironridge (Local Independent)
              </div>
              <div className="col-span-4 text-zinc-400">
                Big National Franchises
              </div>
            </div>

            {comparisonRows.map((row) => {
              const isOpen = activeRowFeature === row.feature;
              return (
                <div
                  key={row.feature}
                  className={`transition-colors ${
                    isOpen ? "bg-[#F7F6F2]/85" : "hover:bg-[#FAF9F6]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveRowFeature(isOpen ? null : row.feature)
                    }
                    aria-expanded={isOpen}
                    className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-6 py-4 sm:px-9 items-center cursor-pointer"
                  >
                    <div className="md:col-span-4 flex items-center justify-between font-heading text-sm font-bold text-[#18181B]">
                      <span>{row.feature}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-zinc-400 md:hidden transition-transform ${
                          isOpen ? "rotate-180 text-[#C85A32]" : ""
                        }`}
                      />
                    </div>
                    <div className="md:col-span-4 flex items-start gap-2 text-xs sm:text-sm font-semibold text-[#18181B]">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1E6B4B]/15 text-[#1E6B4B] shrink-0">
                        <Check className="h-3 w-3 stroke-[2.75]" />
                      </span>
                      <span>{row.ironridge}</span>
                    </div>
                    <div className="md:col-span-4 flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-500">
                      <span className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200/80 text-zinc-500 shrink-0">
                          <X className="h-3 w-3 stroke-[2.5]" />
                        </span>
                        <span>{row.franchise}</span>
                      </span>
                      <ChevronDown
                        className={`hidden md:block h-4 w-4 text-zinc-400 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#C85A32]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden px-6 pb-4 sm:px-9"
                      >
                        <p className="text-xs sm:text-sm text-zinc-600 bg-white rounded-2xl p-4 border border-zinc-900/8">
                          {row.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
