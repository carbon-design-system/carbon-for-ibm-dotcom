module.exports = {
  presets: ['./scripts/env'],
  plugins: [
    'dev-expression',
    'macros',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
  ],
};
