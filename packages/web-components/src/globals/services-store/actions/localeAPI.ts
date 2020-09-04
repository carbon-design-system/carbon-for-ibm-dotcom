/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import { LocaleList, LOCALE_API_ACTION, LocaleAPIState } from '../types/localeAPI';

/**
 * @param request The promise of the REST call for language data that is in progress.
 * @returns A Redux action to set the state that the REST call for language data is in progress.
 * @private
 */
export function setRequestLanguageInProgress(request: Promise<string>) {
  return {
    type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
    request,
  };
}

/**
 * @param error An error from the REST call for language data.
 * @returns A Redux action to set the state that the REST call for language data failed.
 * @private
 */
export function setErrorRequestLanguage(error: Error) {
  return {
    type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE,
    error,
  };
}

/**
 * @param language The language data from the REST call.
 * @returns A Redux action to set the given language data.
 */
export function setLanguage(language: string) {
  return {
    type: LOCALE_API_ACTION.SET_LANGUAGE,
    language,
  };
}

/**
 * @param request The promise of the REST call for display language data that is in progress.
 * @returns A Redux action to set the state that the REST call for display language data is in progress.
 * @private
 */
export function setRequestLangDisplayInProgress(request: Promise<string>) {
  return {
    type: LOCALE_API_ACTION.SET_REQUEST_LANG_DISPLAY_IN_PROGRESS,
    request,
  };
}

/**
 * @param error An error from the REST call for display language data.
 * @returns A Redux action to set the state that the REST call for display language data failed.
 * @private
 */
export function setErrorRequestLangDisplay(error: Error) {
  return {
    type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANG_DISPLAY,
    error,
  };
}

/**
 * @param langDisplay The display language data from the REST call.
 * @returns A Redux action to set the given display language data.
 */
export function setLangDisplay(langDisplay: string) {
  return {
    type: LOCALE_API_ACTION.SET_LANG_DISPLAY,
    langDisplay,
  };
}

/**
 * @param language A language.
 * @param request The promise of the REST call for locale list data of the given language that is in progress.
 * @returns A Redux action to set the state that the REST call for locale list data for the given language that is in progress.
 * @private
 */
export function setRequestLocaleListInProgress(language: string, request: Promise<LocaleList>) {
  return {
    type: LOCALE_API_ACTION.SET_REQUEST_LOCALE_LIST_IN_PROGRESS,
    language,
    request,
  };
}

/**
 * @param language A language.
 * @param error An error from the REST call for locale list data of the given language.
 * @returns A Redux action to set the state that the REST call for locale list data for the given language failed.
 * @private
 */
export function setErrorRequestLocaleList(language: string, error: Error) {
  return {
    type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LOCALE_LIST,
    language,
    error,
  };
}

/**
 * @param language A language.
 * @param localeList The locale list data from the REST call.
 * @returns A Redux action to set the given locale list data.
 */
export function setLocaleList(language: string, localeList: LocaleList) {
  return {
    type: LOCALE_API_ACTION.SET_LOCALE_LIST,
    language,
    localeList,
  };
}

/**
 * A Redux action to work with `LocaleAPI`.
 */
export type LocaleAPIActions =
  | ReturnType<typeof setRequestLanguageInProgress>
  | ReturnType<typeof setErrorRequestLanguage>
  | ReturnType<typeof setLanguage>
  | ReturnType<typeof setRequestLangDisplayInProgress>
  | ReturnType<typeof setErrorRequestLangDisplay>
  | ReturnType<typeof setLangDisplay>
  | ReturnType<typeof setRequestLocaleListInProgress>
  | ReturnType<typeof setErrorRequestLocaleList>
  | ReturnType<typeof setLocaleList>;

/**
 * @returns A Redux action that sends a REST call for language data.
 */
export function loadLanguage(): ThunkAction<Promise<string>, { localeAPI: LocaleAPIState }, void, LocaleAPIActions> {
  return async (dispatch, getState) => {
    const { requestLanguage } = getState().localeAPI ?? {};
    if (requestLanguage) {
      return requestLanguage;
    }
    const promiseLanguage: Promise<string> = LocaleAPI.getLang().then(({ cc: country, lc: primary }) => `${primary}-${country}`);
    dispatch(setRequestLanguageInProgress(promiseLanguage));
    try {
      dispatch(setLanguage(await promiseLanguage));
    } catch (error) {
      dispatch(setErrorRequestLanguage(error));
      throw error;
    }
    return promiseLanguage;
  };
}

/**
 * @returns A Redux action that sends a REST call for display language data.
 */
export function loadLangDisplay(): ThunkAction<Promise<string>, { localeAPI: LocaleAPIState }, void, LocaleAPIActions> {
  return async (dispatch, getState) => {
    const { requestLangDisplay } = getState().localeAPI ?? {};
    if (requestLangDisplay) {
      return requestLangDisplay;
    }
    const promiseLangDisplay: Promise<string> = LocaleAPI.getLangDisplay();
    dispatch(setRequestLangDisplayInProgress(promiseLangDisplay));
    try {
      dispatch(setLangDisplay(await promiseLangDisplay));
    } catch (error) {
      dispatch(setErrorRequestLangDisplay(error));
      throw error;
    }
    return promiseLangDisplay;
  };
}

/**
 * @returns A Redux action that sends a REST call for locale list data.
 */
export function loadLocaleList(): ThunkAction<Promise<LocaleList>, { localeAPI: LocaleAPIState }, void, LocaleAPIActions> {
  return async (dispatch, getState) => {
    // TODO: Can we go without casts without making `LocaleAPI` types a hard-dependency?
    const language: string = await dispatch(loadLanguage() as any);
    const { requestsLocaleList = {} } = getState().localeAPI ?? {};
    const { [language]: requestLocaleList } = requestsLocaleList;
    if (requestLocaleList) {
      return requestLocaleList;
    }
    const [primary, country] = language.split('-');
    const promiseLocaleList: Promise<LocaleList> = LocaleAPI.getList({
      cc: country.toLowerCase(),
      lc: primary.toLowerCase(),
    });
    dispatch(setRequestLocaleListInProgress(language, promiseLocaleList));
    try {
      dispatch(setLocaleList(language, await promiseLocaleList));
    } catch (error) {
      dispatch(setErrorRequestLocaleList(language, error));
    }
    return promiseLocaleList;
  };
}
