/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The translation data for locale modal.
 */
export interface LocaleModalI18N {
  availabilityText: string;
  headerTitle: string;
  modalClose: string;
  searchClearText: string;
  searchLabel: string;
  searchPlaceholder: string;
  unavailabilityText: string;
}

/**
 * The locale item data in locale modal, which is a tuple of the locale and the language.
 */
export type LocaleModalLocale = [string, string];

/**
 * The country item data in locale modal.
 */
export interface Country {
  /**
   * The country name.
   */
  name: string;

  /**
   * The list of locale items.
   */
  locale: LocaleModalLocale[];
}

/**
 * The region item data in locale modal.
 */
export interface Region {
  /**
   * The abbreviated region name.
   */
  key: string;

  /**
   * The region name.
   */
  name: string;

  /**
   * The list of country items.
   */
  countryList: Country[];
}

/**
 * The data available from `LocaleAPI.getList()`.
 */
export interface LocaleList {
  /**
   * The translation data for locale modal.
   */
  localeModal: LocaleModalI18N;

  /**
   * The list of region items.
   */
  regionList: Region[];
}

/**
 * The Redux action ID for `LocaleAPI`.
 */
export enum LOCALE_API_ACTION {
  /**
   * One to set the state that the REST call for language data is in progress or not.
   */
  SET_REQUEST_LANGUAGE_IN_PROGRESS = 'SET_REQUEST_LANGUAGE_IN_PROGRESS',

  /**
   * One to set the state that the REST call for language data failed.
   */
  SET_ERROR_REQUEST_LANGUAGE = 'SET_ERROR_REQUEST_LANGUAGE',

  /**
   * One to set the given language data.
   */
  SET_LANGUAGE = 'SET_LANGUAGE',

  /**
   * One to set the state that the REST call for display language data is in progress or not.
   */
  SET_REQUEST_LANG_DISPLAY_IN_PROGRESS = 'SET_REQUEST_LANG_DISPLAY_IN_PROGRESS',

  /**
   * One to set the state that the REST call for display language data failed.
   */
  SET_ERROR_REQUEST_LANG_DISPLAY = 'SET_ERROR_REQUEST_LANG_DISPLAY',

  /**
   * One to set the given display language data.
   */
  SET_LANG_DISPLAY = 'SET_LANG_DISPLAY',

  /**
   * One to set the state that the REST call for local list data is in progress or not.
   */
  SET_REQUEST_LOCALE_LIST_IN_PROGRESS = 'SET_REQUEST_LOCALE_LIST_IN_PROGRESS',

  /**
   * One to set the state that the REST call for locale list data failed.
   */
  SET_ERROR_REQUEST_LOCALE_LIST = 'SET_ERROR_REQUEST_LOCALE_LIST',

  /**
   * One to set the given locale list data.
   */
  SET_LOCALE_LIST = 'SET_LOCALE_LIST',
}

/**
 * A Redux substate for `LocaleAPI`.
 */
export interface LocaleAPIState {
  /**
   * The language data.
   */
  language?: string;

  /**
   * The request for the language data.
   */
  requestLanguage?: Promise<string>;

  /**
   * `true` if the request for the language data is in progress.
   */
  requestLanguageInProgress?: boolean;

  /**
   * The error from the request for the language data.
   */
  errorRequestLanguage?: Error;

  /**
   * The display language data.
   */
  langDisplay?: string;

  /**
   * The request for the display language data.
   */
  requestLangDisplay?: Promise<string>;

  /**
   * `true` if the request for the display language data is in progress.
   */
  requestLangDisplayInProgress?: boolean;

  /**
   * The error from the request for the display language data.
   */
  errorRequestLangDisplay?: Error;

  /**
   * The locale list data, keyed by the language.
   */
  localeLists?: { [language: string]: LocaleList };

  /**
   * The requests for the locale list data, keyed by the language.
   */
  requestsLocaleList?: { [language: string]: Promise<LocaleList> };

  /**
   * The status of whether requests for the locale list data are in progress, keyed by the language.
   */
  requestsLocaleListInProgress?: { [language: string]: boolean };

  /**
   * The errors from the requests for the locale list data, keyed by the language.
   */
  errorsRequestLocaleList?: { [language: string]: Error };
}
