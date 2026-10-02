import fs from "fs/promises";
import path from "path";
import { uploadToVercelBlob } from "./blob";

export type StorageProvider = "local" | "vercel_blob" | "s3";

export interface StoredFileResult {
  url: string;
  sizeBytes: number;
  contentType: string;
  path: string;
}

export function getStorageProvider(): StorageProvider {
  if (process.env.STORAGE_PROVIDER === "vercel_blob" && process.env.BLOB_READ_WRITE_TOKEN) {
    return "vercel_blob";
  }
  if (process.env.STORAGE_PROVIDER === "s3" && process.env.S3_ACCESS_KEY_ID) {
    return "s3";
  }
  return "local";
}

/**
 * Saves a binary buffer or stream to the configured storage backend
 */
export async function saveArtifactFile(
  filePath: string,
  buffer: Buffer | Uint8Array,
  contentType: string
): Promise<StoredFileResult> {
  const provider = getStorageProvider();

  if (provider === "vercel_blob") {
    // Vercel Blob storage
    const blob = new Blob([buffer as any], { type: contentType });
    const result = await uploadToVercelBlob(filePath, blob, {
      contentType,
      addRandomSuffix: false,
    });
    return {
      url: result.url,
      sizeBytes: buffer.byteLength,
      contentType,
      path: filePath,
    };
  }

  // Local storage fallback (ideal for local testing and self-hosted deployments)
  const normalizedPath = filePath.replace(/^\/+/, "");
  const targetDir = path.join(process.cwd(), "public", path.dirname(normalizedPath));
  const fullTargetPath = path.join(process.cwd(), "public", normalizedPath);

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(fullTargetPath, buffer);

  const portalBase = process.env.NEXT_PUBLIC_PORTAL_URL || "";
  const publicUrl = `/${normalizedPath}`;

  return {
    url: portalBase ? `${portalBase}${publicUrl}` : publicUrl,
    sizeBytes: buffer.byteLength,
    contentType,
    path: filePath,
  };
}

/**
 * Format bytes into human readable format (MB, KB)
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
