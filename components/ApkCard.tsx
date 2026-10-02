"use client";

import { useState } from "react";
import { Download, QrCode, Smartphone, HardDrive, Hash, CheckCircle2, ShieldCheck } from "lucide-react";
import QrModal from "./QrModal";

interface ApkCardProps {
  appType: "customer_app" | "vendor_app";
  title: string;
  packageName: string;
  version: string;
  buildNumber: number;
  flavor: string;
  apkFileName: string;
  apkUrl: string;
  apkSizeFormatted: string;
  lastUpdated?: string;
  status: "passed" | "failed" | "running";
}

export default function ApkCard({
  appType,
  title,
  packageName,
  version,
  buildNumber,
  flavor,
  apkFileName,
  apkUrl,
  apkSizeFormatted,
  lastUpdated = "Latest Build",
  status,
}: ApkCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);

  const isCustomer = appType === "customer_app";
  const badgeColor = isCustomer ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20";
  const accentBorder = isCustomer ? "group-hover:border-emerald-500/40" : "group-hover:border-amber-500/40";

  return (
    <>
      <div className={`relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-slate-900 ${accentBorder} group`}>
        {/* Top Header */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isCustomer ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-white transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {packageName}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${badgeColor}`}>
                {flavor.toUpperCase()}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Verified
              </span>
            </div>
          </div>

          {/* Metadata Specs Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Version</span>
              <span className="text-slate-200 font-medium">v{version}+{buildNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">APK Package Size</span>
              <span className="text-slate-200 font-medium flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-slate-400" />
                {apkSizeFormatted}
              </span>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-800/60 mt-1 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]" title={apkFileName}>
                {apkFileName}
              </span>
              <span className="text-[10px] text-slate-500">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2 pt-3 border-t border-slate-800/80">
          <a
            href={apkUrl}
            download={apkFileName}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 active:scale-95 transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Install on Android</span>
          </a>

          <button
            onClick={() => setIsQrOpen(true)}
            title="Scan QR Code to install directly on phone"
            className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <QrCode className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* QR Modal */}
      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={title}
        downloadUrl={apkUrl}
        apkFileName={apkFileName}
        fileSize={apkSizeFormatted}
        version={`${version}+${buildNumber}`}
      />
    </>
  );
}
