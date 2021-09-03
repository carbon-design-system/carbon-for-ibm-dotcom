/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Leadspace type
 */
export enum LEADSPACE_TYPE {
  /**
   * Left-aligned - small style of the leadspace title (default)
   */
  SMALL = 'small',

  /**
   * Left-aligned - large style of the leadspace title
   */
  LEFT = 'left',

  /**
   * Centered type of the LeadSpace
   */
  CENTERED = 'centered',
}

/**
 * Gradient style scheme.
 */
export enum LEADSPACE_GRADIENT_STYLE_SCHEME {
  /**
   * No gradient.
   */
  NONE = '',

  /**
   * With gradient.
   */
  WITH_GRADIENT = 'with-gradient',
}

/**
 * Leadspace size
 */
export enum LEADSPACE_SIZE {
  /**
   * Default - tall size of the leadspace (default)
   */
  NONE = '',

  /**
   * Tall - tall size of the leadspace
   */
  TALL = 'tall',

  /**
   * Short - short size of the leadspace
   */
  SHORT = 'short',

  /**
   * Medium - medium size of the leadspace
   */
  MEDIUM = 'medium',

  /**
   * Super - super size of the leadspace
   */
  SUPER = 'super',
}
