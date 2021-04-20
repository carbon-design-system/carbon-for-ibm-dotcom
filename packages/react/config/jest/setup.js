/**
 * Copyright IBM Corp. 2020, 2021
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

jest.mock('@carbon/ibmdotcom-services/lib/services/Locale/Locale', () =>
  require('./__mocks__/LocaleAPI')
);
jest.mock('@carbon/ibmdotcom-services/lib/services/Profile/Profile', () =>
  require('./__mocks__/ProfileAPI')
);
jest.mock(
  '@carbon/ibmdotcom-services/lib/services/VideoPlayer/VideoPlayer',
  () => require('./__mocks__/VideoPlayerAPI')
);
jest.mock('@carbon/ibmdotcom-services/lib/services/global/global', () => ({
  globalInit: jest.fn(() => {}),
}));

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
