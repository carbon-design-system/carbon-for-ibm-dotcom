/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import { loadLanguage } from './localeAPI';
import { SEARCH_API_ACTION, SearchAPIState } from '../types/searchAPI';

/**
 * @param language The locale.
 * @param searchQueryString The search query string.
 * @returns The endpoint URL for the given locale and search query string.
 */
function getSearchEndpoint(language: string, searchQueryString: string) {
  const [primary, country] = language!.split('-');
  return `${(process && process.env.SEARCH_TYPEAHEAD_HOST) ||
    'https://www-api.ibm.com'}/search/typeahead/v1?lang=${primary}&cc=${country}&query=${searchQueryString}`;
}

/**
 * @param searchQueryString A search query string.
 * @returns A Redux action to set the given search query string as the current one.
 */
export function setCurrentSearchQueryString(searchQueryString: string) {
  return {
    type: SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING,
    searchQueryString,
  };
}

/**
 * @param language A language.
 * @param searchQueryString A search query string.
 * @param request
 *   The promise of the REST call for the search result of the given language and search query string that is in progress.
 * @returns
 *   A Redux action to set the state that the REST call
 *   for search results for the given language and search query that is in progress.
 * @private
 */
export function setRequestSearchResultsInProgress(language: string, searchQueryString: string, request: Promise<string[]>) {
  return {
    type: SEARCH_API_ACTION.SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS,
    language,
    searchQueryString,
    request,
  };
}

/**
 * @param language The language.
 * @param searchQueryString The search query string.
 * @param error An error from the REST call for search results for the given language and search query.
 * @returns A Redux action to set the state that the REST call for search results for the given language and search query failed.
 * @private
 */
export function setErrorRequestSearchResults(language: string, searchQueryString: string, error: Error) {
  return {
    type: SEARCH_API_ACTION.SET_ERROR_REQUEST_SEARCH_RESULTS,
    language,
    searchQueryString,
    error,
  };
}

/**
 * @param language The language.
 * @param searchQueryString The search query string.
 * @param results The search results.
 * @returns A Redux action to set the given search results for the given language and search query string.
 * @private
 */
export function setSearchResults(language: string, searchQueryString: string, results: string[]) {
  return {
    type: SEARCH_API_ACTION.SET_SEARCH_RESULTS,
    language,
    searchQueryString,
    results,
  };
}

export type SearchAPIActions =
  | ReturnType<typeof setCurrentSearchQueryString>
  | ReturnType<typeof setRequestSearchResultsInProgress>
  | ReturnType<typeof setErrorRequestSearchResults>
  | ReturnType<typeof setSearchResults>;

/**
 * @returns A Redux action that monitors user authentication status.
 */
export function loadSearchResults(
  searchQueryString: string
): ThunkAction<Promise<string[]>, { searchAPI: SearchAPIState }, void, SearchAPIActions> {
  return async (dispatch, getState) => {
    dispatch(setCurrentSearchQueryString(searchQueryString));
    // TODO: Can we go without casts without making `LocaleAPI` types a hard-dependency?
    const language: string = await dispatch(loadLanguage() as any);
    const { requestsSearchResults = {} } = getState().searchAPI ?? {};
    const requestSearchResults = requestsSearchResults?.[searchQueryString]?.[language];
    if (requestSearchResults) {
      return requestSearchResults;
    }
    const request = fetch(getSearchEndpoint(language, searchQueryString))
      .then(response => response.json())
      .then(({ response }) => response.map(([result]) => result));
    dispatch(setRequestSearchResultsInProgress(language, searchQueryString, request));
    try {
      dispatch(setSearchResults(language, searchQueryString, await request));
    } catch (error) {
      dispatch(setErrorRequestSearchResults(language, searchQueryString, error));
      throw error;
    }
    return request;
  };
}
