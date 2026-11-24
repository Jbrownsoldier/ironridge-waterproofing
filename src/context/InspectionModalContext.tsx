"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  InspectionQualifier,
  type QualifierPreset,
} from "@/components/InspectionQualifier";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

interface InspectionModalContextValue {
  openInspectionModal: (preset?: Omit<QualifierPreset, "timestamp">) => void;
  closeInspectionModal: () => void;
}

const InspectionModalContext =
  createContext<InspectionModalContextValue | null>(null);

export function useInspectionModal() {
  const ctx = useContext(InspectionModalContext);
  if (!ctx) {
    throw new Error(
      "useInspectionModal must be used within an InspectionModalProvider"
    );
  }
  return ctx;
}

export function InspectionModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pauseScroll, resumeScroll } = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<QualifierPreset | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    pauseScroll();
    return () => resumeScroll();
  }, [isOpen, pauseScroll, resumeScroll]);

  const openInspectionModal = useCallback(
    (nextPreset?: Omit<QualifierPreset, "timestamp">) => {
      if (nextPreset) {
        setPreset({
          ...nextPreset,
          timestamp: Date.now(),
        });
      } else {
        setPreset(null);
      }
      setIsOpen(true);
    },
    []
  );

  const closeInspectionModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <InspectionModalContext.Provider
      value={{ openInspectionModal, closeInspectionModal }}
    >
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-[540px] p-0 bg-transparent border-0 shadow-none overflow-hidden rounded-2xl sm:rounded-3xl max-h-[90dvh]">
          <DialogTitle className="sr-only">
            Book Your Free Structural Inspection
          </DialogTitle>
          <DialogDescription className="sr-only">
            Complete this 45-second structural diagnostic to schedule your free
            45-minute laser and moisture inspection across Central Ohio.
          </DialogDescription>
          <div
            data-lenis-prevent
            className="max-h-[90dvh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl shadow-[0_28px_80px_-16px_rgba(0,0,0,0.55)]"
          >
            <InspectionQualifier preset={preset} />
          </div>
        </DialogContent>
      </Dialog>
    </InspectionModalContext.Provider>
  );
}
