import { useRef } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import AltMovieCard from './AltMovieCard'; 
import '../css/MovieRow.css';
import '../css/MovieCard.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  useAltCard?: boolean; 
}

const MovieRow = ({ title, movies, useAltCard }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-row mb-4">
      <h3 className="row-title mb-3">{title}</h3>

      <div className="movie-row-hover-container position-relative">
        <div className="scroll-arrow left" onClick={() => scroll('left')}>
          &#10094;
        </div>

        <div
          className="movie-row-scroll d-flex overflow-auto gap-3 px-3"
          ref={scrollRef}
        >
          {movies.map((movie) =>
            useAltCard ? (
              <AltMovieCard key={movie.showId} movie={movie} />
            ) : (
              <MovieCard key={movie.showId} movie={movie} />
            )
          )}
        </div>

        <div className="scroll-arrow right" onClick={() => scroll('right')}>
          &#10095;
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
