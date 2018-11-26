module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
    '!**/index.ts'
  ],
  // Adding this because "Cannot use namespace '...' as a type."
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true
      }
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: '.',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testRegex: 'spec\\.(ts|tsx)$'
};
