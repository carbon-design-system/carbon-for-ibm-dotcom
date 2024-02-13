/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import rangePlugin, { Config } from 'flatpickr/dist/plugins/rangePlugin';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';
import Handle from '../../globals/internal/handle';

/**
 * `FlatpickrInstance` with additional properties used for `range` plugin.
 */
export interface ExtendedFlatpickrInstanceRangePlugin
  extends FlatpickrInstance {
  /**
   * The handle for `blur` event handler for from date range input.
   */
  _hBXCEDatePickerRangePluginOnBlurFrom?: Handle | null;

  /**
   * The handle for `blur` event handler for to date range input.
   */
  _hBXCEDatePickerRangePluginOnBlurTo?: Handle | null;
}

/**
 * @param config Plugin configuration.
 * @returns
 *   An extension of Flatpickr `rangePlugin` that does the following:
 *
 *   Better ensures the calendar dropdown is always aligned to the `<input>` for the starting date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1944
 *   Disables the logic in Flatpickr `rangePlugin` that calculates the new range with the old selected date
 *     when user selects a date from calendar dropdown.
 *     We'd like to reset the selection when user re-opens calendar dropdown and re-selects a date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1958
 *   Disables the logic in Flatpickr `rangePlugin` that closes the calendar dropdown
 *     when it's launched from the `<input>` for the end date and user selects a date.
 *     Workaround for: https://github.com/flatpickr/flatpickr/issues/1958
 *   Ensures that the `<input>` in shadow DOM is treated as part of Flatpickr UI,
 *     by ensuring such `<input>` hits `.contains()` search from `fp.config.ignoredFocusElements`.
 *     Without that, Flatpickr clears the `<input>` when end date hasn't been selected yet (which we don't want).
 */
export default (config: Config): Plugin => {
  const factory = rangePlugin({ position: 'left', ...config });
  return (fp: ExtendedFlatpickrInstanceRangePlugin) => {
    const origRangePlugin = factory(fp);
    const { onReady: origOnReady } = origRangePlugin;

    return Object.assign(origRangePlugin, {
      onReady() {
        origOnReady.call(this);
        const { ignoredFocusElements } = fp.config;
        ignoredFocusElements.push(
          ...ignoredFocusElements
            .map((elem) => elem.shadowRoot as any)
            .filter(Boolean)
        );
      },
    });
  };
};
