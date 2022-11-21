/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A mock version of `ResizeObserver` or `IntersectionObserver`.
 */
abstract class MockLayoutObserver {
  /**
   * The callback.
   */
  protected _callback?: IntersectionObserverCallback;

  /**
   * The options.
   */
  protected _options: IntersectionObserverInit = {};

  /**
   * The observed elements.
   */
  protected _targets = new Set<Element>();

  /**
   * The instances.
   */
  protected static _instances = null! as Set<MockLayoutObserver>;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this._callback = callback;
    if (options) {
      Object.assign(this._options, options);
    }
  }

  /**
   * Unobserves all elements.
   */
  disconnect() {
    this._targets.forEach((target) => {
      this.unobserve(target);
    });
  }

  /**
   * Observes the given element.
   */
  observe(elem: Element) {
    this._targets.add(elem);
    (this.constructor as typeof MockLayoutObserver)._instances.add(this);
  }

  /**
   * Unobserves the given element.
   */
  unobserve(elem: Element) {
    this._targets.delete(elem);
    if (this._targets.size === 0) {
      (this.constructor as typeof MockLayoutObserver)._instances.delete(this);
    }
  }

  /**
   * @returns The array of options of all instances.
   */
  static get instanceOptions() {
    return Array.from(this._instances).map((instance) => instance._options);
  }
}

export default MockLayoutObserver;
