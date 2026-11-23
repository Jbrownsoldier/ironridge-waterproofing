"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useInspectionModal } from "@/context/InspectionModalContext";

export function MobileStickyBar() {
  const { openInspectionModal } = useInspectionModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("top");
      if (!heroEl) {
        setVisible(window.scrollY > 360);
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      setVisible(rect.bottom < 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF9F6]/95 backdrop-blur-md border-t border-zinc-200/80 p-3 shadow-[0_-8px_24px_rgba(24,24,27,0.08)]"
        >
          <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
            <a
              href={siteConfig.company.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full bg-[#18181B] px-3 py-3.5 text-xs font-semibold text-white active:scale-[0.98]"
            >
              <Phone className="h-3.5 w-3.5 text-[#C85A32] shrink-0" />
              <span>Call 24/7 Now</span>
            </a>

            <button
              type="button"
              onClick={() => openInspectionModal()}
              className="flex items-center justify-center gap-1.5 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-3 py-3.5 text-xs font-semibold text-white cursor-pointer active:scale-[0.98]"
            >
              <span>Free Inspection</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
