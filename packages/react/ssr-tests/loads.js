/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Simple test to ensure the components can at least be loaded in Node.js
// Note: this test is *not* run by Jest because Jest's polyfills mask some errors

'use strict';

var assert = require('assert');
var carbonComponentsReact = require('../lib');
assert(carbonComponentsReact);
console.log('server-side-rendering load test passed'); // eslint-disable-line no-console
