/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The Redux action ID for search API.
 */
export enum SEARCH_API_ACTION {
  /**
   * One to set the current search query string.
   */
  SET_CURRENT_SEARCH_QUERY_STRING = 'SET_CURRENT_SEARCH_QUERY_STRING',

  /**
   * One to set the state that the REST call for search results that is in progress.
   */
  SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS = 'SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS',

  /**
   * One to set the state that the REST call for search results failed.
   */
  SET_ERROR_REQUEST_SEARCH_RESULTS = 'SET_ERROR_REQUEST_SEARCH_RESULTS',

  /**
   * One to set the given search results.
   */
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
}

/**
 * A Redux substate for search API.
 */
export interface SearchAPIState {
  /**
   * The current search query string.
   */
  currentSearchQueryString?: string;

  /**
   * The search results, keyed by the search query string and the language.
   */
  searchResults?: {
    [searchQueryString: string]: { [language: string]: string[] };
  };

  /**
   * The requests for the search results, keyed by the search query string and the language.
   */
  requestsSearchResults?: {
    [searchQueryString: string]: { [language: string]: Promise<string[]> };
  };

  /**
   * The status of whether requests for the search results are in progress, keyed by the search query string and the language.
   */
  requestsSearchResultsInProgress?: {
    [searchQueryString: string]: { [language: string]: boolean };
  };

  /**
   * The errors from the requests for the search results, keyed by the search query string and the language.
   */
  errorsRequestSearchResults?: {
    [searchQueryString: string]: { [language: string]: Error };
  };
}
