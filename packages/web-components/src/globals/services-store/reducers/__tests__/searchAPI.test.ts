/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SEARCH_API_ACTION, SearchAPIState } from '../../types/searchAPI';
import { SearchAPIActions } from '../../actions/searchAPI';
import convertValue from '../../../../../tests/utils/convert-value';
import reducer from '../searchAPI';

describe('Redux reducers for `SearchAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = { currentSearchQueryString: 'search-query-string-foo' };
    expect(reducer(state, {} as SearchAPIActions)).toEqual(state);
  });

  it('should support starting the spinner for loading search results', () => {
    const request = Promise.resolve(['foo']);
    expect(
      convertValue(
        reducer({} as SearchAPIState, {
          type: SEARCH_API_ACTION.SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS,
          language: 'lang-foo',
          searchQueryString: 'search-query-string-foo',
          request,
        })
      )
    ).toEqual({
      requestsSearchResultsInProgress: {
        'search-query-string-foo': {
          'lang-foo': true,
        },
      },
      requestsSearchResults: {
        'search-query-string-foo': {
          'lang-foo': 'PROMISE',
        },
      },
    });
  });

  it('should support setting error in loading search results', () => {
    expect(
      convertValue(
        reducer({} as SearchAPIState, {
          type: SEARCH_API_ACTION.SET_ERROR_REQUEST_SEARCH_RESULTS,
          language: 'lang-foo',
          searchQueryString: 'search-query-string-foo',
          error: new Error('error-loadsearchquerystring'),
        })
      )
    ).toEqual({
      requestsSearchResultsInProgress: {
        'search-query-string-foo': {
          'lang-foo': false,
        },
      },
      errorsRequestSearchResults: {
        'search-query-string-foo': {
          'lang-foo': 'error-loadsearchquerystring',
        },
      },
    });
  });

  it('should support setting loaded search results', () => {
    expect(
      convertValue(
        reducer({} as SearchAPIState, {
          type: SEARCH_API_ACTION.SET_SEARCH_RESULTS,
          language: 'lang-foo',
          searchQueryString: 'search-query-string-foo',
          results: ['foo'],
        })
      )
    ).toEqual({
      requestsSearchResultsInProgress: {
        'search-query-string-foo': {
          'lang-foo': false,
        },
      },
      requestsSearchResults: {
        'search-query-string-foo': {
          'lang-foo': 'PROMISE',
        },
      },
      searchResults: {
        'search-query-string-foo': {
          'lang-foo': ['foo'],
        },
      },
    });
  });
});
