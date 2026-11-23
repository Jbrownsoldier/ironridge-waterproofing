import React from "react";
import type { Metadata } from "next";
import { SubpageHero } from "@/components/SubpageHero";
import { CostGuideSection } from "@/components/CostGuideSection";
import { PreFooterBand } from "@/components/PreFooterBand";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Basement Waterproofing & Foundation Repair Cost Estimator",
  description:
    "Calculate real Central Ohio pricing for interior French drains, crack injection, carbon fiber wall straps, dual sump pumps, and crawl space encapsulation with $0-down 0% APR financing.",
  path: "/cost-estimator",
  keywords: [
    "basement waterproofing cost Columbus OH",
    "foundation crack repair price Central Ohio",
    "French drain cost per foot Ohio",
  ],
});

export default function CostEstimatorPage() {
  return (
    <>
      <SubpageHero
        eyebrow="TRANSPARENT CENTRAL OHIO PRICING"
        title="Calculate your repair range before scheduling an inspection."
        description={siteConfig.costSection.subheadline}
        badges={[
          "$0 Down • 0% APR for 12 Months",
          "Quotes Locked 30 Days",
          "0% Franchise Markup",
        ]}
        ctaLabel="Book Inspection & Lock Quote"
      />

      <CostGuideSection />
      <PreFooterBand />
    </>
  );
}
