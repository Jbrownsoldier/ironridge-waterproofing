"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  Menu,
  X,
  Star,
  ArrowUpRight,
  Clock,
  MapPin,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { siteConfig } from "@/config/site";
import { useInspectionModal } from "@/context/InspectionModalContext";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

export function StickyHeader() {
  const pathname = usePathname();
  const { openInspectionModal } = useInspectionModal();
  const { pauseScroll, resumeScroll } = useSmoothScroll();
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportsCssScrollTimeline, setSupportsCssScrollTimeline] =
    useState(false);

  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: scroll()")
    ) {
      setSupportsCssScrollTimeline(true);
    }
  }, []);

  // Zero-scroll-jank IntersectionObserver hero detection
  useEffect(() => {
    const heroEl = document.getElementById("top");
    if (!heroEl) {
      setIsPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPastHero(!entry.isIntersecting);
      },
      {
        rootMargin: "-88px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    pauseScroll();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      resumeScroll();
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, pauseScroll, resumeScroll]);

  return (
    <>
      {/* Obsidian Dispatch Micro-Strip */}
      <div className="bg-[#07080A] text-zinc-300 border-b border-white/10 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium truncate">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              Central Ohio Structural &amp; Waterproofing Engineering •{" "}
              <span className="font-mono-spec text-[11px] text-zinc-400">
                {siteConfig.company.licenseNumber}
              </span>
            </span>
          </div>
          <a
            href={siteConfig.company.phoneHref}
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#E8845F] transition-colors shrink-0"
          >
            <span>24/7 Active Leak Dispatch:</span>
            <span className="underline underline-offset-4 decoration-[#C85A32]">
              {siteConfig.company.phoneDisplay}
            </span>
          </a>
        </div>
      </div>

      {/* Adaptive Glassmorphic Sticky Header anchored across View Transitions */}
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isPastHero
            ? "bg-[#FAF9F6]/92 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(24,24,27,0.09)] border-b border-zinc-900/8 text-[#18181B] py-3"
            : "bg-[#0B0C0E]/88 backdrop-blur-md border-b border-white/10 text-white py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Left: Clean Minimalist Architectural Mark + Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#C85A32] rounded-lg shrink-0"
          >
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-[1.04] ${
                isPastHero
                  ? "bg-[#18181B] text-white"
                  : "bg-white/10 text-white ring-1 ring-white/15"
              }`}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="h-5 w-5 text-white"
                aria-hidden="true"
              >
                <path
                  d="M16 4L6 8V15.5C6 21.8 10.2 27.5 16 29.3C21.8 27.5 26 21.8 26 15.5V8L16 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5 11.5H20.5M16 11.5V20.5M11.5 20.5H20.5"
                  stroke="#C85A32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading text-lg sm:text-xl font-bold tracking-tight leading-none transition-colors ${
                  isPastHero ? "text-[#18181B]" : "text-white"
                }`}
              >
                Ironridge
              </span>
              <span
                className={`text-[10px] font-semibold tracking-widest uppercase mt-0.5 transition-colors ${
                  isPastHero ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Structural &amp; Waterproofing
              </span>
            </div>
          </Link>

          {/* Center: 4 Dedicated Multi-Page Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1.5"
          >
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    isPastHero
                      ? isActive
                        ? "text-[#18181B] font-semibold bg-[#F3F2EE]"
                        : "text-zinc-600 hover:text-[#18181B] hover:bg-zinc-200/50"
                      : isActive
                      ? "text-white font-semibold bg-white/10"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="header-active-route"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[#C85A32]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Phone Link + Single Primary Pop-Out Modal CTA + Mobile Burger */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <a
              href={siteConfig.company.phoneHref}
              className={`hidden md:inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                isPastHero
                  ? "text-[#18181B] hover:text-[#C85A32]"
                  : "text-white hover:text-[#E8845F]"
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-[#C85A32]" />
              <span className="tabular-nums-spec">
                {siteConfig.company.phoneDisplay}
              </span>
            </a>

            <button
              type="button"
              onClick={() => openInspectionModal()}
              className={`group hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer ${
                isPastHero
                  ? "bg-[#18181B] hover:bg-[#C85A32] shadow-sm"
                  : "bg-[#C85A32] hover:bg-[#B04A25] shadow-[0_6px_20px_-4px_rgba(200,90,50,0.45)]"
              }`}
            >
              <span>Book Inspection</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              id="mobile-burger-trigger"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden inline-flex items-center justify-center rounded-xl p-2.5 focus-visible:outline-2 focus-visible:outline-[#C85A32] transition-colors cursor-pointer ${
                isPastHero
                  ? "bg-[#F3F2EE] text-[#18181B] hover:bg-zinc-200/80"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* GPU-Native CSS Scroll-Driven Progress Bar (with Framer fallback) */}
        {supportsCssScrollTimeline && !prefersReducedMotion ? (
          <div
            className="css-scroll-progress absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C85A32] to-[#E8845F]"
            aria-hidden="true"
          />
        ) : (
          <motion.div
            style={{ scaleX: prefersReducedMotion ? 0 : smoothProgress }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#C85A32] to-[#E8845F]"
            aria-hidden="true"
          />
        )}
      </header>

      {/* Tablet & Mobile Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-zinc-950/65 backdrop-blur-xs"
            />

            <motion.nav
              data-lenis-prevent
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 w-[min(22rem,86vw)] bg-[#FAF9F6] shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
            >
              <div>
                <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200/80">
                  <div>
                    <p className="font-heading text-lg font-bold text-[#18181B] leading-none">
                      Ironridge
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Est. {siteConfig.company.established} • Central Ohio
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-200/60 hover:text-[#18181B] transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-6 py-3.5 bg-[#F3F2EE] flex items-center justify-between text-xs font-medium text-zinc-700">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {siteConfig.company.rating}★ ({siteConfig.company.reviewCount}{" "}
                    Reviews)
                  </span>
                  <span className="text-[#1E6B4B] font-semibold">
                    {siteConfig.company.bbbRating}
                  </span>
                </div>

                <div className="p-6 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold transition-colors ${
                      pathname === "/"
                        ? "bg-[#18181B] text-white"
                        : "text-[#18181B] hover:bg-[#F3F2EE]"
                    }`}
                  >
                    <span>Home Overview</span>
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  </Link>
                  {siteConfig.navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold transition-colors ${
                          isActive
                            ? "bg-[#18181B] text-white"
                            : "text-[#18181B] hover:bg-[#F3F2EE]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-zinc-200/80 bg-[#F3F2EE]/70 space-y-3">
                <div className="space-y-1.5 text-xs text-zinc-600 pb-1">
                  <div className="flex items-center gap-2 font-medium text-[#18181B]">
                    <ShieldCheck className="h-4 w-4 text-[#1E6B4B] shrink-0" />
                    <span>{siteConfig.company.licenseNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>{siteConfig.company.emergencyDispatch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>Columbus &amp; Central Ohio</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openInspectionModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer"
                >
                  <span>Book Free Inspection</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <a
                  href={siteConfig.company.phoneHref}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#18181B] hover:bg-zinc-100 transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#C85A32]" />
                  <span>{siteConfig.company.phoneDisplay}</span>
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
