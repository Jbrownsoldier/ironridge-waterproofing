"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<QualifierPreset | null>(null);

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
        <DialogContent className="max-w-xl p-0 bg-transparent border-0 shadow-none overflow-visible sm:rounded-3xl [&>button]:right-4 [&>button]:top-4 [&>button]:z-20 [&>button]:bg-zinc-100 [&>button]:text-zinc-700 [&>button]:hover:bg-zinc-200">
          <DialogTitle className="sr-only">
            Book Your Free Structural Inspection
          </DialogTitle>
          <DialogDescription className="sr-only">
            Complete this 45-second structural diagnostic to schedule your free
            45-minute laser and moisture inspection across Central Ohio.
          </DialogDescription>
          <div className="max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_32px_90px_-16px_rgba(0,0,0,0.55)]">
            <InspectionQualifier preset={preset} />
          </div>
        </DialogContent>
      </Dialog>
    </InspectionModalContext.Provider>
  );
}
