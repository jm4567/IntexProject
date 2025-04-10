import { Movie } from '../types/Movie';

function getSafePosterUrl(title: string | undefined): string {
  if (!title) return '/images/Image_coming_soon.png';
  return `https://postersintex29.blob.core.windows.net/posters/${title}.jpg`;
}

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/api/Movie';

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    const url = `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${
      selectedGenres.length ? `&${genreParams}` : ''
    }`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');

    const data = await response.json();

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

export const updateMovie = async (id: string, movie: Movie) => {
  const response = await fetch(
    `https://localhost:5000/api/Movie/UpdateMovie/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    }
  );

  if (!response.ok)
    throw new Error(`Failed to update movie: ${response.status}`);

  const contentType = response.headers.get('Content-Type');
  return contentType && contentType.includes('application/json')
    ? response.json()
    : null;
};

export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

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

export const fetchAllMovies = async (
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    const url = `${API_URL}/ShowMovies${selectedGenres.length ? `?${genreParams}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();

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

export const fetchMovieById = async (showId: string): Promise<Movie> => {
  try {
    const response = await fetch(
      `https://localhost:5000/api/Movie/GetMovieById/${showId}`,
      { credentials: 'include' }
    );

    if (response.ok) return await response.json();

    if (response.status === 404) {
      console.warn(`Primary DB 404 for ${showId}, trying fallback…`);

      const fallbackRes = await fetch(
        `https://localhost:5000/api/SupplementalMovie/GetById/${showId}`,
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
