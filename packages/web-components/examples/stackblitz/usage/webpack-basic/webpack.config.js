/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    // Lets WebPack Dev Server serve `.html` file.
    // If you have other means to server `.html` content, this is not needed.
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
