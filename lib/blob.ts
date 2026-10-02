import { put, del, head, list } from "@vercel/blob";

export interface BlobUploadOptions {
  access?: "public";
  contentType?: string;
  addRandomSuffix?: boolean;
}

/**
 * Uploads a file to Vercel Blob storage.
 * Automatically handles public access and content types.
 */
export async function uploadToVercelBlob(
  path: string,
  body: Parameters<typeof put>[1],
  options?: BlobUploadOptions
) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN environment variable is not defined. Please configure Vercel Blob."
    );
  }

  const result = await put(path, body, {
    access: options?.access || "public",
    token,
    contentType: options?.contentType,
    addRandomSuffix: options?.addRandomSuffix ?? false,
  });

  return {
    url: result.url,
    downloadUrl: result.downloadUrl,
    pathname: result.pathname,
    contentType: result.contentType,
  };
}

/**
 * Delete a file from Vercel Blob
 */
export async function deleteFromVercelBlob(url: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is missing.");
  }
  await del(url, { token });
}

/**
 * List files in Vercel Blob
 */
export async function listVercelBlobs(prefix?: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return [];
  const { blobs } = await list({ prefix, token });
  return blobs;
}
