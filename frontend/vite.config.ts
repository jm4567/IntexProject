import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy': 
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
        "script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; " +
        "style-src * 'unsafe-inline' data: blob:; " +
        "img-src * data: blob:; " +
        "font-src * data: blob:; " +
        "connect-src * data: blob:; " +
        "frame-src *; " +
        "frame-ancestors *; " +
        "object-src *; " +
        "base-uri *; " +
        "form-action *;"
    },
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  },
});
