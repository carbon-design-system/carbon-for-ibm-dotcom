/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const del = require('del');

const config = require('./config');

module.exports = function clean() {
  return Promise.all([
    del(config.bundleDestDir),
    del(config.jsDestDir),
    del(config.sassDestDir),
    del('custom-elements.json'),
    del('storybook-static'),
  ]);
};
