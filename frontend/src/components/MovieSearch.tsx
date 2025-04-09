import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Movie } from '../types/Movie';
import { useNavigate } from 'react-router-dom';

function MovieSearch({
  selectedMovies,
  setSelectedMovies,
}: {
  selectedMovies: string[];
  setSelectedMovies: (movies: string[]) => void;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Movie/ShowMovies'
        );
        const data = await response.json();
        setMovies(
          data.movies.sort((a: Movie, b: Movie) =>
            a.title.localeCompare(b.title)
          )
        );
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };
    fetchMovies();
  }, []);

  const options = movies.map((movie) => ({
    value: movie.showId,
    label: movie.title,
  }));

  const handleChange = (selected: any) => {
    setSelectedMovies(selected ? selected.map((opt: any) => opt.value) : []);
  };

  return (
    <div className="movie-filter mb-4">
      <Select
        options={options}
        value={options.find((opt) => opt.value === selectedMovies[0])}
        onChange={(selected) => {
          if (selected) {
            navigate(`/movie/${selected.value}`);
          }
        }}
        onInputChange={(value) => setInputValue(value)}
        inputValue={inputValue}
        menuIsOpen={inputValue.length > 0}
        placeholder="Search Movie"
        classNamePrefix="select"
      />
    </div>
  );
}

export default MovieSearch;
