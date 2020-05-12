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

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
