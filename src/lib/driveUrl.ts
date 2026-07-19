/**
 * Converts any Google Drive share/view URL into a direct image-embeddable URL.
 *
 * Uses the thumbnail endpoint (drive.google.com/thumbnail) which is the most
 * reliable way to embed Drive images without CORS or redirect issues.
 *
 * Supports:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/file/d/FILE_ID/view
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?id=FILE_ID (legacy direct links)
 *   Non-Drive URLs are returned unchanged.
 *
 * IMPORTANT: The Drive file itself must be shared as "Anyone with the link"
 * for the image to load publicly.
 */
export function convertDriveUrl(url: string, size: number = 1920): string {
  if (!url) return url;

  let fileId: string | null = null;

  // /file/d/FILE_ID/...
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) fileId = fileMatch[1];

  // open?id=FILE_ID or uc?id=FILE_ID or uc?export=...&id=FILE_ID
  if (!fileId) {
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) fileId = idMatch[1];
  }

  if (!fileId) return url; // not a Drive URL, return as-is

  // Use the thumbnail endpoint — most reliable for public embedding
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
