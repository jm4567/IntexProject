import { Movie } from '../types/Movie';

// Utility function to generate a safe poster URL for a movie
function getSafePosterUrl(title: string | undefined): string {
  if (!title) return '/images/Image_coming_soon.png'; // fallback if no title

  // Encode title for URL safety
  const encoded = encodeURIComponent(title);

  // Primary and fallback poster URLs
  const primary = `https://movieposters2025.blob.core.windows.net/posters/${encoded}.jpg`;
  const fallback = `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;

  // Return both as fallback chain in custom format
  return `${primary}#fallback=${fallback}`;
}

// Interface for the movie-fetching response shape
interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL =
  'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/Movie';

// Fetches movies with pagination and optional genre filtering
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    // Generate query parameters from genres
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    // Construct full URL with pagination and genre filters
    const url = `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${
      selectedGenres.length ? `&${genreParams}` : ''
    }`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');

    const data = await response.json();

    // Fill in poster URLs if not present
    const moviesWithPosters = data.movies.map((movie: Movie) => ({
      ...movie,
      posterUrl: movie.posterUrl || getSafePosterUrl(movie.title),
    }));

    return { ...data, movies: moviesWithPosters };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Adds a new movie to the database
export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) throw new Error('Failed to add movie');

    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

// Updates an existing movie by ID
export const updateMovie = async (id: string, movie: Movie) => {
  const response = await fetch(`${API_URL}/UpdateMovie/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });

  if (!response.ok)
    throw new Error(`Failed to update movie: ${response.status}`);

  const contentType = response.headers.get('Content-Type');
  return contentType && contentType.includes('application/json')
    ? response.json()
    : null;
};

// Deletes a movie by showId
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// Loads additional movies for infinite scrolling or paginated views
export const fetchMoreMovies = async (
  selectedGenres: string[],
  pageNum = 1,
  pageSize: number
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    const paginationParams = `pageNum=${pageNum}&pageSize=${pageSize}`;
    const queryParams = [genreParams, paginationParams]
      .filter(Boolean)
      .join('&');

    const url = `${API_URL}/ShowMovies?${queryParams}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();

    // Ensure each movie has a poster URL
    const moviesWithPosters = data.movies.map((movie: Movie) => ({
      ...movie,
      posterUrl: movie.posterUrl || getSafePosterUrl(movie.title),
    }));

    return { ...data, movies: moviesWithPosters };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Fetches all movies with optional genre filtering
export const fetchAllMovies = async (
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    const url = `${API_URL}/ShowMovies${
      selectedGenres.length ? `?${genreParams}` : ''
    }`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();

    // Add fallback poster URLs if missing
    const moviesWithPosters = data.movies.map((movie: Movie) => ({
      ...movie,
      posterUrl: movie.posterUrl || getSafePosterUrl(movie.title),
    }));

    return { ...data, movies: moviesWithPosters };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Fetches a movie by its showId, with fallback to a supplemental DB if not found in primary DB
export const fetchMovieById = async (showId: string): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/GetMovieById/${showId}`, {
      credentials: 'include',
    });

    if (response.ok) return await response.json();

    // If not found in primary, attempt supplemental DB
    if (response.status === 404) {
      console.warn(`Primary DB 404 for ${showId}, trying fallback…`);

      const fallbackRes = await fetch(
        `https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/SupplementalMovie/GetById/${showId}`,
        { credentials: 'include' }
      );

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        console.log('✅ Fallback succeeded:', fallbackData);
        return {
          ...fallbackData,
          posterUrl: getSafePosterUrl(fallbackData.title),
        };
      } else {
        throw new Error(`Fallback fetch failed for showId ${showId}`);
      }
    }

    throw new Error(`Failed to fetch movie with ID ${showId}`);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};
