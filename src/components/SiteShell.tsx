"use client";

import * as React from "react";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { InspectionModalProvider } from "@/context/InspectionModalContext";
import { StickyHeader } from "@/components/StickyHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileStickyBar } from "@/components/MobileStickyBar";

type ReactWithViewTransition = typeof React & {
  ViewTransition?: React.ComponentType<{ children: React.ReactNode }>;
  unstable_ViewTransition?: React.ComponentType<{ children: React.ReactNode }>;
};

const reactExports = React as ReactWithViewTransition;
const ViewTransitionBoundary: React.ComponentType<{
  children: React.ReactNode;
}> =
  reactExports.ViewTransition ??
  reactExports.unstable_ViewTransition ??
  React.Fragment;

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <InspectionModalProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#18181B]">
          <StickyHeader />
          <ViewTransitionBoundary>
            <main className="flex-1">{children}</main>
          </ViewTransitionBoundary>
          <SiteFooter />
          <MobileStickyBar />
        </div>
      </InspectionModalProvider>
    </SmoothScrollProvider>
  );
}
