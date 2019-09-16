import 'babel-polyfill';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

global.__DEV__ = true;

require('../../../../tasks/jest/env');
require('../polyfills');
