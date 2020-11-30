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
const acceptLanguageParser = require('accept-language-parser');
const Handlebars = require('handlebars');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rtlDetect = require('rtl-detect');

const templateCache = {};
const reCssBundle = /\.css\.js$/i;

const devServer = {
  contentBase: path.resolve(__dirname, 'src'),
  setup(app, server) {
    app.get('/', (req, res) => {
      const { fileSystem, waitUntilValid } = server.middleware;
      waitUntilValid(async () => {
        // Determins user's preferred language
        const { code, region } = acceptLanguageParser.parse(req.headers['accept-language'])[0];
        const dir = !rtlDetect.isRtlLang(code) ? 'ltr' : 'rtl';
        // Renders the Handlebars template from the data
        const filename = path.resolve(__dirname, 'dist/index.hbs');
        if (!templateCache[filename]) {
          templateCache[filename] = Handlebars.compile(fileSystem.readFileSync(filename).toString());
        }
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'public, max-age=0');
        res.send(
          templateCache[filename]({
            dir,
            lang: !region ? code : `${code}-${region}`,
          })
        );
        res.end();
      });
    });
  },
};

function getConfig(dir) {
  return {
    output: {
      filename: `bundle-${dir}.js`,
    },
    plugins: [
      // Puts `.hbs` file into WebPack Dev Server's virtual file system.
      // If you have other means to load `.hbs` file, this is not needed.
      new HtmlWebpackPlugin({
        template: 'index.hbs',
        filename: 'index.hbs',
        inject: false,
      }),
      // Uses `.rtl.css.js` instead of `.css.js` for RTL bundle
      new webpack.NormalModuleReplacementPlugin(reCssBundle, resource => {
        if (dir === 'rtl') {
          resource.request = resource.request.replace(reCssBundle, '.rtl.css.js');
        }
      }),
    ],
  };
}

module.exports = [Object.assign(getConfig('ltr'), { devServer }), getConfig('rtl')];
