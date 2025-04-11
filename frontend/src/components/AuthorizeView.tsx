// Import necessary React functions and routing utilities
import React, { useState, useEffect, createContext } from 'react';

// Define a TypeScript interface for user structure
interface User {
  email: string;
  role: string | null;
}

// Create a context to store user info and make it available throughout the app
const UserContext = createContext<User | null>(null);

// Main component that wraps protected routes
function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false); // whether the user is authenticated
  const [loading, setLoading] = useState(true); // whether auth check is still running
  const [user, setUser] = useState<User>({ email: '', role: null }); // user info

  useEffect(() => {
    async function fetchUser() {
      try {
        // Step 1: Ping authentication endpoint to validate session
        const authRes = await fetch('https://localhost:5000/pingauth', {
          method: 'GET',
          credentials: 'include', // ensures cookies/session info are sent
        });

        const authData = await authRes.json();

        // If no email, assume session is invalid
        if (!authData.email) throw new Error('Invalid session');

        let role: string | null = null;

        // Step 2: Try to get user's role if authenticated
        try {
          const roleRes = await fetch(
            'https://localhost:5000/api/Account/GetUserRole',
            { credentials: 'include' }
          );

          if (roleRes.ok) {
            const roleData = await roleRes.json();
            role = roleData.roles?.[0] ?? null; // Use the first role if available
          }
        } catch (roleErr) {
          // Fail silently and use null role if it doesn't load
          console.warn("Couldn't fetch role", roleErr);
        }

        // Set user context and mark as authorized
        setUser({ email: authData.email, role });
        setAuthorized(true);
      } catch (error) {
        // If authentication failed, mark as unauthorized
        setAuthorized(false);
      } finally {
        // Stop loading spinner
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Redirect to login page if not authorized and done loading
  useEffect(() => {
    if (!loading && !authorized) {
      window.location.href = '/login';
    }
  }, [loading, authorized]);

  // Show loading message while checking auth
  if (loading) return <p>Loading...</p>;

  // Provide the user object to child components via context
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

// Utility component to show current user email or role inline
export function AuthorizedUser(props: { value: 'email' | 'role' }) {
  const user = React.useContext(UserContext);
  if (!user) return null;

  return props.value === 'email' ? <>{user.email}</> : <>{user.role}</>;
}

// Custom hook to access user data in any component
export function useUser() {
  return React.useContext(UserContext);
}

export default AuthorizeView;
