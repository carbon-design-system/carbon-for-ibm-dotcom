/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A quick link item in mega panel.
 */
export interface MegapanelQuickLink {
  title: string;
  url?: string;
}

/**
 * A quick links in mega panel.
 */
export interface MegapanelQuickLinks {
  title: string;
  links: MegapanelQuickLink[];
}

/**
 * A feature in mega panel.
 */
export interface MegapanelFeature {
  heading?: string;
  imageUrl?: string;
  linkTitle?: string;
  linkUrl?: string;
}

/**
 * A content in mega panel.
 */
export interface MegapanelContent {
  headingTitle?: string;
  headingUrl?: string;
  description?: string;
  quickLinks: MegapanelQuickLinks;
  feature: MegapanelFeature;
}

/**
 * A menu item in masthead.
 */
export interface MastheadMenuItem {
  title: string;
  url?: string;
  megapanelContent?: MegapanelContent;
}

/**
 * A menu section in masthead.
 */
export interface MastheadMenuSection {
  heading?: string;
  menuItems: MastheadMenuItem[];
}

/**
 * An item in masthead.
 */
export interface MastheadLink {
  title: string;
  url?: string;
  hasMenu?: boolean;
  hasMegapanel?: boolean;
  menuSections?: MastheadMenuSection[];
}

/**
 * The translation data for ibm.com sites
 */
export interface Translation {
  mastheadNav: {
    /**
     * The nav links.
     */
    links: MastheadLink[];
  };
}

/**
 * The Redux action ID for `TranslationAPI`.
 */
export enum TRANSLATE_API_ACTION {
  /**
   * One to set the state that the REST call for translation data that is in progress.
   */
  SET_REQUEST_TRANSLATION_IN_PROGRESS = 'SET_REQUEST_TRANSLATION_IN_PROGRESS',

  /**
   * One to set the state that the REST call for translation data failed.
   */
  SET_ERROR_REQUEST_TRANSLATION = 'SET_ERROR_REQUEST_TRANSLATION',

  /**
   * One to set the given translation data.
   */
  SET_TRANSLATION = 'SET_TRANSLATION',
}

/**
 * A Redux substate for `TranslateAPI`.
 */
export interface TranslateAPIState {
  /**
   * The translation data, keyed by the language.
   */
  translations?: { [language: string]: Translation };

  /**
   * The requests for the translation data, keyed by the language.
   */
  requestsTranslation?: { [language: string]: Promise<Translation> };

  /**
   * The status of whether requests for the translation data are in progress, keyed by the language.
   */
  requestsTranslationInProgress?: { [language: string]: boolean };

  /**
   * The errors from the requests for the translation data, keyed by the language.
   */
  errorsRequestTranslation?: { [language: string]: Error };
}
