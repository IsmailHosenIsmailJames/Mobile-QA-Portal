"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Smartphone, Camera, Layers, CheckCircle2, Download } from "lucide-react";
import { TestRun } from "@/types/test-run";
import ScreenshotGallery from "@/components/ScreenshotGallery";

interface ScreenshotsPageClientProps {
  run: TestRun;
}

export default function ScreenshotsPageClient({ run }: ScreenshotsPageClientProps) {
  const [activeApp, setActiveApp] = useState<"customer" | "vendor">("customer");

  const currentApp = activeApp === "customer" ? run.customerApp : run.vendorApp;

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
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
          <Link
            href={`/runs/${run.id}`}
            className="text-slate-400 hover:text-white transition-colors font-mono"
          >
            {run.id}
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Screenshots Flow Gallery</span>
        </div>

        <Link
          href={`/runs/${run.id}`}
          className="rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
        >
          Back to Test Report
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Visual Inspection Suite
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Interactive Screenshot Flow Gallery
            </h1>
            <p className="text-xs text-slate-400">
              {run.title} • {run.customerApp.steps.length + run.vendorApp.steps.length} total verification steps
            </p>
          </div>

          {/* App Switcher Tabs */}
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setActiveApp("customer")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeApp === "customer"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Customer App ({run.customerApp.steps.length})</span>
            </button>

            <button
              onClick={() => setActiveApp("vendor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeApp === "vendor"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Vendor App ({run.vendorApp.steps.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Gallery Component */}
      <ScreenshotGallery
        key={activeApp}
        steps={currentApp.steps}
        appName={currentApp.appName}
        defaultViewMode="grid"
        allowComparison={true}
      />
    </div>
  );
}
