/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SEARCH_API_ACTION, SearchAPIState } from '../types/searchAPI';
import {
  setCurrentSearchQueryString,
  setRequestSearchResultsInProgress,
  setErrorRequestSearchResults,
  setSearchResults,
  SearchAPIActions,
} from '../actions/searchAPI';

/**
 * @param state The state for search API.
 * @param action The action.
 * @returns The new state for search API.
 */
export default function reducer(
  state: SearchAPIState = {},
  action: SearchAPIActions
): SearchAPIState {
  switch (action.type) {
    case SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING: {
      const { searchQueryString } = action as ReturnType<
        typeof setCurrentSearchQueryString
      >;
      return {
        ...state,
        currentSearchQueryString: searchQueryString,
      };
    }
    case SEARCH_API_ACTION.SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS: {
      const { language, searchQueryString, request } = action as ReturnType<
        typeof setRequestSearchResultsInProgress
      >;
      const {
        requestsSearchResultsInProgress:
          oldRequestsSearchResultsInProgress = {},
        requestsSearchResults: oldRequestsSearchResults = {},
      } = state;
      return {
        ...state,
        requestsSearchResultsInProgress: {
          ...oldRequestsSearchResultsInProgress,
          [searchQueryString]: {
            ...(oldRequestsSearchResultsInProgress[searchQueryString] ?? {}),
            [language]: true,
          },
        },
        requestsSearchResults: {
          ...oldRequestsSearchResults,
          [searchQueryString]: {
            ...(oldRequestsSearchResults[searchQueryString] ?? {}),
            [language]: request,
          },
        },
      };
    }
    case SEARCH_API_ACTION.SET_ERROR_REQUEST_SEARCH_RESULTS: {
      const { language, searchQueryString, error } = action as ReturnType<
        typeof setErrorRequestSearchResults
      >;
      const {
        requestsSearchResultsInProgress:
          oldRequestsSearchResultsInProgress = {},
        errorsRequestSearchResults: oldErrorsRequestSearchResults = {},
      } = state;
      return {
        ...state,
        requestsSearchResultsInProgress: {
          ...oldRequestsSearchResultsInProgress,
          [searchQueryString]: {
            ...(oldRequestsSearchResultsInProgress[searchQueryString] ?? {}),
            [language]: false,
          },
        },
        errorsRequestSearchResults: {
          ...oldErrorsRequestSearchResults,
          [searchQueryString]: {
            ...(oldErrorsRequestSearchResults[searchQueryString] ?? {}),
            [language]: error,
          },
        },
      };
    }
    case SEARCH_API_ACTION.SET_SEARCH_RESULTS: {
      const { language, searchQueryString, results } = action as ReturnType<
        typeof setSearchResults
      >;
      const {
        requestsSearchResultsInProgress:
          oldRequestsSearchResultsInProgress = {},
        requestsSearchResults: oldRequestsSearchResults = {},
        searchResults: oldSearchResults = {},
      } = state;
      return {
        ...state,
        requestsSearchResultsInProgress: {
          ...oldRequestsSearchResultsInProgress,
          [searchQueryString]: {
            ...(oldRequestsSearchResultsInProgress[searchQueryString] ?? {}),
            [language]: false,
          },
        },
        requestsSearchResults: {
          ...oldRequestsSearchResults,
          [searchQueryString]: {
            ...(oldRequestsSearchResults[searchQueryString] ?? {}),
            [language]: Promise.resolve(results),
          },
        },
        searchResults: {
          ...oldSearchResults,
          [searchQueryString]: {
            ...(oldSearchResults[searchQueryString] ?? {}),
            [language]: results,
          },
        },
      };
    }
    default:
      return state;
  }
}
