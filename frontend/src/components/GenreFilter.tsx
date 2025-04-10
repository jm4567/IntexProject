import { useEffect, useState } from 'react';
import Select from 'react-select';
import '../css/NavBar.css';

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
    <div className="genre-dropdown mb-4">
      <label className="form-label fw-bold">Genres</label>
      <Select
        isMulti
        options={options}
        value={options.filter((opt) => selectedGenres.includes(opt.value))}
        onChange={handleChange}
        placeholder="Choose genres..."
        classNamePrefix="select"
        menuPortalTarget={null} // ⬅ Keeps it inline in the DOM
        menuPosition="absolute" // ⬅ Correctly anchored under the input
        styles={{
          menu: (base) => ({
            ...base,
            zIndex: 1000, // ⬅ Make sure it's above the grid
            position: 'absolute',
          }),
          container: (base) => ({
            ...base,
            zIndex: 1000,
          }),
        }}
        closeMenuOnSelect={false} // keeps menu open on multi-select
        menuShouldBlockScroll={false} // ⬅ speeds up UX
        blurInputOnSelect={false}
      />
    </div>
  );
}

export default GenreFilter;
