"use client";

import React, { useState } from "react";
import { InteractiveBlueprint } from "@/components/InteractiveBlueprint";
import { FadeIn } from "@/components/motion/FadeIn";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function DiagnosticsCutawaySection() {
  const { openInspectionModal } = useInspectionModal();
  const [activeZoneId, setActiveZoneId] = useState<string>("active-leak");

  return (
    <section
      aria-label="Interactive Structural Foundation Cutaway"
      className="py-16 sm:py-20 bg-[#141518]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono-spec text-xs font-semibold uppercase tracking-widest text-[#E8845F]">
                INTERACTIVE ENGINEERING CUTAWAY
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                Click Any Zone to Inspect the Failure Mode &amp; Permanent Fix
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Built for Central Ohio glacial clay soils, hydrostatic floor
              seepage, and poured or block foundation walls.
            </p>
          </div>

          <InteractiveBlueprint
            activeZoneId={activeZoneId}
            onSelectZone={setActiveZoneId}
            onDiagnoseZone={(zoneId) =>
              openInspectionModal({ problemId: zoneId })
            }
          />
        </FadeIn>
      </div>
    </section>
  );
}
