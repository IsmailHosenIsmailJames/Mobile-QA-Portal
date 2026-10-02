"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  Sparkles,
  ChevronRight,
  Clock,
} from "lucide-react";

export interface VideoChapter {
  stepNumber: number;
  name: string;
  timestampSec: number;
}

interface VideoPlayerProps {
  src: string;
  title: string;
  chapters?: VideoChapter[];
  onChapterSelect?: (stepNumber: number) => void;
  selectedStepNumber?: number;
}

export default function VideoPlayer({
  src,
  title,
  chapters = [],
  onChapterSelect,
  selectedStepNumber,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  // Sync seeking when selectedStepNumber changes from parent
  useEffect(() => {
    if (selectedStepNumber && videoRef.current && chapters.length > 0) {
      const match = chapters.find((c) => c.stepNumber === selectedStepNumber);
      if (match && match.timestampSec !== undefined) {
        videoRef.current.currentTime = match.timestampSec;
        setCurrentTime(match.timestampSec);
      }
    }
  }, [selectedStepNumber, chapters]);

  // Determine current active chapter
  const currentChapter = chapters.reduce<VideoChapter | null>((acc, curr) => {
    if (curr.timestampSec <= currentTime) {
      if (!acc || curr.timestampSec > acc.timestampSec) {
        return curr;
      }
    }
    return acc;
  }, null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const jumpToChapter = (chap: VideoChapter) => {
    if (videoRef.current) {
      videoRef.current.currentTime = chap.timestampSec;
      setCurrentTime(chap.timestampSec);
      videoRef.current.play();
      setIsPlaying(true);
      onChapterSelect?.(chap.stepNumber);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group/player"
    >
      {/* Top Banner / Current Chapter Overlay */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium truncate">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-white truncate">{title}</span>
          {currentChapter && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-emerald-400 font-mono text-[11px]">
              Step {currentChapter.stepNumber}: {currentChapter.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs shrink-0">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Video Element */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          playsInline
        />

        {/* Center Play Overlay when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label="Play Video"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/90 text-slate-950 shadow-lg shadow-emerald-500/30 hover:scale-110 hover:bg-emerald-400 active:scale-95 transition-all"
            >
              <Play className="h-8 w-8 fill-current ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Chapter Marker Scrubber Bar */}
      <div className="relative px-4 pt-3 pb-2 bg-slate-900/90 border-t border-slate-800">
        <div className="relative flex items-center">
          {/* Progress Slider */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer focus:outline-none"
          />

          {/* Timeline Chapter Markers */}
          {duration > 0 &&
            chapters.map((chap) => {
              const leftPercent = (chap.timestampSec / duration) * 100;
              const isPast = chap.timestampSec <= currentTime;
              return (
                <button
                  key={chap.stepNumber}
                  onClick={() => jumpToChapter(chap)}
                  title={`Step ${chap.stepNumber}: ${chap.name} (${formatTime(chap.timestampSec)})`}
                  style={{ left: `${leftPercent}%` }}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-1.5 rounded-sm transition-all hover:scale-150 ${
                    isPast
                      ? "bg-emerald-400 ring-2 ring-emerald-500/50"
                      : "bg-slate-400/80 hover:bg-white"
                  }`}
                />
              );
            })}
        </div>

        {/* Control Bar Actions */}
        <div className="mt-3 flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.max(0, currentTime - 5);
                }
              }}
              title="Rewind 5s"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Volume control */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <span className="text-xs font-mono text-slate-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Rate Toggle */}
            <div className="flex items-center gap-1 rounded-lg bg-slate-800/80 p-0.5 text-xs">
              {[1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateChange(rate)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    playbackRate === rate
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle Fullscreen"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Quick Jump Drawer */}
      {chapters.length > 0 && (
        <div className="border-t border-slate-800 bg-slate-950/90 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
              Interactive Chapter Markers ({chapters.length} Steps)
            </span>
            <span className="text-[11px] text-emerald-400">Click step to jump video</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {chapters.map((chap) => {
              const isActive = currentChapter?.stepNumber === chap.stepNumber;
              return (
                <button
                  key={chap.stepNumber}
                  onClick={() => jumpToChapter(chap)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-medium shadow-sm"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="font-mono text-[10px] text-slate-500">
                    {formatTime(chap.timestampSec)}
                  </span>
                  <span>
                    #{chap.stepNumber} {chap.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
