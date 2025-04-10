export function getBestPosterUrl(
  title?: string,
  posterUrl?: string
): string | null {
  if (posterUrl) return posterUrl;
  if (title)
    return `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;
  return null; // 👈 prevents empty string problem
}
