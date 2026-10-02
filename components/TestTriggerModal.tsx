"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  X,
  Smartphone,
  GitBranch,
  Server,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface TestTriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestTriggerModal({ isOpen, onClose }: TestTriggerModalProps) {
  const router = useRouter();
  const [target, setTarget] = useState<"all" | "customer_app" | "vendor_app">("all");
  const [branch, setBranch] = useState("main");
  const [deviceId, setDeviceId] = useState("emulator-5554");
  const [triggerMode, setTriggerMode] = useState<"auto" | "github_actions" | "local_runner">("auto");
  const [customMessage, setCustomMessage] = useState("Manual integration run triggered from QA Portal");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; runId?: string; message?: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/trigger-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          branch,
          deviceId,
          triggerMode,
          customMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult({
          success: true,
          runId: data.runId,
          message: data.message,
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to dispatch test runner",
        });
      }
    } catch (err: any) {
      setResult({
        success: false,
        message: err.message || "Network error while triggering test",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Play className="h-5 w-5 fill-current" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Dispatch Integration Test Suite
            </h3>
            <p className="text-xs text-slate-400">
              Trigger automated Flutter Drive tests & video recording
            </p>
          </div>
        </div>

        {result ? (
          <div className="py-4 space-y-4">
            <div
              className={`rounded-xl border p-4 ${
                result.success
                  ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                  : "bg-rose-950/30 border-rose-500/40 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                {result.success ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-rose-400" />
                )}
                <span>{result.success ? "Execution Dispatched!" : "Trigger Failed"}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{result.message}</p>
              {result.runId && (
                <div className="mt-2 text-xs font-mono text-emerald-400">
                  Run ID: {result.runId}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {result.runId && (
                <button
                  onClick={() => {
                    onClose();
                    router.push(`/runs/${result.runId}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-500"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Run Report
                </button>
              )}
              <button
                onClick={() => {
                  setResult(null);
                }}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Trigger Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTrigger} className="space-y-4 text-xs">
            {/* Target App */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">
                Target Application Suite
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "All Apps (Both)" },
                  { id: "customer_app", label: "Customer App" },
                  { id: "vendor_app", label: "Vendor App" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTarget(item.id as any)}
                    className={`rounded-xl border p-2.5 text-center transition-all ${
                      target === item.id
                        ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 font-semibold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Branch & Device */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Git Branch</label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200">
                  <GitBranch className="h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-transparent outline-none text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Device</label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200">
                  <Smartphone className="h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    className="w-full bg-transparent outline-none text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Runner Dispatch Mode */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Execution Mode / Dispatcher
              </label>
              <select
                value={triggerMode}
                onChange={(e) => setTriggerMode(e.target.value as any)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="auto">Auto-Detect (GitHub Actions if token set, else Local Webhook)</option>
                <option value="github_actions">GitHub Actions Repository Dispatch</option>
                <option value="local_runner">Local Runner Webhook (LOCAL_RUNNER_WEBHOOK_URL)</option>
              </select>
            </div>

            {/* Note / Commit Message */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Execution Note</label>
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>Dispatch Workflow</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
