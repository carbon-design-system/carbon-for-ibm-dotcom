'use strict';

const BABEL_ENV = process.env.BABEL_ENV;

module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ],
});
