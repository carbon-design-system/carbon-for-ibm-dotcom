/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  rules: {
    "jsdoc/require-jsdoc": 0,
    "react/prop-types": 0
  },
  globals: {
    achecker: true,
    describe: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true,
    it: true,
    expect: true,
    page: true
  },
};
