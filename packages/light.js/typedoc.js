module.exports = {
  exclude: ['**/*spec.ts', '**/index.ts'],
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  hideGenerator: true,
  includes: './src',
  out: 'docs/api',
  module: 'commonjs',
  mdEngine: 'gitbook',
  stripInternal: 'true',
  theme: 'markdown'
};
