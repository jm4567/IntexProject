// Import Vite configuration utility and React plugin
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export Vite configuration
export default defineConfig({
  // Register React plugin to enable JSX and React Fast Refresh
  plugins: [react()],

  // Server configuration for local development
  server: {
    // Port to run the dev server on
    port: 3000,

    // Custom HTTP headers to enhance security
    headers: {
      // Content Security Policy: restricts sources for various types of content
      'Content-Security-Policy':
        "default-src 'self'; " + // Allow everything from the same origin by default
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; " + // Allow scripts from self and Google
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " + // Allow styles from Google Fonts and inline styles
        "img-src 'self' data: https://via.placeholder.com https://cdn.builder.io https://movieposters2025.blob.core.windows.net https://postersintex29.blob.core.windows.net; " + // Allow image sources from listed domains and data URIs
        "frame-ancestors 'none'; " + // Prevent embedding in frames
        "font-src 'self' https://fonts.gstatic.com data:; " + // Allow fonts from Google Fonts and data URIs
        "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com https://moviecollection-team209-backend-f6cdakf2a6avh8bt.eastus-01.azurewebsites.net; " + // Allow API connections to listed domains
        "object-src 'none'; " + // Disallow plugins like Flash
        "base-uri 'self'; " + // Restrict <base> tag to self
        "form-action 'self'; " + // Allow form submissions only to self
        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;", // Allow embedding frames only from Google auth domains
    },

    // CORS (Cross-Origin Resource Sharing) settings for development
    cors: {
      origin: 'http://localhost:3000', // Allow only this origin
      credentials: true, // Allow credentials (cookies, HTTP auth, etc.)
    },
  },
});
