"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextValue {
  pauseScroll: () => void;
  resumeScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  pauseScroll: () => {},
  resumeScroll: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const pauseCountRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    // On mobile/touch devices, native OS momentum scrolling is faster and uses 0% JS CPU
    if (reducedMotion.matches || !finePointer.matches || window.innerWidth < 1024) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const handlePreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.stop();
      } else if (pauseCountRef.current === 0) {
        lenis.start();
      }
    };

    reducedMotion.addEventListener("change", handlePreferenceChange);

    return () => {
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const pauseScroll = useCallback(() => {
    pauseCountRef.current += 1;
    lenisRef.current?.stop();
  }, []);

  const resumeScroll = useCallback(() => {
    pauseCountRef.current = Math.max(0, pauseCountRef.current - 1);
    if (pauseCountRef.current === 0) {
      lenisRef.current?.start();
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ pauseScroll, resumeScroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
