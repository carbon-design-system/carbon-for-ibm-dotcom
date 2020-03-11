const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withProgressBar = require('next-progressbar');

const styleLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        const autoPrefixer = require('autoprefixer')({
          overrideBrowserslist: ['last 1 version', 'ie >= 11'],
        });
        return [autoPrefixer];
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [path.resolve(__dirname, 'node_modules')],
      data: `
      $feature-flags: (
        ui-shell: true,
        grid-columns-16: true,
      );
    `,
      sourceMap: true,
    },
  },
];

module.exports = withProgressBar(
  withSass(
    withCSS({
      env: {
        CORS_PROXY: 'https://dds-proxy.mybluemix.net/',
      },
      sassLoaderOptions: {
        includePaths: [path.resolve(__dirname, 'node_modules')],
      },
      webpack: config => {
        config.module.rules.push({
          test: /\.scss$/,
          sideEffects: true,
          use: [...styleLoaders],
        });

        return config;
      },
    })
  )
);
