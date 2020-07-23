/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import TranslateAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import { loadLanguage } from './localeAPI';
import {
  Translation,
  TRANSLATE_API_ACTION,
  RequestTranslationInProgressAction,
  ErrorRequestTranslationAction,
  SetTranslationAction,
  TranslateAPIActions,
  TranslateAPIState,
} from '../types/translateAPI';

/**
 * @param language A language.
 * @param request The promise of the REST call for translation data of the given language that is in progress.
 * @returns A Redux action to set the state that the REST call for translation data for the given language that is in progress.
 * @private
 */
function setRequestTranslationInProgress(language: string, request: Promise<Translation>): RequestTranslationInProgressAction {
  return {
    type: TRANSLATE_API_ACTION.SET_REQUEST_TRANSLATION_IN_PROGRESS,
    language,
    request,
  };
}

/**
 * @param language A language.
 * @param error An error from the REST call for translation data of the given language.
 * @returns A Redux action to set the state that the REST call for translation data for the given language failed.
 * @private
 */
function setErrorRequesTranslation(language: string, error: Error): ErrorRequestTranslationAction {
  return {
    type: TRANSLATE_API_ACTION.SET_ERROR_REQUEST_TRANSLATION,
    language,
    error,
  };
}

/**
 * @param language A language.
 * @param translation The translation data from the REST call.
 * @returns A Redux action to set the given translation data.
 * @private
 */
export function setTranslation(language: string, translation: Translation): SetTranslationAction {
  return {
    type: TRANSLATE_API_ACTION.SET_TRANSLATION,
    language,
    translation,
  };
}

/**
 * @returns A Redux action that sends a REST call for translation data.
 */
export function loadTranslation(): ThunkAction<
  Promise<Translation>,
  { translateAPI: TranslateAPIState },
  void,
  TranslateAPIActions
> {
  return async (dispatch, getState) => {
    // TODO: Can we go without casts without making `LocaleAPI` types a hard-dependency?
    const language: string = await dispatch(loadLanguage() as any);
    const { requestsTranslation = {} } = getState().translateAPI ?? {};
    const { [language]: requestTranslation } = requestsTranslation;
    if (requestTranslation) {
      return requestTranslation;
    }
    const [primary, country] = language.split('-');
    const promiseTranslation: Promise<Translation> = TranslateAPI.getTranslation({
      cc: country.toLowerCase(),
      lc: primary.toLowerCase(),
    });
    dispatch(setRequestTranslationInProgress(language, promiseTranslation));
    try {
      dispatch(setTranslation(language, await promiseTranslation));
    } catch (error) {
      dispatch(setErrorRequesTranslation(language, error));
    }
    return promiseTranslation;
  };
}
