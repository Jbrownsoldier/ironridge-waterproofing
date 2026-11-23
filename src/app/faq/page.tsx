import React from "react";
import type { Metadata } from "next";
import { SubpageHero } from "@/components/SubpageHero";
import { FaqSection } from "@/components/FaqSection";
import { PreFooterBand } from "@/components/PreFooterBand";
import { FaqStructuredData } from "@/components/StructuredData";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Foundation Repair & Waterproofing FAQ",
  description:
    "Straight technical answers from Central Ohio structural specialists on free inspections, interior waterproofing vs. exterior digging, battery backup sump pumps, and transferable warranties.",
  path: "/faq",
  keywords: [
    "basement waterproofing FAQ Columbus",
    "transferable foundation warranty Ohio",
    "interior French drain vs exterior excavation",
  ],
});

export default function FaqPage() {
  return (
    <>
      <FaqStructuredData />
      <SubpageHero
        eyebrow="FIELD ENGINEER ANSWERS"
        title="Straight answers on pricing, yard protection, and warranties."
        description="Filter questions by topic or speak directly with a salaried structural specialist at our West Columbus office."
        badges={[
          "Salaried Engineers",
          "85% Zero Exterior Digging",
          "Free Transferable Warranty",
        ]}
      />

      <FaqSection />
      <PreFooterBand />
    </>
  );
}
