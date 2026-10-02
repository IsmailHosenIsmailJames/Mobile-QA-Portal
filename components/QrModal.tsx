"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, Download, Smartphone, Terminal, ExternalLink } from "lucide-react";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  downloadUrl: string;
  apkFileName: string;
  fileSize: string;
  version: string;
}

export default function QrModal({
  isOpen,
  onClose,
  title,
  downloadUrl,
  apkFileName,
  fileSize,
  version,
}: QrModalProps) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (downloadUrl.startsWith("http")) {
        setFullUrl(downloadUrl);
      } else {
        setFullUrl(`${window.location.origin}${downloadUrl}`);
      }
    }
  }, [downloadUrl]);

  // Handle escape key
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

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close QR Modal"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-xs text-slate-400">
              v{version} • {fileSize} • Direct APK Installation
            </p>
          </div>
        </div>

        {/* High-contrast QR Container */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950/80 border border-slate-800 p-6 my-2 shadow-inner">
          <div className="rounded-xl bg-white p-4 shadow-md">
            <QRCodeSVG
              value={fullUrl || downloadUrl}
              size={210}
              level="H"
              includeMargin={false}
            />
          </div>
          <p className="mt-3 text-xs text-center text-slate-400 font-medium">
            Scan with your Android camera or barcode reader to download directly
          </p>
        </div>

        {/* URL Copy Bar */}
        <div className="mt-4">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Download URL
          </label>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700/80 px-3 py-2 text-xs">
            <input
              type="text"
              readOnly
              value={fullUrl || downloadUrl}
              className="w-full bg-transparent text-slate-300 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied</span>
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

        {/* ADB Sideload Command */}
        <div className="mt-3 rounded-lg bg-slate-950/70 border border-slate-800/80 p-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
            <Terminal className="h-3.5 w-3.5 text-slate-400" />
            <span>ADB Terminal Sideload</span>
          </div>
          <code className="text-xs text-emerald-400 font-mono select-all block break-all">
            adb install -r {apkFileName}
          </code>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-2">
          <a
            href={downloadUrl}
            download={apkFileName}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download APK File
          </a>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
