/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

require('babel-polyfill');

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign()
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
