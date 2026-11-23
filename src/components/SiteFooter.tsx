"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function SiteFooter() {
  const [activeModal, setActiveModal] = useState<"privacy" | "warranty" | null>(
    null
  );

  return (
    <>
      <footer className="bg-[#111113] text-zinc-400 border-t border-white/10 pt-16 pb-24 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12 border-b border-white/10">
            {/* Column 1: Identity & Credentials */}
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/15 transition-colors">
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
                <div>
                  <p className="font-heading text-lg font-bold text-white leading-none">
                    Ironridge
                  </p>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mt-0.5">
                    {siteConfig.company.subBrand}
                  </p>
                </div>
              </Link>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {siteConfig.company.localMission}
              </p>

              <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>{siteConfig.company.address}</span>
                </div>
                <p className="font-mono-spec text-zinc-300 pt-1">
                  {siteConfig.company.licenseNumber} •{" "}
                  {siteConfig.company.insuranceSummary}
                </p>
              </div>
            </div>

            {/* Column 2: Service Coverage & Dedicated Routes */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
                Central Ohio Service Area
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {siteConfig.serviceAreas.join(" • ")} &amp; surrounding Central
                Ohio communities.
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                  Explore
                </h4>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      Overview
                    </Link>
                  </li>
                  {siteConfig.navigation.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Direct Dispatch & Hours */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
                Direct Columbus Dispatch
              </h3>

              <div className="space-y-1.5">
                <a
                  href={siteConfig.company.phoneHref}
                  className="inline-flex items-center gap-2 font-heading text-2xl font-bold text-white hover:text-[#C85A32] transition-colors"
                >
                  <Phone className="h-5 w-5 text-[#C85A32]" />
                  <span>{siteConfig.company.phoneDisplay}</span>
                </a>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                  <span>
                    {siteConfig.company.hours} •{" "}
                    {siteConfig.company.emergencyDispatch}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-start gap-2.5 text-xs text-zinc-300">
                <ShieldCheck className="h-4 w-4 text-[#1E6B4B] shrink-0 mt-0.5" />
                <span>
                  Lifetime Transferable Dry-Basement Warranty. Transfers 100%
                  free to future home buyers.
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Legal Line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>
              © {siteConfig.company.copyrightYear} {siteConfig.company.name}.{" "}
              {siteConfig.company.ownershipNote}.
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("warranty")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Warranty Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Dialog
        open={activeModal === "privacy"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {siteConfig.legalModals.privacyPolicy.title}
            </DialogTitle>
            <DialogDescription>
              {siteConfig.legalModals.privacyPolicy.lastUpdated}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2 text-sm text-zinc-600 leading-relaxed">
            {siteConfig.legalModals.privacyPolicy.sections.map((sec) => (
              <div key={sec.heading} className="space-y-1">
                <h4 className="font-heading text-base font-bold text-[#18181B]">
                  {sec.heading}
                </h4>
                <p>{sec.body}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Warranty Terms Modal */}
      <Dialog
        open={activeModal === "warranty"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {siteConfig.legalModals.warrantyTerms.title}
            </DialogTitle>
            <DialogDescription>
              {siteConfig.legalModals.warrantyTerms.lastUpdated}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2 text-sm text-zinc-600 leading-relaxed">
            {siteConfig.legalModals.warrantyTerms.sections.map((sec) => (
              <div
                key={sec.heading}
                className="rounded-2xl bg-[#F3F2EE] p-4 space-y-1"
              >
                <h4 className="font-heading text-base font-bold text-[#18181B] flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1E6B4B] shrink-0" />
                  <span>{sec.heading}</span>
                </h4>
                <p>{sec.body}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
