/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default class MockMediaQueryList {
  private matches = false;

  constructor(matches: boolean) {
    this.matches = matches;
  }

  /**
   * @deprecated
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#instance_methods
   */
  addListener(fn: EventListener) {
    const { matches } = this;
    fn({ matches } as unknown as Event);
  }

  addEventListener(_eventName, fn: EventListener) {
    const { matches } = this;
    fn({ matches } as unknown as Event);
  }

  /**
   * @deprecated
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#instance_methods
   */
  removeListener(_fn) {} // eslint-disable-line class-methods-use-this

  removeEventListener(_eventName, _fn) {} // eslint-disable-line class-methods-use-this
}
