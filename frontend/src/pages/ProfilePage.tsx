import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ProfilePage.css';

interface UserProfile {
  name: string;
  email: string;
  accountType: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'https://localhost:5000/api/Account/current',
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (err: any) {
        console.error('❌ Error fetching profile:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!user) return <div className="text-center mt-8">No user data found.</div>;

  return (
    <div className="full-screen-wrapper">
      <div className="movie-content">
        <NavBar selectedGenres={[]} setSelectedGenres={() => {}} />

        <div className="container d-flex justify-content-center mt-5 mb-5">
          <div className="profile-card shadow-lg">
            <h1 className="profile-title">Your Profile</h1>
            <hr />
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Account Type:</strong> {user.accountType}
              </p>
            </div>

            <div className="mt-4 d-flex flex-column align-items-start gap-2">
              {user.accountType === 'Administrator' && (
                <Link to="/managemovies" className="btn btn-dark">
                  Go to Admin Dashboard
                </Link>
              )}
              <button className="edit-button">Edit Profile</button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
