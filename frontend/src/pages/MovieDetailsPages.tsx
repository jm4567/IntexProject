import { useLocation } from 'react-router-dom';
import '../css/MovieDetail.css';

function MovieDetailsPages() {
  const location = useLocation();
  const movieData = location.state;

  if (!movieData) {
    return <p className="text-center mt-5">No movie data available.</p>;
  }

  const {
    title,
    director,
    genres,
    posterUrl,
    description,
    duration,
    releaseYear,
    rating,
    country,
    type,
    castList,
  } = movieData;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Movie Poster */}
        <div className="col-md-5 d-flex justify-content-center align-items-start">
          <img src={posterUrl} alt={title} className="movie-poster-img" />
        </div>

        {/* Movie Details */}
        <div className="col-md-6">
          <div className="movie-detail ps-md-4">
            <h1 className="fw-bold mt-2 display-3">{title}</h1>
            <h5 className="text-secondary mb-3">Directed by {director}</h5>
            <p className="text-muted">Genre: {genres.join(', ')}</p>
            <p className="text-muted">Rating: {rating}</p>
            <p className="text-muted">Type: {type}</p>
            <p className="text-muted">Duration: {duration}</p>
            <p className="text-muted">Release Year: {releaseYear}</p>
            <p className="text-muted">Country: {country}</p>
            <p className="text-muted">Description: {description}</p>
            <p className="text-muted">Cast List: {castList}</p>

            <button className="btn btn-outline-dark mt-3">
              <i className="bi bi-play-fill me-2"></i> Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPages;
