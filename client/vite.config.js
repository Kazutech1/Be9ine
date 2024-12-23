import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // For development, use local server or an API URL from environment variables
      '/api': process.env.VITE_API_URL || 'http://localhost:5000',
    },
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:5000'), // Define the API URL for production if needed
  },
});
