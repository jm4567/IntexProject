import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import './css/styles.css';
import CreateAccount from './pages/CreateAccount';
import MovieDetailsPages from './pages/MovieDetailsPages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MoviesPage from './pages/MoviesPage';
import BrowseGenres from './pages/BrowseGenres';
import ManageMovies from './pages/ManageMovies';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';

function App() {
  const location = useLocation();
  const hideHeaderOnPaths = ['/login']; // Hide nav bar for login page
  const hideFooterrOnPaths = ['/login']; // Hide footer for login page

  const shouldShowHeader = !hideHeaderOnPaths.includes(location.pathname);
  const shouldShowFooter = !hideFooterrOnPaths.includes(location.pathname);

  return (
    <main className="container-fluid px-0">
      {shouldShowFooter && <Footer />}
      {shouldShowHeader && <NavBar />}
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
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/register" element={<Register />} />
      </Routes>
      {shouldShowHeader && <Header />}
    </main>
  );
}

export default App;
