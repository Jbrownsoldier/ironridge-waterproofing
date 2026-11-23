import React from "react";
import type { Metadata } from "next";
import { SubpageHero } from "@/components/SubpageHero";
import { DiagnosticsCutawaySection } from "@/components/DiagnosticsCutawaySection";
import { SymptomGrid } from "@/components/SymptomGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { PreFooterBand } from "@/components/PreFooterBand";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Structural & Basement Leak Diagnostics",
  description:
    "Interactive Central Ohio foundation cutaway and basement symptom guide. Diagnose cove joint seepage, foundation wall cracks, bowing walls, and damp crawl spaces with laser precision.",
  path: "/diagnostics",
  keywords: [
    "basement leak diagnostics Columbus OH",
    "bowing foundation wall inspection",
    "hydrostatic pressure basement water",
  ],
});

export default function DiagnosticsPage() {
  return (
    <>
      <SubpageHero
        eyebrow="STRUCTURAL & WATERPROOFING DIAGNOSTICS"
        title="Pinpoint the exact cause before anyone quotes a repair."
        description="Explore our interactive Central Ohio foundation cutaway and symptom guide. Every inspection includes digital ±0.125&quot; laser wall deflection checks and wall moisture mapping."
        badges={[
          "45-Min Laser & Moisture Audit",
          "Zero Commissioned Salesmen",
        ]}
      />

      <DiagnosticsCutawaySection />
      <SymptomGrid />
      <ProcessSteps />
      <PreFooterBand />
    </>
  );
}
