/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

global.__DEV__ = true;

require('./env');

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  // TODO: replace with async version
  // setTimeout(callback);
  callback();
};

const enzyme = require.requireActual('enzyme');
const Adapter = require.requireActual('enzyme-adapter-react-16');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}

// const localStorage = new LocalStorageMock();

// jest test environment expects these to exist
// window.localStorage = localStorage

let storage;

beforeEach(() => {
  storage = window.localStorage();
  window.localStorage = new LocalStorageMock();
});

afterEach(() => {
  window.localStorage = storage;
});

enzyme.configure({ adapter: new Adapter() });
