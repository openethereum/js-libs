module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'semistandard',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/camelcase': ['error', { allow: ['keccak_256'] }],
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],

    // TODO: Remove all of these disabled rules.
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['*.spec.{ts,tsx}', 'testHelpers.ts'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
  ],
};
