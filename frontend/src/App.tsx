import NavBar from './components/NavBar';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import './css/styles.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import MovieDetailsPages from './pages/MovieDetailsPages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MoviesPage from './pages/MoviesPage';
import BrowseGenres from './pages/BrowseGenres';
import ManageMovies from './pages/ManageMovies';
import DefaultLayout from './components/DefaultLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/movies"
        element={
          <DefaultLayout>
            <MoviesPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/createaccount"
        element={
          <DefaultLayout>
            <CreateAccount />
          </DefaultLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/movie/:title/:show_id"
        element={
          <DefaultLayout>
            <MovieDetailsPages />
          </DefaultLayout>
        }
      />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/genres" element={<BrowseGenres />} />
      <Route
        path="/managemovies"
        element={
          <DefaultLayout>
            <ManageMovies />
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;
