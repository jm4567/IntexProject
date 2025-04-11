// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../css/ProfilePage.css';

// Define the shape of user profile data
interface UserProfile {
  name: string;
  email: string;
  accountType: string;
}

const ProfilePage = () => {
  // Local state for user data, loading, and error messages
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the user's profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Make authenticated request to get current user info
        const response = await axios.get(
          'https://localhost:5000/api/Account/current',

          {
            withCredentials: true, // Include cookies for auth
          }

        );
        setUser(response.data); // Set user data on success
      } catch (err: any) {
        // Handle any errors that occur
        console.error('❌ Error fetching profile:', err);
        setError('Failed to load profile.');
      } finally {
        // Stop loading indicator
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Render loading, error, or empty state
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!user) return <div className="text-center mt-8">No user data found.</div>;

  // Render profile page
  return (
    <div className="full-screen-wrapper">
      <div className="movie-content">
        {/* NavBar with disabled genre filtering */}
        <NavBar selectedGenres={[]} setSelectedGenres={() => {}} />

        <div className="container d-flex justify-content-center mt-5 mb-5">
          <div className="profile-card shadow-lg">
            <h1 className="profile-title">Your Profile</h1>
            <hr />
            <div className="profile-info">
              {/* Display user info */}
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


            {/* Conditionally show admin dashboard link if user is admin */}

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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
