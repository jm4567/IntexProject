import { Movie } from '../types/Movie';

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
    // Create genre filter string if there are selected genres
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    // Build base URL with pagination and optional genre filters
    const url = `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${
      selectedGenres.length ? `&${genreParams}` : ''
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update movie: ${response.status}`);
  }

  // ✅ Only try to parse JSON if there's content
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return null;
  }
};

export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

export const fetchAllMovies = async (
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    // Create genre filter string if there are selected genres
    const genreParams = selectedGenres
      .map((genre) => `movieCat=${encodeURIComponent(genre)}`)
      .join('&');

    // Build base URL with pagination and optional genre filters
    const url = `${API_URL}/ShowMovies${selectedGenres.length ? `?${genreParams}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
