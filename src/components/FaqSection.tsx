"use client";

import React, { useState, useMemo } from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/FadeIn";
import { MaskedHeadline } from "@/components/motion/EditorialMotion";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function FaqSection() {
  const { openInspectionModal } = useInspectionModal();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return siteConfig.faqSection.items;
    return siteConfig.faqSection.items.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 bg-[#F3F2EE] surface-grain"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 4 Cols: Category Filter & Direct Columbus Structural Desk Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono-spec text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A32]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C85A32]" />
                <span>{siteConfig.faqSection.eyebrow}</span>
              </div>
              <MaskedHeadline
                as="h2"
                id="faq-heading"
                className="font-heading text-3xl sm:text-4xl font-bold text-[#18181B] leading-[1.1]"
              >
                {siteConfig.faqSection.headline}
              </MaskedHeadline>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                {siteConfig.faqSection.subheadline}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {siteConfig.faqSection.categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={active}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-[#18181B] text-white shadow-xs scale-[1.03]"
                        : "bg-white text-zinc-700 border border-zinc-900/8 hover:bg-zinc-200/70"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="rounded-3xl surface-card p-6 space-y-3.5">
              <p className="font-heading text-base font-bold text-[#18181B]">
                Have a home inspection report or specific question?
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Talk directly with a salaried structural specialist at our
                Columbus desk, never a call center.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={siteConfig.company.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#C85A32] hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  <span>{siteConfig.company.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => openInspectionModal()}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#18181B] hover:text-[#C85A32] cursor-pointer"
                >
                  <span>Book Online</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right 8 Cols: Smooth Animated FAQ Accordion */}
          <FadeIn delay={0.08} className="lg:col-span-8">
            <div className="rounded-3xl surface-card px-6 sm:px-9 py-3">
              <Accordion
                type="single"
                collapsible
                defaultValue={filteredItems[0]?.question}
              >
                {filteredItems.map((faq) => (
                  <AccordionItem
                    key={faq.question}
                    value={faq.question}
                    className="last:border-b-0"
                  >
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
