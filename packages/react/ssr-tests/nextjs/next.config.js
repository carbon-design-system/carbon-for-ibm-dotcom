const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withProgressBar = require('next-progressbar');

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
          use: [
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
          ],
        });

        return config;
      },
    })
  )
);
