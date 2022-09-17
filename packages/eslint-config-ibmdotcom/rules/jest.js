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
  overrides: [

    
    {
      "files": ["packages/react/tests/**/*.js"],
      "globals": {
    //     "describe": true,
    //     "beforeAll": true,
    //     "beforeEach": true,
    //     "afterAll": true,
    //     "afterEach": true,
    //     "it": true,
    //     "expect": true,
        "aChecker": true
      },
    //   "rules": {
    //     "no-new": 0,
    //     "no-underscore-dangle": 0,
    //     "no-unused-expressions": 0
    //   }
    },
  ],
};
 