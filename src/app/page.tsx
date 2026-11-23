import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { SymptomGrid } from "@/components/SymptomGrid";
import { FeaturedCaseSpotlight } from "@/components/FeaturedCaseSpotlight";
import { OwnerGuarantee } from "@/components/OwnerGuarantee";
import { PreFooterBand } from "@/components/PreFooterBand";
import { buildPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  description: siteConfig.seo.defaultDescription,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AuthorityStrip />
      <SymptomGrid previewMode />
      <FeaturedCaseSpotlight />
      <OwnerGuarantee />
      <PreFooterBand />
    </>
  );
}
