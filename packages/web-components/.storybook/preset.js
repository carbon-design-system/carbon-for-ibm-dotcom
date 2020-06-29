/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const webpack = require('webpack');

module.exports = {
  async managerWebpack(config) {
    // `@storybook/react` NPM installation seems to add `@babel/preset-react` automatically
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        IBMDOTCOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES: 'false',
      })
    );
    return config;
  },
};
