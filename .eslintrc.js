module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['unused-imports', 'simple-import-sort', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Unused imports handling - automatically removes unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Auto-sort imports alphabetically
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // General code quality
    'no-console': ['warn', { allow: ['tron'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // React Native specific
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
  },
};
