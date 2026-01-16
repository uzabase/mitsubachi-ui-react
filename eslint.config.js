import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // 基本設定
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React 設定
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // JSX A11y（アクセシビリティ）
      ...jsxA11y.configs.recommended.rules,

      // カスタムルール
      'react/prop-types': 'off', // TypeScript を使用するため不要
    },
  },

  // Prettier との競合を無効化（最後に配置）
  prettier,

  // 除外設定
  {
    ignores: [
      'node_modules/',
      'storybook-static/',
      'dist/',
      '*.config.js',
      '*.config.ts',
    ],
  }
);
