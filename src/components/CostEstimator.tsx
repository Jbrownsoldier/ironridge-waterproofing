"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpRight, ShieldCheck, Check, Sparkles, Clock } from "lucide-react";

interface EstimatorOption {
  id: string;
  problemId: string;
  label: string;
  shortDesc: string;
  unitLabel: string;
  unitSingular: string;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  lowPerUnit: number;
  highPerUnit: number;
  baseFeeLow: number;
  baseFeeHigh: number;
  duration: string;
  supportsBackupToggle: boolean;
}

const ESTIMATOR_OPTIONS: EstimatorOption[] = [
  {
    id: "french-drain",
    problemId: "active-leak",
    label: "Interior French Drain",
    shortDesc: "Sub-floor perimeter drain tile + vapor wall channel",
    unitLabel: "Linear Feet",
    unitSingular: "ft",
    min: 20,
    max: 160,
    step: 10,
    defaultVal: 70,
    lowPerUnit: 68,
    highPerUnit: 92,
    baseFeeLow: 650,
    baseFeeHigh: 850,
    duration: "1-2 Days",
    supportsBackupToggle: true,
  },
  {
    id: "crack-injection",
    problemId: "wall-cracks",
    label: "Crack Injection",
    shortDesc: "Full-depth 8\" polyurethane or structural epoxy seal",
    unitLabel: "Cracks",
    unitSingular: "crack",
    min: 1,
    max: 6,
    step: 1,
    defaultVal: 2,
    lowPerUnit: 650,
    highPerUnit: 950,
    baseFeeLow: 150,
    baseFeeHigh: 250,
    duration: "3-4 Hours",
    supportsBackupToggle: false,
  },
  {
    id: "wall-stabilization",
    problemId: "bowing-walls",
    label: "Carbon Fiber Straps",
    shortDesc: "Aerospace-grade straps halting inward wall deflection",
    unitLabel: "Straps",
    unitSingular: "strap",
    min: 4,
    max: 14,
    step: 1,
    defaultVal: 6,
    lowPerUnit: 780,
    highPerUnit: 1050,
    baseFeeLow: 400,
    baseFeeHigh: 600,
    duration: "1-2 Days",
    supportsBackupToggle: false,
  },
  {
    id: "sump-backup",
    problemId: "crawl-space",
    label: "Dual Sump & Backup",
    shortDesc: "Cast-iron primary + marine battery storm backup + sealed lid",
    unitLabel: "Sump Systems",
    unitSingular: "system",
    min: 1,
    max: 2,
    step: 1,
    defaultVal: 1,
    lowPerUnit: 1850,
    highPerUnit: 3150,
    baseFeeLow: 0,
    baseFeeHigh: 0,
    duration: "Half Day",
    supportsBackupToggle: false,
  },
  {
    id: "crawl-encapsulation",
    problemId: "crawl-space",
    label: "Crawl Encapsulation",
    shortDesc: "20-mil reinforced vapor barrier + sealed vents + dehumidifier",
    unitLabel: "Sq. Ft.",
    unitSingular: "sq ft",
    min: 400,
    max: 1800,
    step: 100,
    defaultVal: 900,
    lowPerUnit: 6.5,
    highPerUnit: 9.25,
    baseFeeLow: 950,
    baseFeeHigh: 1350,
    duration: "2 Days",
    supportsBackupToggle: true,
  },
];

export interface LockEstimatePayload {
  problemId: string;
  spaceType?: string;
  estimateSummary: string;
}

interface CostEstimatorProps {
  id?: string;
  onLockEstimate: (payload: LockEstimatePayload) => void;
}

function formatMoney(n: number): string {
  return `$${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function CostEstimator({ id, onLockEstimate }: CostEstimatorProps) {
  const [selectedId, setSelectedId] = useState<string>("french-drain");
  const [quantity, setQuantity] = useState<number>(70);
  const [isFinishedSpace, setIsFinishedSpace] = useState<boolean>(false);
  const [includeBatteryBackup, setIncludeBatteryBackup] =
    useState<boolean>(true);

  const activeOption = useMemo(
    () =>
      ESTIMATOR_OPTIONS.find((opt) => opt.id === selectedId) ||
      ESTIMATOR_OPTIONS[0],
    [selectedId]
  );

  const handleSelectOption = (opt: EstimatorOption) => {
    setSelectedId(opt.id);
    setQuantity(opt.defaultVal);
  };

  const { lowTotal, highTotal, zeroAprMonthly, lowMonthly, franchiseSavings } =
    useMemo(() => {
      let low =
        activeOption.baseFeeLow + quantity * activeOption.lowPerUnit;
      let high =
        activeOption.baseFeeHigh + quantity * activeOption.highPerUnit;

      if (isFinishedSpace) {
        low *= 1.15;
        high *= 1.15;
      }

      if (activeOption.supportsBackupToggle && includeBatteryBackup) {
        low += 1150;
        high += 1400;
      }

      const midpoint = (low + high) / 2;
      const apr12 = Math.round(midpoint / 12);
      // Simple 60-mo representative financing factor (~0.0205/mo)
      const mo60 = Math.round(midpoint * 0.0205);
      const savings = Math.round(midpoint * 0.27);

      return {
        lowTotal: low,
        highTotal: high,
        zeroAprMonthly: apr12,
        lowMonthly: mo60,
        franchiseSavings: savings,
      };
    }, [activeOption, quantity, isFinishedSpace, includeBatteryBackup]);

  const sliderPercent =
    ((quantity - activeOption.min) / (activeOption.max - activeOption.min)) *
    100;

  const formattedRange = `${formatMoney(lowTotal)} - ${formatMoney(highTotal)}`;

  const handleLockClick = () => {
    const unitDisplay =
      activeOption.unitSingular === "ft" || activeOption.unitSingular === "sq ft"
        ? `${quantity} ${activeOption.unitSingular}`
        : `${quantity} ${activeOption.unitSingular}${quantity > 1 ? "s" : ""}`;

    const spaceType =
      activeOption.id === "crawl-encapsulation"
        ? "Crawl Space"
        : isFinishedSpace
        ? "Finished Basement"
        : "Unfinished Basement";

    onLockEstimate({
      problemId: activeOption.problemId,
      spaceType,
      estimateSummary: `${activeOption.label} (${unitDisplay}) • Est. ${formattedRange}`,
    });
  };

  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-3xl surface-elevated overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left 7 Cols: Interactive Scope Configurator */}
        <div className="lg:col-span-7 p-6 sm:p-9 space-y-7 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-[#C85A32]">
                INTERACTIVE CENTRAL OHIO CALCULATOR
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#18181B] mt-0.5">
                Configure Your Repair Scope
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F2EE] px-3 py-1 text-xs font-semibold text-zinc-700">
              <Sparkles className="h-3.5 w-3.5 text-[#C85A32]" />
              Real Local Rates
            </span>
          </div>

          {/* 1. Repair Category Pills */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              1. Select Repair System
            </p>
            <div className="flex flex-wrap gap-2">
              {ESTIMATOR_OPTIONS.map((opt) => {
                const isSelected = opt.id === activeOption.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    aria-pressed={isSelected}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#18181B] text-white shadow-xs"
                        : "bg-[#F3F2EE] text-zinc-700 hover:bg-[#EAE8E1] hover:text-[#18181B]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-zinc-500 pt-0.5">
              {activeOption.shortDesc}
            </p>
          </div>

          {/* 2. Dynamic Scope Slider */}
          <div className="space-y-3 rounded-2xl bg-[#F7F6F2] p-5">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="estimator-scope-slider"
                className="text-xs sm:text-sm font-semibold text-[#18181B]"
              >
                2. Estimated {activeOption.unitLabel}
              </label>
              <span className="font-mono-spec tabular-nums-spec text-lg sm:text-xl font-bold text-[#C85A32]">
                {quantity.toLocaleString()}{" "}
                <span className="text-xs font-semibold text-zinc-500 uppercase">
                  {activeOption.unitLabel}
                </span>
              </span>
            </div>

            <input
              id="estimator-scope-slider"
              type="range"
              min={activeOption.min}
              max={activeOption.max}
              step={activeOption.step}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #C85A32 ${sliderPercent}%, #DFDDD6 ${sliderPercent}%)`,
              }}
              className="ironridge-slider"
            />

            <div className="flex items-center justify-between font-mono-spec text-[11px] text-zinc-500 tabular-nums-spec">
              <span>
                {activeOption.min} {activeOption.unitSingular}
              </span>
              <span>
                {activeOption.max} {activeOption.unitLabel}
              </span>
            </div>
          </div>

          {/* 3. Site Condition Toggles */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              3. Site Conditions &amp; Storm Protection
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsFinishedSpace((v) => !v)}
                aria-pressed={isFinishedSpace}
                className={`rounded-2xl p-3.5 text-left transition-all flex items-start gap-3 cursor-pointer border ${
                  isFinishedSpace
                    ? "bg-[#18181B] text-white border-[#18181B]"
                    : "bg-[#F7F6F2] text-[#18181B] border-transparent hover:bg-[#EFECE6]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md shrink-0 ${
                    isFinishedSpace
                      ? "bg-[#C85A32] text-white"
                      : "bg-white text-zinc-300 border border-zinc-300"
                  }`}
                >
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Finished Basement
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      isFinishedSpace ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    Plastic dust isolation &amp; trim protection (+15%)
                  </p>
                </div>
              </button>

              {activeOption.supportsBackupToggle ? (
                <button
                  type="button"
                  onClick={() => setIncludeBatteryBackup((v) => !v)}
                  aria-pressed={includeBatteryBackup}
                  className={`rounded-2xl p-3.5 text-left transition-all flex items-start gap-3 cursor-pointer border ${
                    includeBatteryBackup
                      ? "bg-[#18181B] text-white border-[#18181B]"
                      : "bg-[#F7F6F2] text-[#18181B] border-transparent hover:bg-[#EFECE6]"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md shrink-0 ${
                      includeBatteryBackup
                        ? "bg-[#1E6B4B] text-white"
                        : "bg-white text-zinc-300 border border-zinc-300"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">
                      Add Marine Battery Backup
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        includeBatteryBackup ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      Keeps sump running during storm outages
                    </p>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl p-3.5 bg-[#F3F2EE]/70 flex items-start gap-3 opacity-85">
                  <ShieldCheck className="h-5 w-5 text-[#1E6B4B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#18181B]">
                      Zero Exterior Digging
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Preserves landscaping, porch &amp; driveway
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Dark Obsidian Live Output & Financing Panel */}
        <div className="lg:col-span-5 bg-structural-grid text-white p-6 sm:p-9 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono-spec text-[11px] font-semibold uppercase tracking-widest text-[#E8845F]">
                INSTANT ESTIMATE RANGE
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
                <Clock className="h-3 w-3 text-[#E8845F]" />
                {activeOption.duration}
              </span>
            </div>

            <div>
              <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums-spec">
                {formattedRange}
              </p>
              <p className="text-xs text-zinc-400 mt-1.5">
                Includes full materials, in-house installation &amp; clean-up.
              </p>
            </div>

            {/* Monthly Financing Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3.5">
                <p className="text-[11px] font-medium text-zinc-400">
                  0% APR (12 Months)
                </p>
                <p className="font-heading text-xl font-bold text-white tabular-nums-spec mt-1">
                  ${zeroAprMonthly.toLocaleString()}
                  <span className="text-xs font-normal text-zinc-400">/mo</span>
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3.5">
                <p className="text-[11px] font-medium text-zinc-400">
                  Low Monthly (60 Mo)
                </p>
                <p className="font-heading text-xl font-bold text-white tabular-nums-spec mt-1">
                  ${lowMonthly.toLocaleString()}
                  <span className="text-xs font-normal text-zinc-400">/mo</span>
                </p>
              </div>
            </div>

            {/* Franchise Savings & Warranty Specs */}
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">
                  Est. Savings vs. National Franchises
                </span>
                <span className="font-mono-spec font-bold text-emerald-400 tabular-nums-spec">
                  ~${franchiseSavings.toLocaleString()} saved
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Warranty Protection</span>
                <span className="font-semibold text-white">
                  Lifetime Transferable
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleLockClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-6 py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition-all cursor-pointer active:scale-[0.99]"
            >
              <span>Lock Estimate &amp; Book Free Inspection</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[11px] text-zinc-400">
              Exact laser &amp; moisture quote locked in writing for 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
