#!/usr/bin/env bash
# ==============================================================================
# Rewardly QA Portal - Automated Test Bundle Upload Companion Script
# ==============================================================================
# Usage:
#   PORTAL_URL="https://your-portal.vercel.app" API_KEY="your_api_secret" ./scripts/upload_to_portal.sh
#   Or with arguments:
#   ./scripts/upload_to_portal.sh --url http://localhost:3000 --key secret --bundle ./delivery_bundle
# ==============================================================================
set -euo pipefail

# Default parameters
PORTAL_URL="${PORTAL_URL:-http://localhost:3000}"
API_KEY="${API_KEY:-rewardly_qa_secret_key_2026}"
BUNDLE_DIR="${BUNDLE_DIR:-./delivery_bundle}"
RUN_ID="run-$(date +%Y%m%d-%H%M%S)"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'main')"
COMMIT_HASH="$(git rev-parse --short HEAD 2>/dev/null || echo 'manual-upload')"
COMMIT_MSG="$(git log -1 --pretty=%B 2>/dev/null | tr '\n' ' ' || echo 'Automated QA upload')"
AUTHOR="$(git log -1 --pretty=%an 2>/dev/null || echo 'QA Runner')"

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
    -h|--help)
      echo "Rewardly QA Portal Uploader"
      echo "Options:"
      echo "  --url <URL>        Portal base URL (default: http://localhost:3000)"
      echo "  --key <KEY>        Portal API key / secret"
      echo "  --bundle <DIR>     Path to delivery_bundle directory"
      echo "  --run-id <ID>      Custom run identifier"
      echo "  --branch <BRANCH>  Git branch name"
      exit 0
      ;;
    *)
      echo "Unknown flag: $1"
      exit 1
      ;;
  esac
done

echo "========================================================================="
echo "   REWARDLY QA PORTAL ARTIFACT DELIVERY PIPELINE                         "
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

TEMP_ZIP="/tmp/${RUN_ID}_bundle.zip"
MANIFEST_FILE="${BUNDLE_DIR}/manifest.json"

# Generate manifest.json if missing
echo "📝 Generating bundle manifest..."
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
  }
}
EOF

echo "📦 Packaging artifacts into zip bundle: ${TEMP_ZIP}..."
(
  cd "${BUNDLE_DIR}"
  zip -r -q "${TEMP_ZIP}" .
)

BUNDLE_SIZE="$(du -h "${TEMP_ZIP}" | cut -f1)"
echo "✔ Compressed bundle ready (${BUNDLE_SIZE})."
echo ""

# Stream upload to portal API
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

  echo "🌐 Permanent Test Report Link:"
  echo "   ${RUN_URL}"
  echo ""
  echo "📱 Screenshots Flow Gallery:"
  echo "   ${PORTAL_URL}/runs/${RUN_ID}/screenshots"
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
