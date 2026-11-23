"use client";

import React from "react";
import { InspectionModalProvider } from "@/context/InspectionModalContext";
import { StickyHeader } from "@/components/StickyHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileStickyBar } from "@/components/MobileStickyBar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <InspectionModalProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#18181B]">
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileStickyBar />
      </div>
    </InspectionModalProvider>
  );
}
