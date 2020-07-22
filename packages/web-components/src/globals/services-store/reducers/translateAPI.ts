/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  TRANSLATE_API_ACTION,
  RequestTranslationInProgressAction,
  ErrorRequestTranslationAction,
  SetTranslationAction,
  TranslateAPIActions,
  TranslateAPIState,
} from '../types/translateAPI';

/**
 * @param state The state for translate API.
 * @param action The action.
 * @returns The new state for translate API.
 */
export default function reducer(state: TranslateAPIState = {}, action: TranslateAPIActions): TranslateAPIState {
  switch (action.type) {
    case TRANSLATE_API_ACTION.SET_REQUEST_TRANSLATION_IN_PROGRESS: {
      const { language, request } = action as RequestTranslationInProgressAction;
      return {
        ...state,
        requestsTranslationInProgress: {
          ...(state.requestsTranslationInProgress || {}),
          [language]: true,
        },
        requestsTranslation: {
          ...(state.requestsTranslation || {}),
          [language]: request,
        },
      };
    }
    case TRANSLATE_API_ACTION.SET_ERROR_REQUEST_TRANSLATION: {
      const { language, error } = action as ErrorRequestTranslationAction;
      return {
        ...state,
        requestsTranslationInProgress: {
          ...(state.requestsTranslationInProgress || {}),
          [language]: false,
        },
        errorsRequestTranslation: {
          ...(state.errorsRequestTranslation || {}),
          [language]: error,
        },
      };
    }
    case TRANSLATE_API_ACTION.SET_TRANSLATION: {
      const { language, translation } = action as SetTranslationAction;
      return {
        ...state,
        // If application sets language data without making a REST call, mark the request as resolved already
        requestsTranslationInProgress: {
          ...(state.requestsTranslationInProgress || {}),
          [language]: false,
        },
        requestsTranslation: {
          ...(state.requestsTranslation || {}),
          [language]: Promise.resolve(translation),
        },
        translations: {
          ...(state.translations || {}),
          [language]: translation,
        },
      };
    }
    default:
      return state;
  }
}
