// Imports the Movie type, navigation hook, poster utility function, and CSS
import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';
import { getBestPosterUrl } from '../utils/getBestPosterUrl';
import '../css/MovieRow.css';

// Props interface defining expected movie object
interface MovieCardProps {
  movie: Movie;
}

// MovieCard component definition
const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate(); // Hook to navigate to the movie details page

  // Handles card click to navigate to movie detail page
  const handleClick = () => {
    if (!movie.showId) {
      console.warn('No showId provided for movie:', movie); // Warn if movie ID is missing
      return;
    }
    navigate(`/movie/${movie.showId}`); // Navigate using the showId
  };

  // Fallback image to use if no poster or if loading fails
  const fallback = '/images/Image_coming_soon.png';

  // Determine initial image source (poster URL or constructed from title)
  const initialSrc = getBestPosterUrl(movie.title, movie.posterUrl);

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {initialSrc ? (
        // If there's an initial poster URL, render it
        <img
          src={initialSrc}
          alt={movie.title}
          onError={(e) => {
            const current = e.currentTarget;
            // If the image fails to load, switch to the fallback (only once)
            if (!current.src.includes(fallback)) {
              current.onerror = null; // prevent infinite loop
              current.src = fallback;
            }
          }}
          onLoad={(e) => {
            // Additional guard in case image has zero width (broken image)
            if (e.currentTarget.naturalWidth === 0) {
              e.currentTarget.src = fallback;
            }
          }}
          className="movie-poster"
        />
      ) : (
        // If no initial source, show fallback image
        <img
          src={fallback}
          alt="Poster not available"
          className="movie-poster"
        />
      )}
      {/* Render movie title below poster */}
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
