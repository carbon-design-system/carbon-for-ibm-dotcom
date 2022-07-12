/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function config(entry = []) {
  return [...entry, require.resolve('./decorators.js')];
}

module.exports = {
  config,
};
