import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Forward /api calls to the Express backend
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
});
