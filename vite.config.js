import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { ziggyPlugin } from 'laravel-vite-plugin/ziggy'; 

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/app.jsx',
      ],
      refresh: true,
    }),
    react(),
    ziggyPlugin(), 
  ],
  resolve: {
    alias: {
      '@': '/resources/js',
      '@css': '/resources/css',
    },
  },
});
