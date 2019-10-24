'use strict';

require('babel-polyfill');

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign()
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
