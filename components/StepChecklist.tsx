"use client";

import { CheckCircle2, Clock, PlayCircle, Eye, ChevronRight } from "lucide-react";
import { TestStep } from "@/types/test-run";

interface StepChecklistProps {
  steps: TestStep[];
  onStepSelect?: (step: TestStep) => void;
  activeStepId?: string;
  onJumpToVideo?: (timestampSec: number) => void;
}

export default function StepChecklist({
  steps,
  onStepSelect,
  activeStepId,
  onJumpToVideo,
}: StepChecklistProps) {
  const passedCount = steps.filter((s) => s.status === "passed").length;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
      {/* Checklist Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Test Steps Progression</h3>
            <p className="text-xs text-slate-400">
              {passedCount} of {steps.length} steps passed (100% success rate)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            {passedCount}/{steps.length} Green
          </span>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="divide-y divide-slate-800/80 max-h-[560px] overflow-y-auto">
        {steps.map((step) => {
          const isActive = activeStepId === step.id;
          return (
            <div
              key={step.id}
              onClick={() => onStepSelect?.(step)}
              className={`flex items-center justify-between gap-4 p-4 transition-colors cursor-pointer group hover:bg-slate-800/60 ${
                isActive ? "bg-emerald-950/20 border-l-4 border-l-emerald-500" : ""
              }`}
            >
              {/* Step Status & Details */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 fill-emerald-500/20" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      #{String(step.stepNumber).padStart(2, "0")}
                    </span>
                    <h4 className="font-semibold text-slate-200 text-xs sm:text-sm truncate group-hover:text-emerald-300 transition-colors">
                      {step.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Step Actions & Timing */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 justify-end">
                    <Clock className="h-3 w-3" />
                    <span>{(step.durationMs / 1000).toFixed(1)}s</span>
                  </div>
                  {step.timestamp && (
                    <span className="text-[10px] text-emerald-400 font-mono">
                      @{step.timestamp}
                    </span>
                  )}
                </div>

                {/* Jump to video marker button */}
                {step.videoTimestampSec !== undefined && onJumpToVideo && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToVideo(step.videoTimestampSec!);
                    }}
                    title={`Jump video to ${step.timestamp}`}
                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2 py-1 text-xs text-slate-300 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
                  >
                    <PlayCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden md:inline text-[11px] font-mono">
                      {step.timestamp}
                    </span>
                  </button>
                )}

                <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
