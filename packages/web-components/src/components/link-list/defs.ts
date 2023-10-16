/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Link list type
 */
export enum LINK_LIST_TYPE {
  /**
   * Default
   */
  DEFAULT = 'default',

  /**
   * Vertical
   */
  VERTICAL = 'vertical',

  /**
   * Horizontal
   */
  HORIZONTAL = 'horizontal',
}

/**
 * Link list item type. Should mirror `LINK_LIST_TYPE` of parent `<c4d-link-list>`.
 */
export enum LINK_LIST_ITEM_TYPE {
  /**
   * Default
   */
  DEFAULT = 'default',
}
