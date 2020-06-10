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

jest.mock('@carbon/ibmdotcom-services', () => ({
  LocaleAPI: require('./__mocks__/LocaleAPI'),
  VideoPlayerAPI: require('./__mocks__/VideoPlayerAPI'),
  globalInit: jest.fn(() => {}),
}));

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
