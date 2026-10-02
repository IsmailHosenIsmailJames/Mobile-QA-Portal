# Rewardly Test Hub & Release Portal

A dedicated, production-grade mobile QA platform, APK distribution hub, and automated test reporting dashboard built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Vercel Blob / Cloud Storage**.

Tailored for the Rewardly multi-app ecosystem:
- **Customer App** (`com.rolality.customer_app`)
- **Vendor & POS App** (`com.rolality.vendor_app`)

---

## 🌟 Key Features

1. **APK Sideload & Distribution**:
   - Direct download links for customer and vendor debug/release APKs.
   - High-contrast **dynamic QR codes** rendered with `qrcode.react` for instant mobile camera scanning and installation.
   - Built-in ADB sideload command helper (`adb install -r <apk>`).

2. **Automated Test Run Dashboard (`/`)**:
   - Executive KPI cards: Overall pass/fail status, total tested flows, screenshots captured (34 total), and HD video recordings.
   - **Active Release Hub** for fast developer access.
   - Recent test runs history table with branch, commit hash, duration, and direct report links.
   - **"Run Tests" Trigger**: Dispatch GitHub Actions repository dispatches or ping local runner webhooks directly from the UI.

3. **Test Run Detail Report (`/runs/[runId]`)**:
   - Complete execution metadata: device target (`Pixel 8 Pro / Android 17`), Flutter SDK 3.29.0, host information, duration.
   - **Interactive 720p HD Video Player**: HTML5 custom video player with chapter markers for each test step, timeline scrubber, playback speeds (0.5x to 2x), and fullscreen mode.
   - **Bidirectional Video Sync**: Click any step in the checklist to jump the video directly to that step's exact timestamp.
   - **Step-by-Step Progress Checklist**: 16/16 Customer steps and 18/18 Vendor steps verified green with duration and tags.
   - **Raw Test Log Viewer**: Collapsible, searchable terminal viewer with level filters and one-click copy.

4. **Visual Inspection Flow Gallery (`/runs/[runId]/screenshots`)**:
   - Lightbox gallery with keyboard shortcuts (Arrow Left/Right to advance, Esc to exit, `+`/`-`/`0` to zoom).
   - **Device Frame Mockup**: Simulates modern mobile hardware with dynamic island, status bar, and bezel.
   - **Side-by-Side Comparison Mode**: Compare any two steps or versions side-by-side to catch visual regressions.
   - Direct PNG downloads.

5. **Artifact Upload & Ingestion API (`POST /api/upload`)**:
   - Protected by API key (`x-api-key: <KEY>` or `Bearer <SECRET>`).
   - Supports compressed `bundle.zip` ingestion (automatically extracting APKs, recordings, screenshots, and `manifest.json`) or granular direct uploads.

6. **Local Companion Script (`scripts/upload_to_portal.sh`)**:
   - Streams local test deliverables to Vercel with curl progress bars and outputs permanent report links.

---

## 🏗 Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (Slate 900 dark theme, Emerald green badges, Indigo accents)
- **Icons & Motion**: `lucide-react`, `framer-motion`
- **QR Codes**: `qrcode.react`
- **Storage**: Unified storage abstraction in `lib/storage.ts` supporting **Local filesystem** (default for local dev) and **Vercel Blob** (`@vercel/blob` for production serverless deployments), with AWS S3 / Cloudflare R2 compatibility.
- **Zip Decompression**: `jszip`

---

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── runs/
│   │   │   ├── route.ts                 # GET /api/runs & POST /api/runs
│   │   │   └── [runId]/route.ts         # GET & PATCH /api/runs/[runId]
│   │   ├── trigger-test/route.ts        # POST /api/trigger-test (GitHub dispatch)
│   │   └── upload/route.ts              # POST /api/upload (Zip & file ingestion)
│   ├── runs/
│   │   ├── [runId]/
│   │   │   ├── page.tsx                 # Test run detail report
│   │   │   └── screenshots/
│   │   │       └── page.tsx             # Interactive screenshot flow gallery
│   ├── globals.css                      # Tailwind & dark theme styling
│   ├── layout.tsx                       # Root layout & navbar
│   └── page.tsx                         # Dashboard homepage
├── components/
│   ├── ApkCard.tsx                      # APK release card with download & QR
│   ├── DeviceFrame.tsx                  # Mobile phone device mockup frame
│   ├── LogViewer.tsx                    # Terminal-style test log viewer
│   ├── Navbar.tsx                       # Top navigation bar
│   ├── QrModal.tsx                      # High-contrast QR modal
│   ├── RunDetailClient.tsx              # Interactive run report client
│   ├── ScreenshotGallery.tsx            # Lightbox, device frame & compare gallery
│   ├── ScreenshotsPageClient.tsx        # Standalone flow inspection client
│   ├── StepChecklist.tsx                # Progress checklist with video seeking
│   ├── TestTriggerModal.tsx             # Modal to remotely trigger test suites
│   └── VideoPlayer.tsx                  # 720p HD player with chapter timeline markers
├── data/
│   └── initial-runs.ts                  # Seed data with full 34 steps and real artifacts
├── lib/
│   ├── auth.ts                          # API key verification helper
│   ├── blob.ts                          # Vercel Blob SDK integration
│   ├── runs-db.ts                       # Test run persistence & cache
│   └── storage.ts                       # Storage abstraction layer
├── public/
│   └── delivery_bundle/                 # Static assets (APKs, videos, screenshots)
├── scripts/
│   └── upload_to_portal.sh              # Local CLI upload companion script
├── types/
│   └── test-run.ts                      # TypeScript models & schemas
├── .env.example                         # Environment variables template
├── next.config.ts                       # Next.js configuration
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Getting Started Locally

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd "Mobile QA Portal"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default values in `.env.example`:
```env
PORTAL_API_KEY=rewardly_qa_secret_key_2026
NEXT_PUBLIC_PORTAL_URL=http://localhost:3000
STORAGE_PROVIDER=local
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Vercel Deployment Instructions

### Option 1: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via Vercel Web Dashboard
1. Push this repository to GitHub or GitLab.
2. In the Vercel dashboard, click **"Add New Project"** and import the repository.
3. In **Environment Variables**, configure:
   - `PORTAL_API_KEY`: Set your secret token (e.g. `prod_qa_secret_2026`).
   - `NEXT_PUBLIC_PORTAL_URL`: `https://your-project.vercel.app`.
   - `STORAGE_PROVIDER`: `vercel_blob`.
   - `BLOB_READ_WRITE_TOKEN`: Added automatically when enabling Vercel Blob in the **Storage** tab.
4. Click **Deploy**.

### Option 3: Connecting Vercel Blob (Recommended for APKs & Large Videos)
1. Go to your Vercel Project Dashboard.
2. Navigate to **Storage** → **Create Database** → **Blob**.
3. Name your store `rewardly-artifacts` and link it to your project.
4. Vercel automatically sets the `BLOB_READ_WRITE_TOKEN` environment variable.

---

## 📡 API Reference

### 1. Ingest Test Bundle
`POST /api/upload`

**Headers:**
```http
x-api-key: your_api_secret
Content-Type: multipart/form-data
```

**Form Data:**
- `bundle`: Zip file containing `manifest.json`, `recordings/`, `screenshots/`, and `apks/`.
- `runId`: (Optional) Custom run identifier.

**Example Response:**
```json
{
  "success": true,
  "message": "Bundle zip ingested and parsed successfully",
  "runId": "run-20261002-143000",
  "portalUrl": "https://your-portal.vercel.app/runs/run-20261002-143000",
  "extracted": {
    "screenshotsCount": 34,
    "videosCount": 2,
    "apksCount": 2
  }
}
```

### 2. Trigger Integration Test
`POST /api/trigger-test`

**Body:**
```json
{
  "target": "all",
  "branch": "main",
  "deviceId": "emulator-5554",
  "triggerMode": "github_actions",
  "customMessage": "Regression testing dynamic pass update"
}
```

### 3. List All Test Runs
`GET /api/runs`

---

## 💻 Companion CLI Upload Script

To upload test deliverables directly from your test runner machine or CI runner:

```bash
PORTAL_URL="https://your-portal.vercel.app" \
API_KEY="your_api_secret" \
./scripts/upload_to_portal.sh --bundle ./delivery_bundle --branch main
```

The script will package the directory, show a progress bar during transmission, and output the permanent URL to view the live dashboard report.
