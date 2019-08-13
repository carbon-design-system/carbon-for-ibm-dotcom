module.exports = {
  presets: ['./scripts/env', '@babel/preset-react'],
  plugins: [
    'dev-expression',
    'macros',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-runtime',
  ],
};
