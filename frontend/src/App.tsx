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

function App() {
  return (
    <main className="container-fluid px-0">
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:show_id" element={<MovieDetailsPages />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/genres" element={<BrowseGenres />} />
        <Route path="/managemovies" element={<ManageMovies />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
