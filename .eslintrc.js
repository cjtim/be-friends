module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'next', 'next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'error',
    'no-unused-labels': 'error',
    'import/extensions': 0,
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'react/no-unstable-nested-components': 0,
  },
  globals: {
    React: true,
    google: true,
  },
}
