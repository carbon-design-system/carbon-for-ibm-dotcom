/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A link item.
 * Used for masthead, footer, etc.
 */
export interface BasicLink {
  title: string;
  titleEnglish?: string;
  highlightedLink?: boolean;
  url?: string;
  description?: string;
  target?: string;
}

/**
 * A set of links.
 * Used for masthead, footer, etc.
 */
export interface BasicLinkSet {
  title: string;
  links: BasicLink[];
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
  quickLinks: BasicLinkSet;
  feature: MegapanelFeature;
}

/**
 * A menu item in masthead.
 */
export interface MastheadMenuItem {
  title: string;
  titleEnglish?: string;
  url?: string;
  highlighted?: boolean;
  megaPanelViewAll?: boolean;
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
  titleEnglish?: string;
  url?: string;
  hasMenu?: boolean;
  hasMegapanel?: boolean;
  megamenuLayout?: 'tab' | 'list';
  menuSections?: MastheadMenuSection[];
}

/**
 * A menu section for masthead
 * @deprecated
 */
export interface LegacyMastheadL1 {
  title: string;
  url?: string;
  menuItems?: MastheadLink[];
}

/**
 * A menu section for masthead
 */
export interface MastheadL1 {
  title: string;
  url?: string;
  menuItems: L1MenuItem[];
  actions?: {
    cta?: BasicLink;
    login?: BasicLink;
  };
}

export interface L1MenuItem extends BasicLink {
  submenu?: L1Submenu;
}

export interface L1Submenu {
  announcement?: string; // From AEM rich text editor
  menuSections: L1SubmenuSection[]; // maximum of 3 in outer array
  columns: 1 | 2 | 3;
  footer?: {
    title: string;
    url: string;
  };
}

export interface L1SubmenuSection {
  span: 1 | 2; // Only used if containing L1Submenu.columns === 3.
  heading?: L1SubmenuSectionHeading;
  items?: BasicLink[];
}

export interface L1SubmenuSectionHeading {
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  title: string;
  url?: string;
  description?: string;
}

/**
 * An profile item in masthead.
 */
export interface MastheadProfileItem {
  /**
   * The title text.
   */
  title: string;
  /**
   * The id of the profile item.
   */
  id?: string;
  /**
   * The link URL.
   */
  url?: string;
}

/**
 * Labels object for leaving ibm component
 */
export interface LeavingIBMLabels {
  LEAVING001: string;
  LEAVING002: string;
  LEAVING003: string;
}

/**
 * Masthead logo tooltip
 */
export interface MastheadLogoData {
  svg?: string;
  tooltip?: string;
  denylist: [];
  allowlist: [];
  end: string;
  path: string;
  href: string;
}

/**
 * Cloud Masthead Profile content
 */
export interface MastheadProfileContent {
  iconLabel: string;
  links: MastheadProfileItem[];
  ctaButtons: MastheadProfileItem[];
  contactUsButton: string;
}

/**
 * Misc labels
 */
export interface MiscLabels {
  continueText: string;
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

  /**
   * The link sets for footer menu.
   */
  footerMenu: BasicLinkSet[];

  /**
   * The compact version of the links for footer menu.
   */
  footerThin: BasicLink[];

  /**
   * The profile menus.
   */
  profileMenu: {
    /**
     * The profile menu for logged in state.
     */
    signedin: MastheadProfileItem[];

    /**
     * The profile menu for logged out state.
     */
    signedout: MastheadProfileItem[];
  };

  /**
   * Cloud masthead items
   */
  masthead: {
    logo: MastheadLogoData;
    contact: MastheadProfileContent;
    profileMenu: {
      signedout: MastheadProfileContent;
      signedin: MastheadProfileContent;
    };
  };

  /**
   * Miscellaneous translations
   */
  misc: MiscLabels;

  /**
   * Leaving IBM translations
   */
  leaving: LeavingIBMLabels;
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
  requestsTranslation?: { [language: string]: Promise<Translation> | string; endpoint: string };

  /**
   * The status of whether requests for the translation data are in progress, keyed by the language.
   */
  requestsTranslationInProgress?: { [language: string]: boolean };

  /**
   * The errors from the requests for the translation data, keyed by the language.
   */
  errorsRequestTranslation?: { [language: string]: Error };
}
