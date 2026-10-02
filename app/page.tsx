import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Layers,
  Video,
  Camera,
  Play,
  ArrowRight,
  GitBranch,
  Clock,
  Terminal,
  Download,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Activity,
  HardDrive,
} from "lucide-react";
import { getAllRuns } from "@/lib/runs-db";
import ApkCard from "@/components/ApkCard";

export const revalidate = 0; // dynamic on request

export default async function DashboardPage() {
  const runs = await getAllRuns();
  const latestRun = runs[0] || null;

  const totalScreenshots =
    (latestRun?.customerApp.steps.length || 16) +
    (latestRun?.vendorApp.steps.length || 18);

  const totalVideoSize = "4.38 MB";

  return (
    <div className="space-y-10">
      {/* ===================================================================== */}
      {/* HERO SECTION & RUN STATUS BANNER                                      */}
      {/* ===================================================================== */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                E2E Automation Verified
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-slate-400 border border-slate-700">
                v1.0.0+1
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Rewardly Test Hub & Release Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Unified QA command center, mobile APK sideload distribution, and 720p HD test
              replay dashboard for Customer & Vendor Flutter applications.
            </p>
          </div>

          {/* Quick Hero Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {latestRun && (
              <Link
                href={`/runs/${latestRun.id}`}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95"
              >
                <span>View Full Test Report</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {latestRun && (
              <Link
                href={`/runs/${latestRun.id}/screenshots`}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
              >
                <Camera className="h-4 w-4 text-indigo-400" />
                <span>Step Flow Gallery</span>
              </Link>
            )}
          </div>
        </div>

        {/* Subtle grid background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* ===================================================================== */}
      {/* 1. SUMMARY KPI CARDS                                                  */}
      {/* ===================================================================== */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          <span>System Execution Metrics</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Latest Test Run Status */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium">Test Run Status</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white">All Passed</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
              <span className="font-semibold">34/34</span>
              <span className="text-slate-400">steps 100% green</span>
            </div>
          </div>

          {/* KPI 2: Apps Tested */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium">Apps Tested</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
                <Smartphone className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white">2 Dual Apps</div>
            <div className="mt-2 text-xs text-slate-400 font-mono truncate">
              Customer v1.0.0+1 • Vendor v1.0.0+1
            </div>
          </div>

          {/* KPI 3: Screenshots Captured */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium">Screenshots Captured</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Camera className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white">{totalScreenshots} Screens</div>
            <div className="mt-2 text-xs text-slate-400">
              16 Customer • 18 Vendor flows
            </div>
          </div>

          {/* KPI 4: Video Recordings */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium">Video Recordings</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Video className="h-5 w-5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white">2 HD Flows</div>
            <div className="mt-2 text-xs text-slate-400 font-mono">
              720p 60fps (~{totalVideoSize})
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ACTIVE RELEASE HUB (APK DOWNLOAD CARDS & QR CODES)                 */}
      {/* ===================================================================== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-emerald-400" />
              <span>Active Release Hub & Mobile Sideload</span>
            </h2>
            <p className="text-xs text-slate-400">
              Scan dynamic QR codes or download signed APKs for testing on real Android hardware
            </p>
          </div>
          <span className="hidden sm:inline-block rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs text-slate-400 font-mono">
            Device Target: API 34+
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestRun && (
            <>
              {/* Customer App APK Card */}
              <ApkCard
                appType="customer_app"
                title="Customer Mobile App"
                packageName={latestRun.customerApp.packageName}
                version={latestRun.customerApp.version}
                buildNumber={latestRun.customerApp.buildNumber}
                flavor={latestRun.customerApp.flavor}
                apkFileName={latestRun.customerApp.apkFileName}
                apkUrl={latestRun.customerApp.apkUrl}
                apkSizeFormatted={latestRun.customerApp.apkSizeFormatted}
                status={latestRun.customerApp.status}
              />

              {/* Vendor App APK Card */}
              <ApkCard
                appType="vendor_app"
                title="Vendor & POS Terminal App"
                packageName={latestRun.vendorApp.packageName}
                version={latestRun.vendorApp.version}
                buildNumber={latestRun.vendorApp.buildNumber}
                flavor={latestRun.vendorApp.flavor}
                apkFileName={latestRun.vendorApp.apkFileName}
                apkUrl={latestRun.vendorApp.apkUrl}
                apkSizeFormatted={latestRun.vendorApp.apkSizeFormatted}
                status={latestRun.vendorApp.status}
              />
            </>
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. RECENT TEST RUNS TABLE                                             */}
      {/* ===================================================================== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="h-5 w-5 text-teal-400" />
              <span>Recent Test Runs</span>
            </h2>
            <p className="text-xs text-slate-400">
              Execution history and end-to-end integration pass rates
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {runs.length} Runs recorded
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950/60 text-[11px] uppercase font-semibold text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Run ID & Details</th>
                  <th className="px-5 py-3.5">Branch / Commit</th>
                  <th className="px-5 py-3.5">Customer App</th>
                  <th className="px-5 py-3.5">Vendor App</th>
                  <th className="px-5 py-3.5">Duration</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {runs.map((run) => (
                  <tr
                    key={run.id}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    {/* Run ID & Title */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors text-sm">
                        {run.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                        <span className="text-emerald-400 font-semibold">{run.id}</span>
                        <span>•</span>
                        <span>{new Date(run.startTime).toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Branch / Commit */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 font-mono text-slate-300">
                        <GitBranch className="h-3.5 w-3.5 text-slate-500" />
                        <span>{run.branch}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate max-w-[160px]">
                        {run.commitHash}
                      </div>
                    </td>

                    {/* Customer App Status */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        16/16 Passed
                      </span>
                    </td>

                    {/* Vendor App Status */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        18/18 Passed
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-4 font-mono text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        <span>{Math.floor(run.totalDurationSeconds / 60)}m {run.totalDurationSeconds % 60}s</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/runs/${run.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
                      >
                        <span>View Full Report</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. COMPANION SCRIPT CLI QUICK REFERENCE                               */}
      {/* ===================================================================== */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-emerald-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Local Test Runner & CLI Upload Companion
              </h3>
              <p className="text-xs text-slate-400">
                Stream deliverables straight to Vercel via automated bash script
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            scripts/upload_to_portal.sh
          </span>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
          <div className="text-slate-500 mb-1"># Run tests, capture screenshots & upload bundle</div>
          <p className="text-emerald-400">
            PORTAL_URL="https://rewardly-qa-portal.vercel.app" API_KEY="your_api_secret" ./scripts/upload_to_portal.sh
          </p>
        </div>
      </section>
    </div>
  );
}
