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

  /**
   * End of section
   */
  END = 'end',
}

/**
 * Link list item type. Should mirror `LINK_LIST_TYPE` of parent `<dds-link-list>`.
 */
export enum LINK_LIST_ITEM_TYPE {
  /**
   * Default
   */
  DEFAULT = 'default',

  /**
   * End of Section variant - End
   */
  END = 'end',
}
