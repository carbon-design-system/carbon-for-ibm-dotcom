/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

declare namespace jasmine {
  interface Matchers<T> {
    toMatchSnapshot(options?: { mode: string }): boolean;
  }
}

// Though we don't use `toMatchSnapshot()` custom matcher in Jest environment,
// below is a workaround for TS errors by TS presumably thinking the matchers are of Jest ones even in Karma tests.
declare namespace jest {
  interface Matchers<T> {
    toMatchSnapshot(options?: { mode: string }): boolean;
  }
}
