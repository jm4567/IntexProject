export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://localhost:5000/pingauth', {
      credentials: 'include',
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.email;
  } catch (error) {
    console.error('Error getting user email:', error);
    return null;
  }
};

export const getUserIdByEmail = async (
  email: string
): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://localhost:5000/api/users/userIdByEmail?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.userId;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};
