"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Split,
  MoveHorizontal,
  Wind,
  ArrowRight,
  ArrowLeft,
  Camera,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  Phone,
  Sparkles,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Progress } from "@/components/ui/progress";

const step4Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters)."),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => val.replace(/\D/g, "").length === 10,
      "Please enter a valid 10-digit mobile phone number."
    ),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code."),
});

type Step4FormValues = z.infer<typeof step4Schema>;

export interface QualifierPreset {
  problemId?: string;
  spaceType?: string;
  urgency?: string;
  secondOpinionMode?: boolean;
  estimateSummary?: string;
  timestamp: number;
}

interface InspectionQualifierProps {
  preset?: QualifierPreset | null;
}

const iconMap = {
  Droplets,
  Split,
  MoveHorizontal,
  Wind,
};

const stepLabels = ["01 Symptom", "02 Space", "03 Photo", "04 Dispatch"];

function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function InspectionQualifier({ preset }: InspectionQualifierProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    siteConfig.qualifier.step1Options[0].id
  );
  const [spaceType, setSpaceType] = useState<string>("Unfinished Basement");
  const [urgency, setUrgency] = useState<string>("This Week");
  const [secondOpinionBanner, setSecondOpinionBanner] = useState(false);
  const [estimateBanner, setEstimateBanner] = useState<string | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const [submittedData, setSubmittedData] = useState<Step4FormValues | null>(
    null
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<Step4FormValues>({
    resolver: zodResolver(step4Schema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      zipCode: "",
    },
  });

  const watchedZip = watch("zipCode");

  useEffect(() => {
    if (!preset) return;
    setSubmittedData(null);

    if (preset.problemId) {
      setSelectedProblemId(preset.problemId);
      if (preset.problemId === "crawl-space") {
        setSpaceType("Crawl Space");
      }
      setSecondOpinionBanner(false);
      setStep(2);
    }

    if (preset.spaceType) {
      setSpaceType(preset.spaceType);
    }

    if (preset.urgency) {
      setUrgency(preset.urgency);
    }

    if (preset.estimateSummary) {
      setEstimateBanner(preset.estimateSummary);
    } else {
      setEstimateBanner(null);
    }

    if (preset.secondOpinionMode) {
      setUrgency("Just Planning / 2nd Opinion");
      setSecondOpinionBanner(true);
      setStep(2);
    }
  }, [preset]);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  }, [photoPreviewUrl]);

  const handleFileSelect = (file: File | undefined | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }
    const url = URL.createObjectURL(file);
    setPhotoFile(file);
    setPhotoPreviewUrl(url);
  };

  const handleRemovePhoto = () => {
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectedProblemObj =
    siteConfig.qualifier.step1Options.find(
      (opt) => opt.id === selectedProblemId
    ) || siteConfig.qualifier.step1Options[0];

  const handleStep1Select = (optionId: string) => {
    setSelectedProblemId(optionId);
    if (optionId === "crawl-space") {
      setSpaceType("Crawl Space");
    }
    setStep(2);
  };

  const onSubmitStep4 = (values: Step4FormValues) => {
    setSubmittedData(values);
  };

  const handleResetDemo = () => {
    setSubmittedData(null);
    handleRemovePhoto();
    resetForm();
    setSecondOpinionBanner(false);
    setEstimateBanner(null);
    setStep(1);
  };

  const isFiveDigitZip = /^\d{5}$/.test(watchedZip || "");
  const matchedCity = isFiveDigitZip
    ? siteConfig.zipToCityMap[watchedZip] ||
      (watchedZip.startsWith("43")
        ? `Central Ohio (${watchedZip})`
        : `ZIP ${watchedZip}`)
    : null;

  const progressPercentage = submittedData ? 100 : step * 25;

  return (
    <div
      id="inspection-qualifier"
      className="w-full rounded-3xl surface-elevated text-[#18181B] overflow-hidden transition-shadow"
    >
      {/* Stitch Architectural Diagnostic Header */}
      <div className="px-6 pt-6 pb-4 sm:px-7 sm:pt-7">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <span className="font-mono-spec text-[11px] font-medium uppercase tracking-widest text-zinc-400">
              {submittedData
                ? "DISPATCH CONFIRMED"
                : `STEP 0${step} / 04 • ${siteConfig.qualifier.timeEstimate.toUpperCase()}`}
            </span>
            <h2 className="font-heading text-xl sm:text-[22px] font-bold text-[#18181B] tracking-tight mt-0.5">
              {siteConfig.qualifier.headerTitle}
            </h2>
          </div>
        </div>

        <Progress
          value={progressPercentage}
          aria-label={`Inspection qualifier step ${step} of 4`}
        />

        {/* Stitch Tonal Step Tracker Pills */}
        {!submittedData && (
          <div className="grid grid-cols-4 gap-1.5 mt-3">
            {stepLabels.map((label, idx) => {
              const stepNum = (idx + 1) as 1 | 2 | 3 | 4;
              const isCurrent = step === stepNum;
              const isCompleted = step > stepNum;
              return (
                <button
                  key={label}
                  type="button"
                  disabled={stepNum > step}
                  onClick={() => stepNum < step && setStep(stepNum)}
                  className={`rounded-lg py-1 px-1.5 text-[10px] font-mono-spec font-semibold text-center truncate transition-colors ${
                    isCurrent
                      ? "bg-[#18181B] text-white"
                      : isCompleted
                      ? "bg-[#F3F2EE] text-[#1E6B4B] hover:bg-[#E6E4DD] cursor-pointer"
                      : "bg-[#F7F6F2] text-zinc-400 cursor-default"
                  }`}
                >
                  {isCompleted ? `✓ ${label.split(" ")[1]}` : label}
                </button>
              );
            })}
          </div>
        )}

        {/* Soft Surface Context Chip on Steps 2-4 */}
        {!submittedData && step > 1 && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-[#F3F2EE] px-3.5 py-2 text-xs">
            <div className="flex items-center gap-2 font-medium text-zinc-700 truncate">
              <CheckCircle2 className="h-4 w-4 text-[#1E6B4B] shrink-0" />
              <span className="truncate">
                Symptom:{" "}
                <strong className="font-semibold text-[#18181B]">
                  {selectedProblemObj.label}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#C85A32] hover:underline cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>
        )}

        {!submittedData && secondOpinionBanner && (
          <div className="mt-2.5 flex items-center gap-2 rounded-2xl bg-[#C85A32]/10 px-3.5 py-2 text-xs font-medium text-[#18181B]">
            <Sparkles className="h-4 w-4 text-[#C85A32] shrink-0" />
            <span>
              2nd Opinion Mode: Attach your competitor quote in Step 3.
            </span>
          </div>
        )}

        {!submittedData && estimateBanner && (
          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-2xl bg-[#1E6B4B]/10 px-3.5 py-2 text-xs font-medium text-[#18181B]">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="h-4 w-4 text-[#1E6B4B] shrink-0" />
              <span className="truncate">
                Estimate Attached:{" "}
                <strong className="font-semibold">{estimateBanner}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6 pt-1 sm:px-7 sm:pb-7">
        <AnimatePresence mode="wait">
          {submittedData ? (
            /* POST-SUBMIT STATE — Simulated Instant SMS Confirmation Mockup */
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              aria-live="polite"
              className="space-y-5"
            >
              <div className="rounded-2xl bg-[#1E6B4B]/10 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#1E6B4B] shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="font-heading text-base font-bold text-[#1E6B4B]">
                    Inspection Request Logged (Columbus Desk Notified)
                  </p>
                  <p className="text-zinc-600 text-xs sm:text-sm">
                    <strong className="text-[#18181B]">
                      {selectedProblemObj.label}
                    </strong>{" "}
                    • {spaceType} ({urgency}) • ZIP{" "}
                    <strong className="text-[#18181B]">
                      {submittedData.zipCode}
                    </strong>
                  </p>
                  {estimateBanner && (
                    <p className="text-xs font-medium text-[#1E6B4B] pt-0.5">
                      Locked Scope: {estimateBanner}
                    </p>
                  )}
                </div>
              </div>

              {photoPreviewUrl && (
                <div className="flex items-center gap-3 rounded-2xl bg-[#F3F2EE] p-3">
                  <img
                    src={photoPreviewUrl}
                    alt="Uploaded basement issue preview"
                    className="h-14 w-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-[#18181B]">
                      ✓ Diagnostic Photo Attached for Mark Callahan
                    </p>
                    <p className="text-zinc-500 truncate max-w-[220px]">
                      {photoFile?.name || "jobsite-photo.jpg"}
                    </p>
                  </div>
                </div>
              )}

              {/* Realistic iPhone SMS Preview Card */}
              <div className="rounded-2xl bg-[#F3F2EE] p-4">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#18181B] text-white flex items-center justify-center">
                      <MessageSquare className="h-3.5 w-3.5 text-[#C85A32]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#18181B] leading-none">
                        Ironridge Dispatch • Just Now
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        SMS to {submittedData.phone}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1E6B4B]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#1E6B4B]">
                    ● Delivered
                  </span>
                </div>

                <div className="rounded-2xl rounded-tl-xs bg-white p-4 text-sm text-zinc-700 shadow-2xs leading-relaxed">
                  &ldquo;Hi{" "}
                  <strong className="text-[#18181B]">
                    {submittedData.fullName.trim().split(/\s+/)[0]}
                  </strong>
                  , this is Mark Callahan&apos;s team at Ironridge Foundation.
                  We got your{" "}
                  <strong className="text-[#18181B]">
                    {selectedProblemObj.label}
                  </strong>{" "}
                  request for ZIP{" "}
                  <strong className="text-[#18181B]">
                    {submittedData.zipCode}
                  </strong>
                  . A licensed specialist (not a call center) will call you
                  within 15 minutes to lock in your free inspection window. Need
                  us sooner? Reply <strong>URGENT</strong> or call{" "}
                  <a
                    href={siteConfig.company.phoneHref}
                    className="font-semibold text-[#C85A32] underline"
                  >
                    {siteConfig.company.phoneDisplay}
                  </a>
                  .&rdquo;
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <a
                  href={siteConfig.company.phoneHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#18181B] hover:bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C85A32]" />
                  <span>Call Dispatch: {siteConfig.company.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-[#18181B] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Demo Form</span>
                </button>
              </div>
            </motion.div>
          ) : step === 1 ? (
            /* STEP 1 — Stitch Tonal Option Tiles with Hover Conduit Accent Bar */
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3.5"
            >
              <div>
                <h3
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="qualifier-step-heading font-heading text-base sm:text-lg font-semibold text-[#18181B] focus:outline-none"
                >
                  {siteConfig.qualifier.step1Title}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Select what you&apos;re seeing to start your diagnostic:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {siteConfig.qualifier.step1Options.map((option) => {
                  const IconComponent = iconMap[option.iconName];
                  const isSelected = selectedProblemId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleStep1Select(option.id)}
                      className={`group relative overflow-hidden w-full text-left rounded-2xl p-4 transition-all duration-200 flex items-center justify-between gap-3.5 cursor-pointer ${
                        isSelected
                          ? "bg-[#F2EFE9] shadow-2xs"
                          : "bg-[#F7F6F2] hover:bg-[#EFECE6]"
                      }`}
                    >
                      {/* Stitch Hover Conduit Left Accent Bar */}
                      <span
                        className={`absolute left-0 top-0 bottom-0 w-1 bg-[#C85A32] transition-transform duration-200 ${
                          isSelected
                            ? "translate-x-0"
                            : "-translate-x-full group-hover:translate-x-0"
                        }`}
                        aria-hidden="true"
                      />

                      <div className="flex items-start gap-3.5">
                        <div
                          className={`mt-0.5 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#C85A32] text-white"
                              : "bg-white text-[#18181B] group-hover:bg-[#18181B] group-hover:text-white shadow-2xs"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-heading text-[15px] font-semibold text-[#18181B]">
                            {option.label}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                            {option.shortDesc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-[#C85A32] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  );
                })}
              </div>

              <p className="text-center text-xs text-zinc-500 pt-1">
                {siteConfig.qualifier.honestNote}
              </p>
            </motion.div>
          ) : step === 2 ? (
            /* STEP 2 — Space Type & Urgency */
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="qualifier-step-heading font-heading text-base sm:text-lg font-semibold text-[#18181B] focus:outline-none"
                >
                  {siteConfig.qualifier.step2Title}
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-[#18181B] cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold text-zinc-500">
                  Where is the issue located?
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {siteConfig.qualifier.spaceTypes.map((type) => {
                    const active = spaceType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSpaceType(type)}
                        aria-pressed={active}
                        className={`rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${
                          active
                            ? "bg-[#18181B] text-white shadow-xs"
                            : "bg-[#F7F6F2] text-[#18181B] hover:bg-[#EFECE6]"
                        }`}
                      >
                        <span>{type}</span>
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-[#C85A32] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-xs font-semibold text-zinc-500">
                  How soon do you want a specialist?
                </legend>
                <div className="grid grid-cols-1 gap-2">
                  {siteConfig.qualifier.urgencyLevels.map((level) => {
                    const active = urgency === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setUrgency(level)}
                        aria-pressed={active}
                        className={`rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? "bg-[#18181B] text-white shadow-xs"
                            : "bg-[#F7F6F2] text-[#18181B] hover:bg-[#EFECE6]"
                        }`}
                      >
                        <span>{level}</span>
                        {active && (
                          <span className="text-xs font-medium text-zinc-300">
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-5 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : step === 3 ? (
            /* STEP 3 — Optional Photo Upload */
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="qualifier-step-heading font-heading text-base sm:text-lg font-semibold text-[#18181B] focus:outline-none"
                  >
                    {siteConfig.qualifier.step3Title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {siteConfig.qualifier.step3Helper}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-[#18181B] cursor-pointer shrink-0"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  id="jobsite-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  className="visually-hidden"
                />

                {!photoPreviewUrl ? (
                  <label
                    htmlFor="jobsite-photo-upload"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(false);
                      handleFileSelect(e.dataTransfer.files?.[0]);
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-colors cursor-pointer ${
                      isDraggingOver
                        ? "border-[#C85A32] bg-[#C85A32]/5"
                        : "border-zinc-300 bg-[#F7F6F2] hover:bg-[#EFECE6]"
                    }`}
                  >
                    <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-[#18181B] shadow-2xs mb-2.5">
                      <Camera className="h-5 w-5 text-[#C85A32]" />
                    </div>
                    <p className="text-sm font-semibold text-[#18181B]">
                      Tap to Upload a Photo or Competitor Quote
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      JPG, PNG, or HEIC from your phone or computer
                    </p>
                  </label>
                ) : (
                  <div className="rounded-2xl bg-[#1E6B4B]/10 p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={photoPreviewUrl}
                        alt="Uploaded basement issue preview"
                        className="h-14 w-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E6B4B]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Attached for Mark Callahan
                        </span>
                        <p className="text-xs font-medium text-[#18181B] truncate mt-0.5">
                          {photoFile?.name}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      aria-label="Remove uploaded photo"
                      className="inline-flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="w-full flex-1 flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer"
                >
                  <span>
                    {photoPreviewUrl
                      ? "Continue With Photo →"
                      : "Final Step: Inspection Window →"}
                  </span>
                </button>
                {!photoPreviewUrl && (
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="w-full sm:w-auto rounded-full bg-[#F3F2EE] hover:bg-[#E7E5DE] px-4 py-3.5 text-xs font-semibold text-zinc-700 transition-colors cursor-pointer"
                  >
                    {siteConfig.qualifier.step3SkipLabel}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            /* STEP 4 — Stitch Animated Focus Conduit Inputs */
            <motion.form
              key="step4"
              onSubmit={handleSubmit(onSubmitStep4)}
              noValidate
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className="qualifier-step-heading font-heading text-base sm:text-lg font-semibold text-[#18181B] focus:outline-none"
                >
                  {siteConfig.qualifier.step4Title}
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-[#18181B] cursor-pointer shrink-0"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="qualifier-fullName"
                  className="block text-xs font-semibold text-zinc-600"
                >
                  Full Name{" "}
                  <span aria-hidden="true" className="text-[#C85A32]">
                    *
                  </span>
                </label>
                <div className="relative group overflow-hidden rounded-xl">
                  <input
                    id="qualifier-fullName"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    placeholder="David Henderson"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    {...register("fullName")}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-base font-medium text-[#18181B] placeholder:text-zinc-400 focus:outline-none transition-all ${
                      errors.fullName
                        ? "bg-red-50/50 ring-1 ring-red-500"
                        : "bg-[#F7F6F2] focus:bg-[#F3F2EE]"
                    }`}
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-[#C85A32] transition-all duration-300 group-focus-within:w-full"
                    aria-hidden="true"
                  />
                </div>
                {errors.fullName && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="qualifier-phone"
                    className="block text-xs font-semibold text-zinc-600"
                  >
                    Mobile Phone{" "}
                    <span aria-hidden="true" className="text-[#C85A32]">
                      *
                    </span>
                  </label>
                  <div className="relative group overflow-hidden rounded-xl">
                    <input
                      id="qualifier-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="next"
                      placeholder="(614) 555-0199"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      {...register("phone", {
                        onChange: (e) => {
                          setValue("phone", formatPhoneInput(e.target.value), {
                            shouldValidate: false,
                          });
                        },
                      })}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-base font-medium text-[#18181B] placeholder:text-zinc-400 focus:outline-none transition-all ${
                        errors.phone
                          ? "bg-red-50/50 ring-1 ring-red-500"
                          : "bg-[#F7F6F2] focus:bg-[#F3F2EE]"
                      }`}
                    />
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-[#C85A32] transition-all duration-300 group-focus-within:w-full"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.phone && (
                    <p
                      id="phone-error"
                      role="alert"
                      className="text-xs font-medium text-red-600"
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="qualifier-zipCode"
                    className="block text-xs font-semibold text-zinc-600"
                  >
                    5-Digit ZIP Code{" "}
                    <span aria-hidden="true" className="text-[#C85A32]">
                      *
                    </span>
                  </label>
                  <div className="relative group overflow-hidden rounded-xl">
                    <input
                      id="qualifier-zipCode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      pattern="\d{5}"
                      maxLength={5}
                      enterKeyHint="done"
                      placeholder="43017"
                      aria-invalid={!!errors.zipCode}
                      aria-describedby="zip-hint zip-error"
                      {...register("zipCode", {
                        onChange: (e) => {
                          const digits = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 5);
                          setValue("zipCode", digits, {
                            shouldValidate: digits.length === 5,
                          });
                        },
                      })}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-base font-medium text-[#18181B] placeholder:text-zinc-400 focus:outline-none transition-all ${
                        errors.zipCode
                          ? "bg-red-50/50 ring-1 ring-red-500"
                          : "bg-[#F7F6F2] focus:bg-[#F3F2EE]"
                      }`}
                    />
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-[#C85A32] transition-all duration-300 group-focus-within:w-full"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.zipCode && (
                    <p
                      id="zip-error"
                      role="alert"
                      className="text-xs font-medium text-red-600"
                    >
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div id="zip-hint" aria-live="polite">
                {matchedCity ? (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#1E6B4B]/10 px-3 py-2 text-xs font-semibold text-[#1E6B4B]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>
                        ✓ {matchedCity} ({watchedZip}) Covered • Glacial Clay
                        Zone
                      </span>
                    </div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider bg-white/80 text-[#1E6B4B] px-2 py-0.5 rounded-full">
                      Next Slot: Tomorrow
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">
                    Serving Columbus, Dublin, Westerville, Upper Arlington,
                    Powell &amp; Central Ohio.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04A25] px-6 py-4 text-base font-semibold text-white shadow-md transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
              >
                <span>{siteConfig.qualifier.submitButtonLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-[#1E6B4B] shrink-0" />
                <span>{siteConfig.qualifier.deriskingMicroCopy}</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
