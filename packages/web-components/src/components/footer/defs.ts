/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Footer size.
 */
export enum FOOTER_SIZE {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Short size.
   */
  SHORT = 'short',

  /**
   * Micro size.
   */
  MICRO = 'micro',
}

/**
 * The style scheme of language selector.
 */
export enum LANGUAGE_SELECTOR_STYLE_SCHEME {
  /**
   * Regular style scheme.
   */
  REGULAR = '',

  /**
   * The style scheme that's blendid into outer style scheme.
   * The primary use case is for used in micro footer.
   */
  BLENDED = 'blended',
}
