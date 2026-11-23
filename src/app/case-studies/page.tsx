import React from "react";
import type { Metadata } from "next";
import { SubpageHero } from "@/components/SubpageHero";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { PreFooterBand } from "@/components/PreFooterBand";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Central Ohio Waterproofing & Foundation Case Studies",
  description:
    "Watch documented before-and-after basement waterproofing, carbon fiber wall stabilization, and crawl space encapsulation repairs across Westerville, Dublin, and Upper Arlington.",
  path: "/case-studies",
  keywords: [
    "Westerville foundation repair case study",
    "Dublin basement waterproofing reviews",
    "Upper Arlington crawl space encapsulation",
  ],
});

export default function CaseStudiesPage() {
  return (
    <>
      <SubpageHero
        eyebrow="DOCUMENTED CENTRAL OHIO PROJECTS"
        title="Real local repairs with bone-dry storm results."
        description="Watch our 3-chapter field transformation reel, drag the before-and-after sliders, and read verified Central Ohio homeowner reviews."
        badges={[
          `${siteConfig.company.basementsProtected}`,
          `${siteConfig.company.rating}★ (${siteConfig.company.reviewCount} Reviews)`,
          "100% Dry Record",
        ]}
      />

      <BeforeAfterSection />
      <PreFooterBand />
    </>
  );
}
