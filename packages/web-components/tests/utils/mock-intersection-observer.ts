/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MockLayoutObserver from './mock-layout-observer';

/**
 * A mock version of `IntersectionObserver`.
 */
class MockIntersectionObserver extends MockLayoutObserver {
  /**
   * The instances.
   */
  protected static _instances = new Set<MockIntersectionObserver>();

  /**
   * Triggers the callbacks on an element.
   *
   * @param elem The element.
   * @param isIntersecting `true` to mark the element as intersecting.
   */
  static run(elem: Element, isIntersecting: boolean) {
    this._instances.forEach(instance => {
      if (instance._callback && instance._targets.has(elem)) {
        instance._callback(
          [
            {
              isIntersecting,
              target: elem,
            } as IntersectionObserverEntry,
          ],
          (instance as unknown) as IntersectionObserver
        );
      }
    });
  }
}

export default MockIntersectionObserver;
