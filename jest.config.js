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
  // testRegex: 'spec\\.(ts|tsx)$' // TODO Skip api/ tests for now, as it's still WIP
  testRegex: `packages/(abi|electron|light\.js|light\.js-react)/.*spec\\.(ts|tsx)$`
};
