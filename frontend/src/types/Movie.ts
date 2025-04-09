export interface Movie {
  showId: string;
  title: string;
  type: string;
  director: string;
  castList: string;
  country: string;
  releaseYear: number;
  rating: string;
  duration: string;
  description: string;
  genre?: string; // for legacy/backend usage (ignored in form)
  genres: string[]; // used in forms and sent to backend
  posterUrl?: string; // optional if not used yet
}
