// Fetches the current user's email based on their session or cookie
export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/pingauth',
      {
        credentials: 'include', // include cookies/session
      }
    );

    if (!response.ok) return null; // return null if auth fails

    const data = await response.json();
    return data.email; // return email from response
  } catch (error) {
    // If the fetch fails (e.g., server is down), return null
    console.error('Error getting user email:', error);
    return null;
  }
};

// Given an email, fetch the corresponding user ID
export const getUserIdByEmail = async (
  email: string
): Promise<number | null> => {
  try {
    // Send email as a query param
    const response = await fetch(
      `https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/users/userIdByEmail?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) return null; // return null on error

    const data = await response.json();
    return data.userId; // return userId from backend
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

// Interface for expected user data from /current endpoint
export interface CurrentUser {
  name: string;
  email: string;
  accountType: string;
}

// Fetch full user info including name, email, and account type
export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const response = await fetch(
      'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/api/account/current',
      {
        credentials: 'include', // sends cookies
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data as CurrentUser; // cast response to expected shape
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
