import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    pool: 'forks',
    clearMocks: true,
    restoreMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit-server',
          environment: 'node',
          include: ['src/tests/server/**/*.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'unit-client',
          environment: 'jsdom',
          include: ['src/tests/client/**/*.spec.tsx', 'src/tests/client/**/*.spec.ts'],
        },
      },
    ],
  },
});
