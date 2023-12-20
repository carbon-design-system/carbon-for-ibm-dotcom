/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Lets WebPack Dev Server serve `.html` file.
    // If you have other means to server `.html` content, this is not needed.
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false,
    }),
  ],
  output: {
    library: 'index',
    filename: 'index.js',
  },
};
