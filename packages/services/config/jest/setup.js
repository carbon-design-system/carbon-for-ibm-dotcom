/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'babel-polyfill';

import { TextDecoder, TextEncoder } from 'util';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

jest.useFakeTimers();

global.__DEV__ = true;

// required for latest isomorphic-dompurify
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require('../../../../tasks/jest/env');
require('../polyfills');

process.env.SCROLL_TRACKING = 'true';
