import { useRef, useState, useEffect } from 'react';
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

//a row of movie cards
const MovieRow = ({ title, movies, useAltCard }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkScroll(); // run once after render
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [movies]);

  //make the whole row scrollable if needed
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
        {showArrows && (
          <div className="scroll-arrow left" onClick={() => scroll('left')}>
            &#10094;
          </div>
        )}
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
        {/*only show the arrows if there are more movies than the screen fits */}
        {showArrows && (
          <div className="scroll-arrow right" onClick={() => scroll('right')}>
            &#10095;
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
