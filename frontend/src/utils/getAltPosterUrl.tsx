// Returns the URL to fetch an alternate movie poster based on the movie title
export function getAltPosterUrl(title: string): string {
  // Constructs and returns the full URL to the poster image in the secondary blob storage
  return `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;
}
