import { useLocation } from 'react-router-dom';
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
import LoginPage from './pages/LoginPage';

function App() {
  const location = useLocation();
  const hideHeaderOnPaths = ['/loginpage']; // Hide nav bar for login page
  const hideFooterrOnPaths = ['/loginpage']; // Hide footer for login page

  const shouldShowHeader = !hideHeaderOnPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterrOnPaths.includes(location.pathname)

  return (
    <main className="container-fluid px-0">
      {shouldShowHeader && <NavBar />}
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:title/:show_id" element={<MovieDetailsPages />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/genres" element={<BrowseGenres />} />
        <Route path="/managemovies" element={<ManageMovies />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </main>
  );
}

export default App;

