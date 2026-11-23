"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface TactileCardProps {
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
  isActive?: boolean;
  onToggle?: () => void;
  className?: string;
}

/**
 * Interactive architectural card with subtle spring hover lift and
 * click-to-pop-inline expansion ("pop out a bit" without jarring modals).
 */
export function TactileCard({
  children,
  expandedContent,
  isActive = false,
  onToggle,
  className = "",
}: TactileCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layout={!prefersReducedMotion}
      onClick={onToggle}
      role={onToggle ? "button" : undefined}
      tabIndex={onToggle ? 0 : undefined}
      aria-expanded={onToggle && expandedContent ? isActive : undefined}
      onKeyDown={
        onToggle
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
              }
            }
          : undefined
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: isActive ? -6 : -4,
              scale: isActive ? 1.016 : 1.008,
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: isActive ? -5 : 0,
              scale: isActive ? 1.014 : 1,
            }
      }
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className={`relative rounded-3xl transition-shadow duration-300 ${
        onToggle
          ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C85A32]"
          : ""
      } ${
        isActive
          ? "bg-white ring-1 ring-[#C85A32]/40 shadow-[0_28px_60px_-14px_rgba(24,24,27,0.14)] z-10"
          : "surface-card hover:shadow-[0_20px_44px_-12px_rgba(24,24,27,0.09)]"
      } ${className}`}
    >
      {children}

      <AnimatePresence initial={false}>
        {isActive && expandedContent && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
