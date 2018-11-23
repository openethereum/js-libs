module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
    '!**/index.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'spec\\.(ts|tsx)$'
};
