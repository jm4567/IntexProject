import MovieRow from '../components/MovieRow';

const MoviesPage = () => {
  return (
    <div>
      <MovieRow title="Trending" movies={[]} />
      <h1>This is Movie page</h1>
    </div>
  );
};

export default MoviesPage;
