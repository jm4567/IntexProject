import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext<User | null>(null);

interface User {
  email: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const emptyuser: User = { email: '' };
  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email });
          setAuthorized(true);
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry('https://localhost:5000/pingauth', {
      method: 'GET',
      credentials: 'include',
    });
  }, []);

  // 🔁 NEW: Force a full page refresh to /login if not authorized
  useEffect(() => {
    if (!loading && !authorized) {
      window.location.href = '/login'; // hard redirect to reset app
    }
  }, [loading, authorized]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null;
  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;
