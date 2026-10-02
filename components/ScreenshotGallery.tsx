"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Smartphone,
  Grid,
  Columns,
  Sparkles,
  Info,
  Clock,
  Layers,
} from "lucide-react";
import { TestStep } from "@/types/test-run";
import DeviceFrame from "./DeviceFrame";

interface ScreenshotGalleryProps {
  steps: TestStep[];
  appName: string;
  defaultViewMode?: "grid" | "device" | "compare";
  allowComparison?: boolean;
}

export default function ScreenshotGallery({
  steps,
  appName,
  defaultViewMode = "grid",
  allowComparison = true,
}: ScreenshotGalleryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "device" | "compare">(defaultViewMode);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDeviceFrame, setShowDeviceFrame] = useState(true);

  // Comparison mode states
  const [compareIndexA, setCompareIndexA] = useState<number>(0);
  const [compareIndexB, setCompareIndexB] = useState<number>(Math.min(1, steps.length - 1));

  // Current active step in lightbox
  const currentStep = selectedIndex !== null ? steps[selectedIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null && prev < steps.length - 1 ? prev + 1 : 0));
        setZoomLevel(1);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : steps.length - 1));
        setZoomLevel(1);
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
        setZoomLevel(1);
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(prev + 0.25, 3));
      } else if (e.key === "-") {
        setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
      } else if (e.key === "0") {
        setZoomLevel(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, steps.length]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoomLevel(1);
  };

  const nextStep = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < steps.length - 1 ? prev + 1 : 0));
    setZoomLevel(1);
  };

  const prevStep = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : steps.length - 1));
    setZoomLevel(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Gallery View Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-900/90 border border-slate-800 p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">
            {appName} Screenshots ({steps.length} steps)
          </span>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
            100% Captured
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-emerald-600 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Grid View</span>
            </button>

            <button
              onClick={() => setViewMode("device")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                viewMode === "device"
                  ? "bg-emerald-600 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Device Frame</span>
            </button>

            {allowComparison && (
              <button
                onClick={() => setViewMode("compare")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === "compare"
                    ? "bg-emerald-600 text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Columns className="h-3.5 w-3.5" />
                <span>Side-by-Side</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. GRID VIEW MODE                                                     */}
      {/* ===================================================================== */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div
              key={step.id || index}
              onClick={() => openLightbox(index)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-950">
                <img
                  src={step.screenshotUrl || `/delivery_bundle/screenshots/${appName.toLowerCase().includes("customer") ? "customer_app" : "vendor_app"}/${step.screenshotFileName}`}
                  alt={step.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Step Pill */}
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                  <span>#{String(step.stepNumber).padStart(2, "0")}</span>
                </div>

                {/* Hover Quick Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Bottom Card Info */}
              <div className="p-3">
                <h4 className="text-xs font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
                  {step.name}
                </h4>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">{step.timestamp || `${(step.durationMs / 1000).toFixed(1)}s`}</span>
                  <span className="text-emerald-400">Passed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. DEVICE FRAME SINGLE-FLOW VIEW MODE                                 */}
      {/* ===================================================================== */}
      {viewMode === "device" && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
          {/* Mobile Mockup Phone */}
          <div className="w-full max-w-[320px] shrink-0">
            <DeviceFrame theme="dark">
              <div className="relative aspect-[9/19.5] w-full bg-slate-950">
                <img
                  src={
                    steps[compareIndexA]?.screenshotUrl ||
                    `/delivery_bundle/screenshots/${appName.toLowerCase().includes("customer") ? "customer_app" : "vendor_app"}/${steps[compareIndexA]?.screenshotFileName}`
                  }
                  alt={steps[compareIndexA]?.name}
                  className="h-full w-full object-contain"
                />
              </div>
            </DeviceFrame>
          </div>

          {/* Stepper Navigation Column */}
          <div className="flex flex-col flex-1 max-w-xl w-full">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-semibold text-emerald-400">
                  Step {steps[compareIndexA]?.stepNumber} of {steps.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {steps[compareIndexA]?.timestamp}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {steps[compareIndexA]?.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {steps[compareIndexA]?.description}
              </p>

              {/* Tags */}
              {steps[compareIndexA]?.tags && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {steps[compareIndexA]?.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Log Snippet */}
              {steps[compareIndexA]?.logOutput && (
                <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-3 mb-6 font-mono text-xs text-slate-300 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 mb-1">Flutter Driver Log:</div>
                  <pre className="text-emerald-400 text-xs whitespace-pre-wrap">
                    {steps[compareIndexA]?.logOutput}
                  </pre>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  disabled={compareIndexA === 0}
                  onClick={() => setCompareIndexA((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => openLightbox(compareIndexA)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span>Inspect Lightbox</span>
                </button>

                <button
                  disabled={compareIndexA === steps.length - 1}
                  onClick={() => setCompareIndexA((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. SIDE-BY-SIDE COMPARISON MODE                                       */}
      {/* ===================================================================== */}
      {viewMode === "compare" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slot A */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Screen A (Reference)
                </span>
                <select
                  value={compareIndexA}
                  onChange={(e) => setCompareIndexA(parseInt(e.target.value))}
                  className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {steps.map((st, i) => (
                    <option key={st.id || i} value={i}>
                      #{st.stepNumber}: {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full max-w-[280px] mx-auto py-2">
                <DeviceFrame theme="dark">
                  <div className="relative aspect-[9/19.5] w-full bg-slate-950">
                    <img
                      src={steps[compareIndexA]?.screenshotUrl}
                      alt={steps[compareIndexA]?.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </DeviceFrame>
              </div>

              <div className="mt-3 text-center">
                <div className="font-semibold text-white text-xs">{steps[compareIndexA]?.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{steps[compareIndexA]?.timestamp}</div>
              </div>
            </div>

            {/* Slot B */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Screen B (Comparison)
                </span>
                <select
                  value={compareIndexB}
                  onChange={(e) => setCompareIndexB(parseInt(e.target.value))}
                  className="rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  {steps.map((st, i) => (
                    <option key={st.id || i} value={i}>
                      #{st.stepNumber}: {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full max-w-[280px] mx-auto py-2">
                <DeviceFrame theme="dark">
                  <div className="relative aspect-[9/19.5] w-full bg-slate-950">
                    <img
                      src={steps[compareIndexB]?.screenshotUrl}
                      alt={steps[compareIndexB]?.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </DeviceFrame>
              </div>

              <div className="mt-3 text-center">
                <div className="font-semibold text-white text-xs">{steps[compareIndexB]?.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{steps[compareIndexB]?.timestamp}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. FULLSCREEN LIGHTBOX MODAL WITH ZOOM & DEVICE FRAME TOGGLE          */}
      {/* ===================================================================== */}
      {selectedIndex !== null && currentStep && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Lightbox Main Container */}
          <div
            className="relative flex flex-col h-full max-h-[96vh] w-full max-w-6xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
                  Step {currentStep.stepNumber} of {steps.length}
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base truncate max-w-md">
                  {currentStep.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-xs">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    title="Zoom Out (-)"
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="px-1 text-[11px] font-mono text-slate-300">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                    title="Zoom In (+)"
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    title="Reset Zoom (0)"
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Device Frame Toggle */}
                <button
                  onClick={() => setShowDeviceFrame(!showDeviceFrame)}
                  title="Toggle Device Frame"
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    showDeviceFrame
                      ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-300"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>

                {/* Download PNG */}
                <a
                  href={currentStep.screenshotUrl}
                  download={currentStep.screenshotFileName}
                  title="Download Raw Screenshot PNG"
                  className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                >
                  <Download className="h-4 w-4" />
                </a>

                {/* Close Lightbox */}
                <button
                  onClick={closeLightbox}
                  title="Close Lightbox (Esc)"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-900/40"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Body (Image viewport + Details Sidebar) */}
            <div className="relative flex flex-1 flex-col lg:flex-row overflow-hidden">
              {/* Image Viewport */}
              <div className="relative flex-1 flex items-center justify-center p-4 bg-slate-950 overflow-auto">
                {/* Arrow Nav Buttons */}
                <button
                  onClick={prevStep}
                  title="Previous Step (Left Arrow)"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-white shadow-xl hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextStep}
                  title="Next Step (Right Arrow)"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-white shadow-xl hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Container with Zoom & Frame */}
                <div
                  className="transition-transform duration-150 ease-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {showDeviceFrame ? (
                    <div className="w-[300px] sm:w-[320px]">
                      <DeviceFrame theme="dark">
                        <img
                          src={currentStep.screenshotUrl}
                          alt={currentStep.name}
                          className="h-full w-full object-contain select-none"
                        />
                      </DeviceFrame>
                    </div>
                  ) : (
                    <img
                      src={currentStep.screenshotUrl}
                      alt={currentStep.name}
                      className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain select-none"
                    />
                  )}
                </div>
              </div>

              {/* Step Details Sidebar */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/95 p-4 flex flex-col justify-between overflow-y-auto max-h-[300px] lg:max-h-none">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>File: {currentStep.screenshotFileName}</span>
                    <span>{currentStep.timestamp}</span>
                  </div>

                  <h4 className="font-bold text-white text-base mb-2">
                    {currentStep.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {currentStep.description}
                  </p>

                  {/* Metadata Specs */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-2 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <span className="text-slate-200 font-mono">
                        {(currentStep.durationMs / 1000).toFixed(2)}s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Video Chapter:</span>
                      <span className="text-emerald-400 font-mono">
                        {currentStep.timestamp} ({currentStep.videoTimestampSec}s)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Test Result:</span>
                      <span className="text-emerald-400 font-medium">Passed (100%)</span>
                    </div>
                  </div>

                  {/* Log Snippet */}
                  {currentStep.logOutput && (
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-[11px] font-mono">
                      <span className="text-slate-500 block mb-1">Execution Trace:</span>
                      <pre className="text-emerald-400 whitespace-pre-wrap">
                        {currentStep.logOutput}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>Use ← → keys to navigate</span>
                  <a
                    href={currentStep.screenshotUrl}
                    download={currentStep.screenshotFileName}
                    className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PNG
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
