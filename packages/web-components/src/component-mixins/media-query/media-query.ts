/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Constructor } from '../../globals/defs';
import { breakpoints } from '@carbon/layout';

const queriesByBreakpoint: { [index: string]: MediaQueryList } = {};
for (let [key, val] of Object.entries(breakpoints)) {
  queriesByBreakpoint[key] = window.matchMedia(
    `(max-width: ${(val as any).width})`
  );
}

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic for performing actions when the
 * viewport width crosses over Carbon breakpoints.
 */
const MediaQueryMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class MediaQueryMixinImpl extends Base {
    /**
     * A keyed list of MediaQueryList objects that indicate when we've crossed
     * over Carbon breakpoint thresholds.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
     */
    _mediaQueries = { ...queriesByBreakpoint };

    /**
     * Sets up event listeners that fire any defined callback methods that
     * correspond to the breakpoint being crossed over.
     *
     * Example callback method names:
     *  - mediaQueryCallbackSM
     *  - mediaQueryCallbackLG
     *  - mediaQueryCallbackMAX
     */
    firstUpdated() {
      Object.keys(breakpoints).forEach((bp) => {
        const funcName = `mediaQueryCallback${bp.toUpperCase()}`;
        if (typeof this[funcName] === 'function') {
          this._mediaQueries[bp].addEventListener(
            'change',
            this[funcName].bind(this)
          );
        }
      });
    }
  }

  return MediaQueryMixinImpl;
};

export type MediaQueryMixinImpl = InstanceType<
  ReturnType<typeof MediaQueryMixin>
>;

export default MediaQueryMixin;
