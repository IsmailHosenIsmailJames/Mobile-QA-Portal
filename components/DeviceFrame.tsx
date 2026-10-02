"use client";

import { ReactNode } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface DeviceFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
  className?: string;
  theme?: "dark" | "titanium";
}

export default function DeviceFrame({
  children,
  showStatusBar = true,
  className = "",
  theme = "dark",
}: DeviceFrameProps) {
  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-center rounded-[44px] p-3 shadow-2xl transition-all ${
        theme === "titanium"
          ? "bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-4 border-slate-600/60"
          : "bg-slate-900 border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
      } ${className}`}
    >
      {/* Outer Shell Bezel */}
      <div className="relative w-full overflow-hidden rounded-[36px] bg-black">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 z-30 -translate-x-1/2 flex items-center justify-between w-28 h-5 rounded-full bg-black border border-white/10 px-2 shadow-inner">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-900/90 border border-slate-800"></div>
          <div className="h-2 w-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
        </div>

        {/* Simulated Mobile Status Bar */}
        {showStatusBar && (
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-semibold text-white/90 drop-shadow-md select-none pointer-events-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-90">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <div className="relative w-full overflow-hidden flex items-center justify-center bg-slate-950">
          {children}
        </div>

        {/* Simulated Bottom Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 w-32 h-1 rounded-full bg-white/40 pointer-events-none"></div>
      </div>
    </div>
  );
}
