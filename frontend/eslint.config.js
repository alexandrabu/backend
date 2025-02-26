const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const prettier = require('eslint-plugin-prettier');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    files: ['src/**/*.{js,jsx}'],
    ignores: ['node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['src/**/*.{test.js,test.jsx}'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        expect: 'readonly',
        test: 'readonly',
      },
    },
  },
];
