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
import ProfilePage from './pages/ProfilePage';

function App() {
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

        {/* Protected Routes */}
        <Route
          path="/movie/:showId"
          element={
            <AuthorizeView>
              <GenreProvider>
                <DefaultLayout>
                  <MovieDetailsPages />
                </DefaultLayout>
              </GenreProvider>
            </AuthorizeView>
          }
        />

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
          path="/profile"
          element={
            <AuthorizeView>
              {' '}
              <ProfilePage />{' '}
            </AuthorizeView>
          }
          key="profile"
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
