/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  LOCALE_API_ACTION,
  RequestLanguageInProgressAction,
  ErrorRequestLanguageAction,
  SetLanguageAction,
  RequestLangDisplayInProgressAction,
  ErrorRequestLangDisplayAction,
  SetLangDisplayAction,
  RequestLocaleListInProgressAction,
  ErrorRequestLocaleListAction,
  SetLocaleListAction,
  LocaleAPIActions,
  LocaleAPIState,
} from '../types/localeAPI';

/**
 * @param state The state for locale API.
 * @param action The action.
 * @returns The new state for locale API.
 */
export default function reducer(state: LocaleAPIState = {}, action: LocaleAPIActions): LocaleAPIState {
  switch (action.type) {
    case LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS: {
      const { request: requestLanguage } = action as RequestLanguageInProgressAction;
      return {
        ...state,
        requestLanguageInProgress: true,
        requestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE: {
      const { error: errorRequestLanguage } = action as ErrorRequestLanguageAction;
      return {
        ...state,
        requestLanguageInProgress: false,
        errorRequestLanguage,
      };
    }
    case LOCALE_API_ACTION.SET_LANGUAGE: {
      const { language } = action as SetLanguageAction;
      return {
        ...state,
        // If application sets language data without making a REST call, mark the request as resolved already
        requestLanguage: Promise.resolve(language),
        requestLanguageInProgress: false,
        language,
      };
    }
    case LOCALE_API_ACTION.SET_REQUEST_LANG_DISPLAY_IN_PROGRESS: {
      const { request: requestLangDisplay } = action as RequestLangDisplayInProgressAction;
      return {
        ...state,
        requestLangDisplayInProgress: true,
        requestLangDisplay,
      };
    }
    case LOCALE_API_ACTION.SET_ERROR_REQUEST_LANG_DISPLAY: {
      const { error: errorRequestLangDisplay } = action as ErrorRequestLangDisplayAction;
      return {
        ...state,
        requestLangDisplayInProgress: false,
        errorRequestLangDisplay,
      };
    }
    case LOCALE_API_ACTION.SET_LANG_DISPLAY: {
      const { langDisplay } = action as SetLangDisplayAction;
      return {
        ...state,
        // If application sets display language without making a REST call, mark the request as resolved already
        requestLangDisplay: Promise.resolve(langDisplay),
        requestLangDisplayInProgress: false,
        langDisplay,
      };
    }
    case LOCALE_API_ACTION.SET_REQUEST_LOCALE_LIST_IN_PROGRESS: {
      const { language, request } = action as RequestLocaleListInProgressAction;
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
      const { language, error } = action as ErrorRequestLocaleListAction;
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
      const { language, localeList } = action as SetLocaleListAction;
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
