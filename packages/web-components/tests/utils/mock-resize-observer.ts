/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MockLayoutObserver from './mock-layout-observer';

/**
 * A mock version of `ResizeObserver`.
 */
class MockResizeObserver extends MockLayoutObserver {
  /**
   * The instances.
   */
  protected static _instances = new Set<MockResizeObserver>();

  /**
   * Triggers the callbacks on an element.
   *
   * @param elem The element.
   */
  static run(elem: Element, contentRect: Partial<ClientRect>) {
    this._instances.forEach((instance) => {
      if (instance._callback && instance._targets.has(elem)) {
        instance._callback(
          [
            {
              contentRect,
              target: elem,
            } as unknown as IntersectionObserverEntry,
          ],
          instance as unknown as IntersectionObserver
        );
      }
    });
  }
}

export default MockResizeObserver;
