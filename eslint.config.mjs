import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next';
import nextTypeScript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...next,
  ...nextTypeScript,
  prettier,
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/index.ts',
  ]),
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['.*'],
              message: 'Please use absolute imports instead.',
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
