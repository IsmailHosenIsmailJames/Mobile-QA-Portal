"use client";

import Link from "next/link";
import { useState } from "react";
import { Play, Sparkles, Smartphone, Layers, Upload, Terminal, ShieldCheck } from "lucide-react";
import TestTriggerModal from "./TestTriggerModal";

export default function Navbar() {
  const [isTriggerModalOpen, setIsTriggerModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    Rewardly
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                    QA Portal
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Test Artifact Hub & Release Distribution
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Layers className="h-4 w-4 text-emerald-500" />
              Dashboard
            </Link>
            <Link
              href="/runs/run-2026-10-02-001"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4 text-teal-400" />
              Latest Run
            </Link>
            <Link
              href="/runs/run-2026-10-02-001/screenshots"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Smartphone className="h-4 w-4 text-indigo-400" />
              Flow Gallery
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Device: emulator-5554</span>
            </div>

            <button
              onClick={() => setIsTriggerModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs sm:text-sm font-medium text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 active:scale-95 transition-all"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Run Tests</span>
            </button>
          </div>
        </div>
      </header>

      {/* Trigger Modal */}
      <TestTriggerModal
        isOpen={isTriggerModalOpen}
        onClose={() => setIsTriggerModalOpen(false)}
      />
    </>
  );
}
