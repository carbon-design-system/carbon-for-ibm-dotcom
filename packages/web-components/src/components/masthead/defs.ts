/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The style scheme for the megamenu link with icon.
 */
export enum MEGAMENU_LINK_WITH_ICON_STYLE_SCHEME {
  /**
   * view all link style.
   */
  VIEW_ALL = 'view-all',

  /**
   * category headline link style.
   */
  CATEGORY_HEADLINE = 'category-headline',

  /**
   * category sublink style.
   */
  CATEGORY_SUBLINK = 'category-sublink',

  /**
   * default link style.
   */
  DEFAULT = 'default',
}

/**
 * The style scheme for the right navigation.
 */
export enum MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME {
  /**
   * Right navigation spans full width of megamenu.
   */
  FULL = 'full',

  /**
   * Megamenu has a sidebar (e.g. tabbed layout).
   */
  HAS_SIDEBAR = 'has-sidebar',
}

/**
 * The layout options for rendering a megamenu
 */
export enum MEGAMENU_LAYOUT_SCHEME {
  TAB = 'tab',
  LIST = 'list',
}

/**
 * Matches CMaaS's CTA options.
 *
 * @see https://github.ibm.com/live-advisor/cm-app/blob/master/docs/cm-doc.md#calls-to-action
 */
export enum L1_CTA_TYPES {
  NONE = '',
  CONTACT_US = 'contact',
  CHAT_NOW = 'chat',
  EMAIL_US = 'email',
  CALL_US = 'phone',
  BOOK_A_CONSULTATION = 'scheduler',
  REQUEST_A_DEMO = 'demo',
  REQUEST_A_QUOTE = 'quote',
}
