/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import throttle from 'lodash-es/throttle';
import on from 'carbon-components/es/globals/js/misc/on.js';
import Handle from '../internal/handle';

import { Constructor } from '../defs';

/**
 * @param Base The base class.
 * @returns A mix-in that handles `input` event and makes throtted calls to `_handleThrottledInput`.
 */
const ThrottledInputMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class ThrottledInputMixinImpl extends Base {
    /**
     * Handles the throttled `input` event.
     *
     * @param event The event.
     * @protected
     */
    abstract _handleThrottledInput(event: InputEvent): void;

    /**
     * The handle for the listener of `input` event.
     *
     * @private
     */
    _hInputToBeThrottled: Handle | null = null;

    /**
     * The throttled listener of `input` event.
     *
     * @private
     */
    _throttledHandleInput: (((event: InputEvent) => void) & { cancel(): void }) | null = null;

    /**
     * Handles `input` event on the search box.
     *
     * @param event The event.
     * @private
     */
    _invokeHandleThrottledInput(event: InputEvent) {
      this._throttledHandleInput?.(event);
    }

    /**
     * Updates the throttled listener of `input` event upon change in `inputTimeout`.
     *
     * @private
     */
    _updateThrottledHandleInput() {
      if (this._throttledHandleInput) {
        this._throttledHandleInput.cancel();
        this._throttledHandleInput = null;
      }
      this._throttledHandleInput = throttle(this._handleThrottledInput, this.inputTimeout);
    }

    /**
     * The throttle timeout to run query upon user input.
     */
    inputTimeout = 200;

    connectedCallback() {
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.connectedCallback();
      const { eventInput } = this.constructor as typeof ThrottledInputMixinImpl;
      this._hInputToBeThrottled = on(this, eventInput, this._invokeHandleThrottledInput as EventListener);
      this._updateThrottledHandleInput();
    }

    disconnectedCallback() {
      if (this._throttledHandleInput) {
        this._throttledHandleInput.cancel();
        this._throttledHandleInput = null;
      }
      if (this._hInputToBeThrottled) {
        this._hInputToBeThrottled = this._hInputToBeThrottled.release();
      }
      // TS seems to miss `HTMLElement.prototype.disconnectedCallback()` definition
      // @ts-ignore
      super.disconnectedCallback();
    }

    updated(changedProperties) {
      if (changedProperties.has('inputTimeout')) {
        this._updateThrottledHandleInput();
      }
    }

    /**
     * The event that represents the user input gesture.
     */
    static eventInput = 'input';
  }
  return ThrottledInputMixinImpl;
};

export default ThrottledInputMixin;
