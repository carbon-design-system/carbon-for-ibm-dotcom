/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Constructor } from '../../globals/defs';

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic for performing an action when the
 * viewport width crosses over a configurable breakpoint.
 */
const MediaQueryMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class MediaQueryMixinImpl extends Base {
    /**
     * A MediaQueryList object that indicates when we've crossed over the
     * breakpoint threshold.
     *
     * Magic Number: The default, 1056px, matches 'carbon--breakpoint(lg)' mixin.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
     */
    _mediaQuery: MediaQueryList = window.matchMedia(`(max-width: 1056px)`);

    /**
     * The method that is invoked when crossing over the breakpoint.
     */
    abstract mediaQueryCallback(): void;

    firstUpdated() {
      this._mediaQuery.addEventListener(
        'change',
        this.mediaQueryCallback.bind(this)
      );
    }
  }

  return MediaQueryMixinImpl;
};

export type MediaQueryMixinImpl = InstanceType<
  ReturnType<typeof MediaQueryMixin>
>;

export default MediaQueryMixin;
