/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Constructor } from '../../globals/defs';
import { breakpoints as BXBreakpoints } from '@carbon/layout';
import root from 'window-or-global';

export enum MQBreakpoints {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XLG = 'xlg',
  MAX = 'max',
}

export enum MQDirs {
  MIN = 'min',
  MAX = 'max',
}

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic for performing actions when the
 * viewport width crosses over configured Carbon breakpoints.
 */
const MediaQueryMixin = <T extends Constructor<HTMLElement>>(
  Base: T,
  config: { [Property in MQBreakpoints]?: MQDirs }
) => {
  abstract class MediaQueryMixinImpl extends Base {
    /**
     * Configuration passed as argument into MediaQueryMixin.
     */
    _mqConfig = config;

    /**
     * Generates a list of MediaQueryList objects keyed by breakpoint identifiers.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
     */
    _generateMediaQueriesByBreakpoint(): { [index: string]: MediaQueryList } {
      const { _mqConfig: config } = this;

      const breakpoints = Object.keys(config) as MQBreakpoints[];
      const queries: { [Property in MQBreakpoints]?: MediaQueryList } = {};
      breakpoints.forEach((bp) => {
        queries[bp] = root.matchMedia(
          `(${config[bp]}-width: ${BXBreakpoints[bp].width})`
        );
      });
      return queries;
    }

    /**
     * A keyed list of MediaQueryList objects.
     */
    carbonBreakpoints = this._generateMediaQueriesByBreakpoint();

    /**
     * Sets up event listeners that fire any defined callback methods that
     * correspond to the breakpoint being crossed over.
     *
     * Example callback method names:
     *  - mediaQueryCallbackSM
     *  - mediaQueryCallbackLG
     *  - mediaQueryCallbackMaxMD
     *  - mediaQueryCallbackMaxMAX
     */
    _attachMediaQueryEventListeners() {
      const { _mqConfig: config, carbonBreakpoints } = this;

      Object.keys(carbonBreakpoints).forEach((bp) => {
        const dir =
          config[bp] === MQDirs.MAX
            ? `${config[bp][0].toUpperCase()}${config[bp].slice(1)}`
            : '';
        const funcName = `mediaQueryCallback${dir}${bp.toUpperCase()}`;
        if (typeof this[funcName] === 'function') {
          this.carbonBreakpoints[bp].addEventListener(
            'change',
            this[funcName].bind(this)
          );
        } else {
          console.warn(
            `MediaQueryMixin: Element ${this.nodeName} has not defined a callback for the "${bp}" breakpoint. Please remove the breakpoint from the mixin configuration or implement the following method: ${funcName}`
          );
        }
      });
    }

    firstUpdated() {
      this._attachMediaQueryEventListeners();
      //@ts-ignore
      super.firstUpdated();
    }
  }

  return MediaQueryMixinImpl;
};

export type MediaQueryMixinImpl = InstanceType<
  ReturnType<typeof MediaQueryMixin>
>;

export default MediaQueryMixin;
