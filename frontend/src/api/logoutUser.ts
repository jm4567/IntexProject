// logout functionality
export const logoutUser = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      'https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net/logout',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
