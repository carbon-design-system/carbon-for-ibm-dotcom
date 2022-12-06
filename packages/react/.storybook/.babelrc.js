/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const babelConfigFile = require('../babel.config');

const root = path.resolve(__dirname, '../');
const babelConfig = Object.keys(babelConfigFile).reduce((acc, key) => {
  const options = babelConfigFile[key].map((option) => {
    // If the preset/plugin is not a relative path, we can use it directly
    if (option[0] !== '.') {
      return option;
    }
    // Otherwise, resolve the full path for storybook to work as intended
    return path.resolve(root, option);
  });

  return {
    ...acc,
    [key]: options,
  };
}, {});

babelConfig.plugins.push('transform-inline-environment-variables');

module.exports = babelConfig;
