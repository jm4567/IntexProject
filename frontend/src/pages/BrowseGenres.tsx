import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';

function BrowseGenres() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  {
    /*changed fontsize */
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <GenreFilter
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
        </div>
        <div className="col-md-9">
          <MovieCard selectedGenres={selectedGenres} />
        </div>
      </div>
    </div>
  );
}

export default BrowseGenres;
