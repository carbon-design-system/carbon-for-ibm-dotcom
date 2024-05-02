/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
const { stablePrefix: c4dPrefix } = settings;

/**
 * Type of orientation for the Tabs Extended
 */
export enum ORIENTATION {
  /**
   * Horizontal (default)
   */
  HORIZONTAL = 'horizontal',

  /**
   * Vertical
   */
  VERTICAL = 'vertical',
}

/**
 * Tabs types.
 */
export enum TABS_TYPE {
  /**
   * Regular tabs.
   */
  REGULAR = '',

  /**
   * Contained type.
   */
  CONTAINED = 'contained',
}

/**
 * An event that fires whenever the tab's selected state changes.
 */
export const eventTabSelected = `${c4dPrefix}-tab-selected`;
