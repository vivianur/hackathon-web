import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',

    include: [
      './apps/profile/src/**/*.test.{ts,tsx}',
      './apps/dashboard/src/**/*.test.{ts,tsx}',
      './apps/tasks/src/**/*.test.{ts,tsx}',
      './apps/shell/src/**/*.test.{ts,tsx}',
    ],
    setupFiles: ['./packages/shared/vite.setup.ts'],
  },
})