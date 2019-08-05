import 'babel-polyfill';

jest.unmock('promise');
jest.unmock('whatwg-fetch');
jest.unmock('object-assign');

global.__DEV__ = true;

process.env.SEARCH_TYPEAHEAD_HOST = 'https://ibm.com';
process.env.SEARCH_TYPEAHEAD_VERSION = 'v1';
process.env.MARKETING_SEARCH_HOST = 'https://ibm.com';
process.env.MARKETING_SEARCH_VERSION = 'v1';

require('../polyfills');
