import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './Painel': './src/Painel.tsx',
        './Explore': './src/Explore.tsx',
      },
      shared: ['react', 'react-dom', 'zustand', '@mui/material', '@emotion/react', '@emotion/styled'],
    }),
  ],
  server: {
    port: 5001,
    strictPort: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
