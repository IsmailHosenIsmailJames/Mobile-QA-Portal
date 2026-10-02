"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Smartphone,
  Video,
  Camera,
  Layers,
  Terminal,
  Download,
  Share2,
  QrCode,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  Cpu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TestRun, TestStep } from "@/types/test-run";
import VideoPlayer from "./VideoPlayer";
import StepChecklist from "./StepChecklist";
import ScreenshotGallery from "./ScreenshotGallery";
import LogViewer from "./LogViewer";
import QrModal from "./QrModal";

interface RunDetailClientProps {
  run: TestRun;
}

export default function RunDetailClient({ run }: RunDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"customer" | "vendor">("customer");
  const [activeStepCustomer, setActiveStepCustomer] = useState<number | undefined>(undefined);
  const [activeStepVendor, setActiveStepVendor] = useState<number | undefined>(undefined);
  const [selectedQrApp, setSelectedQrApp] = useState<"customer" | "vendor" | null>(null);

  const currentAppReport = activeTab === "customer" ? run.customerApp : run.vendorApp;

  // Prepare chapter markers for video player
  const chapters = currentAppReport.steps.map((st) => ({
    stepNumber: st.stepNumber,
    name: st.name,
    timestampSec: st.videoTimestampSec ?? 0,
  }));

  const handleJumpVideo = (timestampSec: number) => {
    if (activeTab === "customer") {
      const match = run.customerApp.steps.find((s) => s.videoTimestampSec === timestampSec);
      if (match) setActiveStepCustomer(match.stepNumber);
    } else {
      const match = run.vendorApp.steps.find((s) => s.videoTimestampSec === timestampSec);
      if (match) setActiveStepVendor(match.stepNumber);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Back Navigation Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
          <span>/</span>
          <span>Test Runs</span>
          <span>/</span>
          <span className="font-mono text-emerald-400 font-semibold">{run.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/runs/${run.id}/screenshots`}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <Camera className="h-4 w-4 text-indigo-400" />
            <span>Open Screenshot Lightbox Gallery</span>
          </Link>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. RUN REPORT HEADER                                                  */}
      {/* ===================================================================== */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                All 34 Integration Tests Passed
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-slate-400 border border-slate-700">
                Branch: {run.branch}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-slate-400 border border-slate-700">
                Commit: {run.commitHash}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {run.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              {run.commitMessage}
            </p>
          </div>

          {/* Quick APK Sideload Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedQrApp("customer")}
              className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs font-semibold text-white hover:border-emerald-500 hover:text-emerald-300 transition-all"
            >
              <QrCode className="h-4 w-4 text-emerald-400" />
              <span>Customer APK QR</span>
            </button>
            <button
              onClick={() => setSelectedQrApp("vendor")}
              className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs font-semibold text-white hover:border-amber-500 hover:text-amber-300 transition-all"
            >
              <QrCode className="h-4 w-4 text-amber-400" />
              <span>Vendor APK QR</span>
            </button>
          </div>
        </div>

        {/* Environment Specs Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 pt-5 text-xs">
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold block">Device Target</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{run.environment.device}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold block">Runner Host</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{run.environment.runnerHost}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold block">Flutter SDK</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{run.environment.flutterVersion}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold block">Total Duration</span>
            <span className="font-semibold text-emerald-400 mt-0.5 font-mono block">
              {Math.floor(run.totalDurationSeconds / 60)}m {run.totalDurationSeconds % 60}s (100% Pass)
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. TABBED APP SELECTION SWITCHER                                      */}
      {/* ===================================================================== */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab("customer")}
          className={`flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold border-b-2 transition-all ${
            activeTab === "customer"
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Customer App Flow (16 Steps)</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
            Passed
          </span>
        </button>

        <button
          onClick={() => setActiveTab("vendor")}
          className={`flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold border-b-2 transition-all ${
            activeTab === "vendor"
              ? "border-amber-500 text-amber-400 bg-amber-500/5"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Vendor App Flow (18 Steps)</span>
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono text-amber-400">
            Passed
          </span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 3. ACTIVE TAB CONTENT                                                 */}
      {/* ===================================================================== */}
      <div className="space-y-10">
        {/* Top Split View: HD Video Player & Step Checklist */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Video Player */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Video className="h-4 w-4 text-emerald-400" />
                <span>720p HD Screen Recording Replay</span>
              </h3>
              <a
                href={currentAppReport.videoUrl}
                download={currentAppReport.videoFileName}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download MP4 ({currentAppReport.videoSizeFormatted})</span>
              </a>
            </div>

            <VideoPlayer
              src={currentAppReport.videoUrl}
              title={`${currentAppReport.appName} E2E Journey`}
              chapters={chapters}
              selectedStepNumber={
                activeTab === "customer" ? activeStepCustomer : activeStepVendor
              }
              onChapterSelect={(stepNum) => {
                if (activeTab === "customer") setActiveStepCustomer(stepNum);
                else setActiveStepVendor(stepNum);
              }}
            />
          </div>

          {/* Right Column: Step Checklist with seek sync */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <StepChecklist
              steps={currentAppReport.steps}
              onJumpToVideo={handleJumpVideo}
              onStepSelect={(step) => {
                if (activeTab === "customer") setActiveStepCustomer(step.stepNumber);
                else setActiveStepVendor(step.stepNumber);
              }}
              activeStepId={
                activeTab === "customer"
                  ? currentAppReport.steps.find((s) => s.stepNumber === activeStepCustomer)?.id
                  : currentAppReport.steps.find((s) => s.stepNumber === activeStepVendor)?.id
              }
            />
          </div>
        </section>

        {/* Middle Section: Screenshot Carousel & Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Camera className="h-5 w-5 text-indigo-400" />
                <span>Captured Step Verification Screenshots</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click any screenshot to open the lightbox inspector with device framing and zoom
              </p>
            </div>
            <Link
              href={`/runs/${run.id}/screenshots`}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Full Screen Flow Inspector</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ScreenshotGallery
            steps={currentAppReport.steps}
            appName={currentAppReport.appName}
            defaultViewMode="grid"
            allowComparison={true}
          />
        </section>

        {/* Bottom Section: Raw Test Log Viewer */}
        <section className="space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>Automated Test Execution Logs</span>
          </h3>

          <LogViewer
            logs={currentAppReport.logs}
            title={`${currentAppReport.appName} Flutter Drive Execution Trace`}
          />
        </section>
      </div>

      {/* QR Modals for APK installation */}
      {selectedQrApp && (
        <QrModal
          isOpen={true}
          onClose={() => setSelectedQrApp(null)}
          title={
            selectedQrApp === "customer"
              ? run.customerApp.appName
              : run.vendorApp.appName
          }
          downloadUrl={
            selectedQrApp === "customer"
              ? run.customerApp.apkUrl
              : run.vendorApp.apkUrl
          }
          apkFileName={
            selectedQrApp === "customer"
              ? run.customerApp.apkFileName
              : run.vendorApp.apkFileName
          }
          fileSize={
            selectedQrApp === "customer"
              ? run.customerApp.apkSizeFormatted
              : run.vendorApp.apkSizeFormatted
          }
          version={`${
            selectedQrApp === "customer"
              ? run.customerApp.version
              : run.vendorApp.version
          }+1`}
        />
      )}
    </div>
  );
}
