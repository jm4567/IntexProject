import Homepage from './pages/Homepage';
import './css/styles.css';
import MovieDetailsPages from './pages/MovieDetailsPages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MoviesPage from './pages/MoviesPage';
import BrowseGenres from './pages/BrowseGenres';
import ManageMovies from './pages/ManageMovies';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import AuthorizeView from './components/AuthorizeView';
import ScrollToTop from './utils/ScrollToTop';
import { GenreProvider } from './components/GenreContext';

function App() {
  // const location = useLocation();
  // const hideHeaderOnPaths = ['/login']; // Hide nav bar for login page
  // const hideFooterrOnPaths = ['/login']; // Hide footer for login page

  // const shouldShowHeader = !hideHeaderOnPaths.includes(location.pathname);
  // const shouldShowFooter = !hideFooterrOnPaths.includes(location.pathname);

  return (
    <main className="container-fluid px-0">
      {/* {shouldShowFooter && <Footer />}
      {shouldShowHeader && <NavBar />} */}
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route
          path="/movie/:showId"
          element={
            <GenreProvider>
              <DefaultLayout>
                <MovieDetailsPages />
              </DefaultLayout>
            </GenreProvider>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/movies"
          element={
            <AuthorizeView>
              <MoviesPage />
            </AuthorizeView>
          }
        />
        <Route
          path="/genres"
          element={
            <AuthorizeView>
              <BrowseGenres />
            </AuthorizeView>
          }
        />
        <Route
          path="/managemovies"
          element={
            <AuthorizeView>
              <GenreProvider>
                <DefaultLayout>
                  <ManageMovies />
                </DefaultLayout>
              </GenreProvider>
            </AuthorizeView>
          }
        />
      </Routes>

      {/* {shouldShowHeader && <Header />} */}
    </main>
  );
}

export default App;
