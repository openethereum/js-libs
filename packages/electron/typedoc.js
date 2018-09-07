module.exports = {
  entryPoint: 'docs',
  exclude: ['**/*spec.ts'],
  excludeExternals: true,
  excludePrivate: true,
  hideGenerator: true,
  includes: './src',
  out: 'docs',
  mode: 'file',
  module: 'commonjs',
  stripInternal: 'true',
  theme: 'markdown'
};
