import React, { useState, useEffect, createContext } from 'react';
interface User {
  email: string;
  role: string | null;
}

const UserContext = createContext<User | null>(null);

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ email: '', role: null });

  useEffect(() => {
    async function fetchUser() {
      try {
        // Step 1: Ping the auth endpoint
        const authRes = await fetch(
          'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/pingauth',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const authData = await authRes.json();
        if (!authData.email) throw new Error('Invalid session');

        // ✅ Only fetch role *after* confirming authentication
        let role: string | null = null;
        try {
          const roleRes = await fetch(
            'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/Account/GetUserRole',
            {
              credentials: 'include',
            }
          );
          if (roleRes.ok) {
            const roleData = await roleRes.json();
            role = roleData.roles?.[0] ?? null;
          }
        } catch (roleErr) {
          console.warn("Couldn't fetch role", roleErr);
          // fallback to null role if role fetch fails
        }

        setUser({ email: authData.email, role });
        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !authorized) {
      window.location.href = '/login';
    }
  }, [loading, authorized]);

  if (loading) return <p>Loading...</p>;

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export function AuthorizedUser(props: { value: 'email' | 'role' }) {
  const user = React.useContext(UserContext);
  if (!user) return null;

  return props.value === 'email' ? <>{user.email}</> : <>{user.role}</>;
}

export function useUser() {
  return React.useContext(UserContext);
}

export default AuthorizeView;
