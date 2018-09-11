module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/*.d.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: '.',
  silent: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  // testRegex: 'spec\\.(ts|tsx)$' // TODO Skip api/ tests for now, as it's still WIP
  testRegex: `packages/(abi|electron|light\.js|light\.js-react)/.*spec\\.(ts|tsx)$`
};
