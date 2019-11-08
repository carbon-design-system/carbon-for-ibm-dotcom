const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  env: {
    CORS_PROXY: 'https://dds-proxy.mybluemix.net/',
  },
  sassLoaderOptions: {
    includePaths: [path.resolve(__dirname, 'node_modules')],
  },
});
