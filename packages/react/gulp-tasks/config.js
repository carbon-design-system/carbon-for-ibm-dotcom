/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

module.exports = {
  carbonComponetsReactESSrcDir: path.resolve(
    path.dirname(require.resolve('carbon-components-react/package.json')),
    'es'
  ),
  carbonComponetsReactCJSSrcDir: path.resolve(
    path.dirname(require.resolve('carbon-components-react/package.json')),
    'lib'
  ),
  carbonComponetsReactVendorSrcDir: path.resolve(
    __dirname,
    '../src/internal/vendor/carbon-components-react'
  ),
  carbonComponetsReactVendorESDstDir: path.resolve(
    __dirname,
    '../es/internal/vendor/carbon-components-react'
  ),
  carbonComponetsReactVendorCJSDstDir: path.resolve(
    __dirname,
    '../lib/internal/vendor/carbon-components-react'
  ),
};
