// Defines the structure of a User object used throughout the application
export interface User {
  userId: number; // Unique identifier for the user
  name: string; // Full name of the user
  phone: string; // User's contact phone number
  email: string; // User's email address
  age: number; // User's age
  gender: string; // User's gender (e.g., 'Male', 'Female', 'Non-binary', etc.)
  city: string; // City of residence
  state: string; // State or region of residence
  zip: number; // ZIP or postal code
  subscription: string[]; // List of subscriptions or membership types the user has
}
