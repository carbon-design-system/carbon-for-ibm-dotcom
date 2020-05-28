/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

global.__DEV__ = true;

delete global.window.location;
global.window = Object.create(window);
global.window.location = {
  port: '80',
  protocol: 'http:',
  hostname: 'localhost',
  href: 'http://localhost',
};
