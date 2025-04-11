// Import hooks and components
import { useRef } from 'react';
import { Movie } from '../types/Movie'; // Movie type definition
import MovieCard from './MovieCard'; // Standard movie card component
import AltMovieCard from './AltMovieCard'; // Alternate movie card component
import '../css/MovieRow.css'; // Custom styles for row layout
import '../css/MovieCard.css'; // Shared movie card styling

// Props expected by this component
interface MovieRowProps {
  title: string; // Section title (e.g. "Recommended for You")
  movies: Movie[]; // Array of movie objects to display
  useAltCard?: boolean; // Optional toggle to use AltMovieCard instead of MovieCard
}

// Functional component for displaying a horizontal row of movie cards
const MovieRow = ({ title, movies, useAltCard }: MovieRowProps) => {
  // Ref to track the horizontal scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll function: moves container left or right by one full view width
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
      {/* Title above the row */}
      <h3 className="row-title mb-3">{title}</h3>

      {/* Horizontal scroll container with left/right arrows */}
      <div className="movie-row-hover-container position-relative">
        {/* Left arrow for scrolling */}
        <div className="scroll-arrow left" onClick={() => scroll('left')}>
          &#10094;
        </div>

        {/* Scrollable div that holds the movie cards */}
        <div
          className="movie-row-scroll d-flex overflow-auto gap-3 px-3"
          ref={scrollRef}
        >
          {/* Render movie cards dynamically. Use AltMovieCard if specified */}
          {movies.map((movie) =>
            useAltCard ? (
              <AltMovieCard key={movie.showId} movie={movie} />
            ) : (
              <MovieCard key={movie.showId} movie={movie} />
            )
          )}
        </div>

        {/* Right arrow for scrolling */}
        <div className="scroll-arrow right" onClick={() => scroll('right')}>
          &#10095;
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
