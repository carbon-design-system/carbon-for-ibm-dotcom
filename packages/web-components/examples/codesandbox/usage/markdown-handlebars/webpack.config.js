/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const Handlebars = require('handlebars');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: markdownToHtml } = require('@carbon/ibmdotcom-utilities/lib/utilities/markdownToHtml/markdownToHtml');

const templateCache = {};

Handlebars.registerHelper('markdown', options => {
  return new Handlebars.SafeString(markdownToHtml(options.fn(this)));
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // `autoprefixer` is a requirement for Carbon core Sass code
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                includePaths: ['node_modules'],
                // `enable-css-custom-properties` and `grid-columns-16` feature flags
                // are requirements for Carbon for IBM.com styles
                data: `
                  $feature-flags: (
                    enable-css-custom-properties: true,
                    grid-columns-16: true,
                  );
                `,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Puts `.hbs` file into WebPack Dev Server's virtual file system.
    // If you have other means to load `.hbs` file, this is not needed.
    new HtmlWebpackPlugin({
      template: 'index.hbs',
      filename: 'index.hbs',
      minify: {
        preserveLineBreaks: true,
      },
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    setup(app, server) {
      app.get('/', (req, res) => {
        const { fileSystem, waitUntilValid } = server.middleware;
        waitUntilValid(async () => {
          // Renders the Handlebars template from the data
          const filename = path.resolve(__dirname, 'dist/index.hbs');
          if (!templateCache[filename]) {
            templateCache[filename] = Handlebars.compile(fileSystem.readFileSync(filename).toString());
          }
          res.setHeader('Content-Type', 'text/html');
          res.setHeader('Cache-Control', 'public, max-age=0');
          res.send(templateCache[filename]());
          res.end();
        });
      });
    },
  },
};
