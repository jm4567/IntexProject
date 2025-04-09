import { useEffect, useState } from 'react';
import Select from 'react-select';

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Movie/GetMovieGenres'
        );
        const data = await response.json();
        setGenres(data.sort());
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };
    fetchGenres();
  }, []);

  const options = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const handleChange = (selected: any) => {
    setSelectedGenres(selected ? selected.map((opt: any) => opt.value) : []);
  };

  return (
    <div className="genre-filter mb-4">
      <label className="form-label fw-bold">Genres</label>
      <Select
        isMulti
        options={options}
        value={options.filter((opt) => selectedGenres.includes(opt.value))}
        onChange={handleChange}
        placeholder="Choose genres..."
        classNamePrefix="select"
      />
    </div>
  );
}

export default GenreFilter;
