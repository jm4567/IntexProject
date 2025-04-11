// AltMovieCard.tsx

// Import necessary dependencies and types
import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
import { getAltPosterUrl } from '../utils/getAltPosterUrl';
import '../css/MovieRow.css';

interface AltMovieCardProps {
  movie: Movie;
}

const AltMovieCard = ({ movie }: AltMovieCardProps) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle card click to navigate to the movie details page
  const handleClick = () => {
    if (!movie.showId) return; // Guard clause for missing ID
    navigate(`/movie/${movie.showId}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      {/* Display movie poster image */}
      <img
        className="movie-poster" // Reuses same CSS class as MovieCard for consistent styling
        src={getAltPosterUrl(movie.title)} // Uses an alternate URL builder
        alt={movie.title}
        onError={(e) => {
          // Fallback to placeholder image if loading fails
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop if fallback also fails
          target.src = '/images/Image_coming_soon.png';
        }}
      />
      {/* Display movie title below poster */}
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default AltMovieCard;
