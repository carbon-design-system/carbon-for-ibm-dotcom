/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'babel-polyfill';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

jest.useFakeTimers();

global.__DEV__ = true;

require('../../../../tasks/jest/env');
require('../polyfills');

process.env.SCROLL_TRACKING = 'true';
