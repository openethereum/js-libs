const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  setupTestFrameworkScriptFile: '../../node_modules/jest-enzyme/lib/index.js'
};
