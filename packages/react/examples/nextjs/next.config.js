const path = require('path');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

module.exports = withCSS(
  withSass({
    env: {
      CORS_PROXY: 'https://dds-proxy.mybluemix.net/',
    },
    sassLoaderOptions: {
      includePaths: [path.resolve(__dirname, 'node_modules')],
    },
  })
);
