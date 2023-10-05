/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Type of the HR
 */
export enum HR_TYPE {
  /**
   * solid type of hr
   */
  SOLID = 'solid',

  /**
   * dashed/dotted type of hr
   */
  DASHED = 'dashed',
}

/**
 * Length of the HR
 */
export enum HR_SIZE {
  /**
   * fluid length of hr, takes full width of the grid
   */
  FLUID = 'fluid',

  /**
   * Small length of hr
   */
  SMALL = 'small',

  /**
   * Medium length of hr
   */
  MEDIUM = 'medium',

  /**
   * Large length of hr
   */
  LARGE = 'large',
}

/**
 * Contrast of the HR
 */
export enum HR_CONTRAST {
  /**
   * subtle contrast of hr
   */
  SUBTLE = 'subtle',

  /**
   * strong default contrast of hr
   */
  STRONG = 'strong',
}

/**
 * Weight of the HR
 */
export enum HR_WEIGHT {
  /**
   * thin weight of hr
   */
  THIN = 'thin',

  /**
   * thick weight of hr
   */
  THICK = 'thick',
}
