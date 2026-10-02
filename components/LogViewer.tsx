"use client";

import { useState } from "react";
import { Terminal, Search, Copy, Check, Filter, ChevronDown, ChevronRight } from "lucide-react";

interface LogViewerProps {
  logs: string[];
  title?: string;
}

export default function LogViewer({ logs, title = "Raw Test Execution Logs" }: LogViewerProps) {
  const [filterText, setFilterText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [logLevel, setLogLevel] = useState<"all" | "step" | "info" | "success">("all");

  const filteredLogs = logs.filter((log) => {
    const matchesText = log.toLowerCase().includes(filterText.toLowerCase());
    if (!matchesText) return false;
    if (logLevel === "all") return true;
    if (logLevel === "step") return log.includes("[STEP");
    if (logLevel === "info") return log.includes("[INFO]");
    if (logLevel === "success") return log.includes("[SUCCESS]") || log.includes("passed");
    return true;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(logs.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLogLineStyle = (line: string) => {
    if (line.includes("[SUCCESS]") || line.includes("passed")) {
      return "text-emerald-400 font-semibold";
    }
    if (line.includes("[STEP")) {
      return "text-indigo-300 font-medium";
    }
    if (line.includes("ERROR") || line.includes("FAILED")) {
      return "text-rose-400 font-bold bg-rose-950/20";
    }
    if (line.includes("[INFO]")) {
      return "text-cyan-400";
    }
    return "text-slate-300";
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Mac-style window dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-sans font-semibold text-xs">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>{title}</span>
            <span className="text-slate-500 text-[11px] font-mono">({logs.length} lines)</span>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-950 border border-slate-700/80 px-2.5 py-1 text-xs">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-28 sm:w-40 bg-transparent text-slate-200 placeholder-slate-500 outline-none text-xs"
            />
          </div>

          {/* Level Filter */}
          <div className="hidden sm:flex items-center rounded-lg bg-slate-950 border border-slate-700/80 p-0.5 text-[11px]">
            {(["all", "step", "info", "success"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLogLevel(lvl)}
                className={`px-2 py-0.5 rounded capitalize ${
                  logLevel === lvl
                    ? "bg-slate-800 text-emerald-400 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Log Content Area */}
      <div className="p-4 max-h-[380px] overflow-y-auto space-y-1 select-text scrollbar-thin">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-500 text-center py-8">
            No log lines matching "{filterText}"
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 hover:bg-slate-900/60 px-1 py-0.5 rounded">
              <span className="text-slate-600 select-none text-[11px] w-8 text-right shrink-0">
                {index + 1}
              </span>
              <span className={`break-all ${getLogLineStyle(log)}`}>{log}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
