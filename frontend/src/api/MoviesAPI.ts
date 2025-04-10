import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL =
  'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/Movie';

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

    const response = await fetch(url, {
      credentials: 'include',
    });

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
      credentials: 'include',
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
  const response = await fetch(`${API_URL}/UpdateMovie/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error(`Failed to update movie: ${response.status}`);
  }

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
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// Used in the browse genres page only
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

    console.log('Requesting URL:', url);

    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
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

    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieById = async (showId: string): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/GetMovieById/${showId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID ${showId}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};
