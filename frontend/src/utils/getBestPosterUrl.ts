// Returns the best available poster URL for a given movie
export function getBestPosterUrl(
  title?: string, // Optional movie title used as fallback if no posterUrl
  posterUrl?: string // Optional direct poster URL
): string | null {
  // If a direct poster URL is provided, use it
  if (posterUrl) return posterUrl;

  // If no posterUrl is provided but a title exists, construct a fallback URL using the title
  if (title)
    return `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;

  // If neither posterUrl nor title is available, return null to avoid returning an empty string
  return null; // 👈 prevents empty string problem
}
