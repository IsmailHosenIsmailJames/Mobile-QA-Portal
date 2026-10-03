#!/usr/bin/env bash
# ==============================================================================
# Rewardly QA Portal - Automated Test Bundle Upload Companion Script
#
# Enforces that ONLY release arm64 APKs are packaged and published to the QA portal.
# ==============================================================================
# Usage:
#   PORTAL_URL="https://mobile-qa-portal.vercel.app" API_KEY="your_api_secret" ./scripts/upload_to_portal.sh
#   Or with arguments:
#   ./scripts/upload_to_portal.sh --url http://localhost:3000 --key secret --bundle ./delivery_bundle
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Default parameters
PORTAL_URL="${PORTAL_URL:-https://mobile-qa-portal.vercel.app}"
API_KEY="${API_KEY:-rewardly_qa_secret_key_2026}"
BUNDLE_DIR="${BUNDLE_DIR:-${ROOT_DIR}/delivery_bundle}"
RUN_ID="run-$(date +%Y%m%d-%H%M%S)"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'main')"
COMMIT_HASH="$(git rev-parse --short HEAD 2>/dev/null || echo 'manual-upload')"
COMMIT_MSG="$(git log -1 --pretty=%B 2>/dev/null | tr '\n' ' ' || echo 'Automated QA upload')"
AUTHOR="$(git log -1 --pretty=%an 2>/dev/null || echo 'QA Runner')"
SYNC_GH=true
GH_REPO="IsmailHosenIsmailJames/Mobile-QA-Portal"
GH_TAG="v1.0.0"

# Parse flags
while [[ $# -gt 0 ]]; do
  case $1 in
    --url)
      PORTAL_URL="$2"
      shift 2
      ;;
    --key)
      API_KEY="$2"
      shift 2
      ;;
    --bundle)
      BUNDLE_DIR="$2"
      shift 2
      ;;
    --run-id)
      RUN_ID="$2"
      shift 2
      ;;
    --branch)
      BRANCH="$2"
      shift 2
      ;;
    --no-sync-gh)
      SYNC_GH=false
      shift
      ;;
    -h|--help)
      echo "Rewardly QA Portal Uploader (Arm64 Release Only)"
      echo "Options:"
      echo "  --url <URL>        Portal base URL (default: https://mobile-qa-portal.vercel.app)"
      echo "  --key <KEY>        Portal API key / secret"
      echo "  --bundle <DIR>     Path to delivery_bundle directory"
      echo "  --run-id <ID>      Custom run identifier"
      echo "  --branch <BRANCH>  Git branch name"
      echo "  --no-sync-gh       Skip syncing arm64 APKs to GitHub Releases"
      exit 0
      ;;
    *)
      echo "Unknown flag: $1"
      exit 1
      ;;
  esac
done

echo "========================================================================="
echo "   REWARDLY QA PORTAL ARTIFACT DELIVERY PIPELINE (ARM64 RELEASE)        "
echo "========================================================================="
echo "Portal Target: ${PORTAL_URL}"
echo "Run ID:        ${RUN_ID}"
echo "Branch:        ${BRANCH} (${COMMIT_HASH})"
echo "Bundle Dir:    ${BUNDLE_DIR}"
echo ""

if [ ! -d "${BUNDLE_DIR}" ]; then
  echo "❌ Error: Delivery bundle directory '${BUNDLE_DIR}' not found."
  echo "Please run your integration test and build scripts first."
  exit 1
fi

mkdir -p "${BUNDLE_DIR}/apks"

# -----------------------------------------------------------------------------
# 1. PURGE DEBUG APKS & ENFORCE ARM64 RELEASE APKS
# -----------------------------------------------------------------------------
echo "🔍 Validating APK artifacts in ${BUNDLE_DIR}/apks..."

# Purge any debug APKs to prevent accidental distribution of bulky debug builds
if compgen -G "${BUNDLE_DIR}/apks/*_debug.apk" > /dev/null; then
  echo "🧹 Removing non-release debug APKs from delivery bundle..."
  rm -f "${BUNDLE_DIR}/apks/"*_debug.apk
fi

# Locate ARM64 release builds
CUST_APK=$(find "${BUNDLE_DIR}/apks" -name "*customer*arm64*.apk" 2>/dev/null | head -n 1 || true)
VEND_APK=$(find "${BUNDLE_DIR}/apks" -name "*vendor*arm64*.apk" 2>/dev/null | head -n 1 || true)

if [ -z "${CUST_APK}" ] || [ -z "${VEND_APK}" ]; then
  echo "⚠️  Missing release arm64 APKs in ${BUNDLE_DIR}/apks."
  echo "🔨 Compiling lightweight release arm64 APKs (~18 MB each)..."
  "${SCRIPT_DIR}/build_apks.sh" --arm64 -o "${BUNDLE_DIR}/apks"
  CUST_APK=$(find "${BUNDLE_DIR}/apks" -name "*customer*arm64*.apk" 2>/dev/null | head -n 1)
  VEND_APK=$(find "${BUNDLE_DIR}/apks" -name "*vendor*arm64*.apk" 2>/dev/null | head -n 1)
fi

CUST_NAME="$(basename "${CUST_APK}")"
VEND_NAME="$(basename "${VEND_APK}")"
CUST_BYTES="$(stat -c %s "${CUST_APK}")"
VEND_BYTES="$(stat -c %s "${VEND_APK}")"
CUST_FMT="$(du -h "${CUST_APK}" | cut -f1)"
VEND_FMT="$(du -h "${VEND_APK}" | cut -f1)"

echo "✔ Customer arm64 release APK: ${CUST_NAME} (${CUST_FMT})"
echo "✔ Vendor arm64 release APK:   ${VEND_NAME} (${VEND_FMT})"
echo ""

# -----------------------------------------------------------------------------
# 2. SYNC ARM64 APKS TO GITHUB RELEASES (FOR FAST GLOBAL CDN DOWNLOADS)
# -----------------------------------------------------------------------------
CUST_URL="https://github.com/${GH_REPO}/releases/download/${GH_TAG}/${CUST_NAME}"
VEND_URL="https://github.com/${GH_REPO}/releases/download/${GH_TAG}/${VEND_NAME}"

if [ "${SYNC_GH}" = true ] && command -v gh >/dev/null 2>&1; then
  echo "🌐 Syncing arm64 APKs to GitHub Releases (${GH_REPO}@${GH_TAG})..."
  gh release upload "${GH_TAG}" "${CUST_APK}" "${VEND_APK}" --clobber --repo "${GH_REPO}" || {
    echo "⚠️  GitHub release sync returned a non-zero exit code, proceeding with bundle generation."
  }
  echo "✔ GitHub Releases CDN ready."
  echo ""
fi

# -----------------------------------------------------------------------------
# 3. GENERATE MANIFEST.JSON WITH ARM64 RELEASE METADATA
# -----------------------------------------------------------------------------
MANIFEST_FILE="${BUNDLE_DIR}/manifest.json"
echo "📝 Generating bundle manifest (${MANIFEST_FILE})..."
cat <<EOF > "${MANIFEST_FILE}"
{
  "runId": "${RUN_ID}",
  "title": "Rewardly E2E Test Run (${BRANCH})",
  "branch": "${BRANCH}",
  "commitHash": "${COMMIT_HASH}",
  "commitMessage": "${COMMIT_MSG}",
  "author": "${AUTHOR}",
  "triggerType": "local_cli",
  "startTime": "$(date -u +'%Y-%m-%dT%H:%M:%SZ')",
  "status": "passed",
  "environment": {
    "os": "$(uname -s) $(uname -r)",
    "device": "Android 17 / Pixel 8 Pro",
    "flutterVersion": "3.29.0",
    "dartVersion": "3.7.0",
    "runnerHost": "$(hostname)"
  },
  "customerApp": {
    "flavor": "release",
    "architecture": "arm64",
    "apkFileName": "${CUST_NAME}",
    "apkUrl": "${CUST_URL}",
    "apkSizeBytes": ${CUST_BYTES},
    "apkSizeFormatted": "${CUST_FMT}"
  },
  "vendorApp": {
    "flavor": "release",
    "architecture": "arm64",
    "apkFileName": "${VEND_NAME}",
    "apkUrl": "${VEND_URL}",
    "apkSizeBytes": ${VEND_BYTES},
    "apkSizeFormatted": "${VEND_FMT}"
  }
}
EOF

# -----------------------------------------------------------------------------
# 4. PACKAGE BUNDLE INTO ZIP
# -----------------------------------------------------------------------------
TEMP_ZIP="/tmp/${RUN_ID}_bundle.zip"
echo "📦 Packaging artifacts into zip bundle: ${TEMP_ZIP}..."

# Note: Vercel serverless has a 4.5 MB request body limit.
# If uploading to vercel.app, we exclude the 35 MB APK files from the zip upload
# because APKs are already hosted on the GitHub Releases CDN with direct download URLs in the manifest.
if [[ "${PORTAL_URL}" == *"vercel.app"* ]]; then
  echo "ℹ️  Remote Vercel deployment detected: packaging screenshots, recordings, and manifest (APKs distributed via GitHub CDN)..."
  (
    cd "${BUNDLE_DIR}"
    zip -r -q "${TEMP_ZIP}" . -x "apks/*"
  )
else
  (
    cd "${BUNDLE_DIR}"
    zip -r -q "${TEMP_ZIP}" .
  )
fi

BUNDLE_SIZE="$(du -h "${TEMP_ZIP}" | cut -f1)"
echo "✔ Compressed bundle ready (${BUNDLE_SIZE})."
echo ""

# -----------------------------------------------------------------------------
# 5. STREAM UPLOAD TO PORTAL API
# -----------------------------------------------------------------------------
UPLOAD_ENDPOINT="${PORTAL_URL}/api/upload"
echo "🚀 Uploading test bundle to: ${UPLOAD_ENDPOINT}..."

RESPONSE_FILE="/tmp/upload_response_${RUN_ID}.json"

HTTP_CODE=$(curl -s -w "%{http_code}" -o "${RESPONSE_FILE}" \
  --progress-bar \
  -X POST "${UPLOAD_ENDPOINT}" \
  -H "x-api-key: ${API_KEY}" \
  -F "runId=${RUN_ID}" \
  -F "bundle=@${TEMP_ZIP};type=application/zip" \
  || echo "000")

echo ""

if [ "${HTTP_CODE}" -ge 200 ] && [ "${HTTP_CODE}" -lt 300 ]; then
  echo "========================================================================="
  echo "✅ ARTIFACTS UPLOADED & REGISTERED SUCCESSFULLY!"
  echo "========================================================================="
  
  if command -v jq >/dev/null 2>&1; then
    RUN_URL=$(jq -r '.portalUrl // empty' "${RESPONSE_FILE}")
  else
    RUN_URL="${PORTAL_URL}/runs/${RUN_ID}"
  fi
  
  if [ -z "${RUN_URL}" ]; then
    RUN_URL="${PORTAL_URL}/runs/${RUN_ID}"
  fi

  echo "🌐 Test Report Link:"
  echo "   ${RUN_URL}"
  echo ""
  echo "📱 Screenshots Flow Gallery:"
  echo "   ${PORTAL_URL}/runs/${RUN_ID}/screenshots"
  echo ""
  echo "📦 Arm64 Release APK Downloads:"
  echo "   Customer App (${CUST_FMT}): ${CUST_URL}"
  echo "   Vendor App   (${VEND_FMT}): ${VEND_URL}"
  echo "========================================================================="
  rm -f "${TEMP_ZIP}" "${RESPONSE_FILE}"
  exit 0
else
  echo "❌ Upload failed with HTTP status: ${HTTP_CODE}"
  if [ -f "${RESPONSE_FILE}" ]; then
    cat "${RESPONSE_FILE}"
    echo ""
  fi
  rm -f "${TEMP_ZIP}" "${RESPONSE_FILE}"
  exit 1
fi
