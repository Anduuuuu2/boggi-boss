import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/.expo/**', 'apps/mobile/expo-env.d.ts'] },
  ...tseslint.configs.recommended,
  {
    // CommonJS config files loaded by Expo/Metro tooling.
    files: ['apps/mobile/*.config.js'],
    languageOptions: { sourceType: 'commonjs', globals: { require: 'readonly', module: 'writable', __dirname: 'readonly' } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
);
