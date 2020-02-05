const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withCSS({
    env: {
      CORS_PROXY: 'https://dds-proxy.mybluemix.net/',
    },
    sassLoaderOptions: {
      includePaths: [path.resolve(__dirname, 'node_modules')],
    },
    webpack: config => {
      // if (config.resolve.alias) {
      //   delete config.resolve.alias['react'];
      //   delete config.resolve.alias['react-dom'];
      // }

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
);
