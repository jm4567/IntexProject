// Defines the structure of a Movie object used throughout the application
export interface Movie {
  showId: string; // Unique identifier for the movie/show
  title: string; // Title of the movie/show
  type: string; // Type of media (e.g., "Movie", "TV Show")
  director: string; // Director name(s)
  castList: string; // Cast members (as a string, potentially comma-separated)
  country: string; // Country of origin
  releaseYear: number; // Year the movie/show was released
  rating: string; // MPAA or regional rating (e.g., PG-13)
  duration: string; // Duration (e.g., "2h 15m" or "45m")
  description: string; // Short summary or synopsis of the movie/show

  genre?: string; // ✅ Deprecated: For legacy/backend-only use; not used in form logic
  genres: string[]; // ✅ Primary: Used for multi-select genre input and submission to backend

  posterUrl?: string; // Optional: Direct URL to the movie/show's poster image
}
