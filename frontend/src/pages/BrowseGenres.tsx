import { useEffect, useState, useRef, useCallback } from 'react';
import { Movie } from '../types/Movie';
import { fetchMoreMovies } from '../api/MoviesAPI';
import GenreFilter from '../components/GenreFilter';
import MovieCard from '../components/MovieCard';
import '../css/MoviePage.css';
import Footer from '../components/Footer';

function BrowseGenres() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);

  const loadMovies = useCallback(async () => {
    try {
      const data = await fetchMoreMovies(selectedGenres, page, 6);
      if (data.movies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.showId));
          const newUnique = data.movies.filter(
            (m) => !existingIds.has(m.showId)
          );
          return [...prev, ...newUnique];
        });
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }, [page, selectedGenres]);

  useEffect(() => {
    // Reset if genres change
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, [selectedGenres]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  //used for infinite scrolling
  useEffect(() => {
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (loader.current) {
      observer.current.observe(loader.current);
    }
    return () => {
      if (loader.current && observer.current) {
        observer.current.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  return (
    <>
      <div className="full-screen-wrapper">
        <div className="background-overlay"></div>

        {/* Foreground content */}
        <div className="container-fluid mt-4 foreground-content">
          <div className="row">
            {/* Genre dropdown full width */}
            <div className="col-md-12 mb-4 drop-down">
              <GenreFilter
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
              />
            </div>

            {/* Movie cards */}
            <div className="col-md-12">
              {error && <p className="text-danger">{error}</p>}
              <div className="row">
                {movies.map((movie) => (
                  <div className="col-md-2 mb-4" key={movie.showId}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
              {hasMore && (
                <div ref={loader} className="text-center py-4">
                  <span>Loading more movies...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default BrowseGenres;
