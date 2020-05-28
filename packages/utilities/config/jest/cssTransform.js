/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/tutorial-webpack.html
module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCachekey() {
    // The output is always the same
    return 'cssTransform';
  },
};
