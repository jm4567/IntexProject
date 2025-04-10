// logout functionality
export const logoutUser = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};