/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LOCALE_API_ACTION, LocaleAPIState } from '../types/localeAPI';
import {
  LocaleAPIActions,
  setRequestLanguageInProgress,
  setErrorRequestLanguage,
  setLanguage,
  setRequestLocaleListInProgress,
  setErrorRequestLocaleList,
  setLocaleList,
} from '../actions/localeAPI';

/**
 * @param state The state for locale API.
 * @param action The action.
 * @returns The new state for locale API.
 */
export default function reducer(state: LocaleAPIState = {}, action: LocaleAPIActions): LocaleAPIState {
  switch (action.type) {
    case LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS: {
      const { request: requestLanguage } = action as ReturnType<typeof setRequestLanguageInProgress>;
      return {
        ...state,
        requestLanguageInProgress: true,
        requestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE: {
      const { error: errorRequestLanguage } = action as ReturnType<typeof setErrorRequestLanguage>;
      return {
        ...state,
        requestLanguageInProgress: false,
        errorRequestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_LANGUAGE: {
      const { language } = action as ReturnType<typeof setLanguage>;
      return {
        ...state,
        // If application sets language data without making a REST call, mark the request as resolved already
        requestLanguage: Promise.resolve(language),
        requestLanguageInProgress: false,
        language,
      };
    }
    case LOCALE_API_ACTION.SET_REQUEST_LOCALE_LIST_IN_PROGRESS: {
      const { language, request } = action as ReturnType<typeof setRequestLocaleListInProgress>;
      return {
        ...state,
        requestsLocaleListInProgress: {
          ...(state.requestsLocaleListInProgress || {}),
          [language]: true,
        },
        requestsLocaleList: {
          ...(state.requestsLocaleList || {}),
          [language]: request,
        },
      };
    }
    case LOCALE_API_ACTION.SET_ERROR_REQUEST_LOCALE_LIST: {
      const { language, error } = action as ReturnType<typeof setErrorRequestLocaleList>;
      return {
        ...state,
        requestsLocaleListInProgress: {
          ...(state.requestsLocaleListInProgress || {}),
          [language]: false,
        },
        errorsRequestLocaleList: {
          ...(state.errorsRequestLocaleList || {}),
          [language]: error,
        },
      };
    }
    case LOCALE_API_ACTION.SET_LOCALE_LIST: {
      const { language, localeList } = action as ReturnType<typeof setLocaleList>;
      return {
        ...state,
        // If application sets language data without making a REST call, mark the request as resolved already
        requestsLocaleListInProgress: {
          ...(state.requestsLocaleListInProgress || {}),
          [language]: false,
        },
        requestsLocaleList: {
          ...(state.requestsLocaleList || {}),
          [language]: Promise.resolve(localeList),
        },
        localeLists: {
          ...(state.localeLists || {}),
          [language]: localeList,
        },
      };
    }
    default:
      return state;
  }
}
