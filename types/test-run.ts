export interface TestStep {
  stepNumber: number;
  id: string;
  name: string;
  description: string;
  status: "passed" | "failed" | "skipped";
  durationMs: number;
  timestamp?: string; // Video chapter timestamp in mm:ss or seconds
  videoTimestampSec?: number;
  screenshotFileName?: string;
  screenshotUrl?: string;
  logOutput?: string;
  tags?: string[];
}

export interface AppFlowReport {
  appType: "customer_app" | "vendor_app";
  appName: string;
  packageName: string;
  version: string;
  buildNumber: number;
  flavor: "debug" | "release" | "profile";
  apkFileName: string;
  apkUrl: string;
  apkSizeFormatted: string;
  apkSizeBytes: number;
  videoFileName: string;
  videoUrl: string;
  videoSizeFormatted: string;
  videoSizeBytes: number;
  status: "passed" | "failed" | "running";
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  durationSeconds: number;
  steps: TestStep[];
  logs: string[];
}

export interface TestRun {
  id: string;
  title: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  author: string;
  triggerType: "github_action" | "local_cli" | "manual_dashboard" | "scheduled";
  environment: {
    os: string;
    device: string; // e.g. "Pixel 8 Pro (API 34 / emulator-5554)"
    flutterVersion: string;
    dartVersion: string;
    runnerHost: string;
  };
  startTime: string;
  endTime: string;
  totalDurationSeconds: number;
  status: "passed" | "failed" | "running";
  customerApp: AppFlowReport;
  vendorApp: AppFlowReport;
  manifestUrl?: string;
  bundleZipUrl?: string;
}

export interface UploadManifest {
  runId?: string;
  title?: string;
  branch?: string;
  commitHash?: string;
  commitMessage?: string;
  author?: string;
  environment?: {
    os?: string;
    device?: string;
    flutterVersion?: string;
    dartVersion?: string;
    runnerHost?: string;
  };
  customerApp?: Partial<AppFlowReport>;
  vendorApp?: Partial<AppFlowReport>;
}
