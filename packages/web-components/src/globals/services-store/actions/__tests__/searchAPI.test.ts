/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import { LOCALE_API_ACTION } from '../../types/localeAPI';
import { SEARCH_API_ACTION, SearchAPIState } from '../../types/searchAPI';
import { setCurrentSearchQueryString, loadSearchResults } from '../searchAPI';
import convertValue from '../../../../../tests/utils/convert-value';
import getSearchParams from '../../../../../tests/utils/search-params';

jest.mock('@carbon/ibmdotcom-services/es/services/Locale/Locale');

const mockStore = configureMockStore<
  { searchAPI: SearchAPIState },
  ThunkDispatch<{ searchAPI: SearchAPIState }, void, AnyAction>
>([thunk]);

describe('Redux actions for `LocaleAPI`', () => {
  it('dispatches the action to set the current search query string', () => {
    const store = mockStore();
    store.dispatch(setCurrentSearchQueryString('search-query-string-foo'));
    expect(store.getActions()).toEqual([
      {
        type: SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING,
        searchQueryString: 'search-query-string-foo',
      },
    ]);
  });

  it('dispatches the action to load search results', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    fetchMock.mockResponse(JSON.stringify({ response: [['foo']] }));
    const store = mockStore();
    expect(await store.dispatch(loadSearchResults('search-query-string-foo'))).toEqual(['foo']);
    expect(convertValue(store.getActions())).toEqual([
      {
        type: SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING,
        searchQueryString: 'search-query-string-foo',
      },
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'ko-KR',
      },
      {
        type: SEARCH_API_ACTION.SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS,
        language: 'ko-KR',
        searchQueryString: 'search-query-string-foo',
        request: 'PROMISE',
      },
      {
        type: SEARCH_API_ACTION.SET_SEARCH_RESULTS,
        language: 'ko-KR',
        searchQueryString: 'search-query-string-foo',
        results: ['foo'],
      },
    ]);
    expect(getSearchParams((fetch as jest.Mock).mock.calls[0][0])).toEqual({
      lang: 'ko',
      cc: 'KR',
      query: 'search-query-string-foo',
    });
  });

  it('caches the loaded search query results', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    fetchMock.mockResponse(JSON.stringify({ response: [['foo']] }));
    const store = mockStore({
      searchAPI: {
        requestsSearchResults: {
          'search-query-string-foo': {
            'ko-KR': Promise.resolve(['foo']),
          },
        },
      },
    });
    expect(await store.dispatch(loadSearchResults('search-query-string-foo'))).toEqual(['foo']);
    expect(convertValue(store.getActions())).toEqual([
      {
        type: SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING,
        searchQueryString: 'search-query-string-foo',
      },
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'ko-KR',
      },
    ]);
    expect((fetch as jest.Mock).mock.calls.length).toBe(0);
  });

  it('dispatches the action of error in loading search results', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    fetchMock.mockReject(new Error('error-loadsearchquerystring'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadSearchResults('search-query-string-foo'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-loadsearchquerystring');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING,
        searchQueryString: 'search-query-string-foo',
      },
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'ko-KR',
      },
      {
        type: SEARCH_API_ACTION.SET_REQUEST_SEARCH_RESULTS_IN_PROGRESS,
        language: 'ko-KR',
        searchQueryString: 'search-query-string-foo',
        request: 'PROMISE',
      },
      {
        type: SEARCH_API_ACTION.SET_ERROR_REQUEST_SEARCH_RESULTS,
        language: 'ko-KR',
        searchQueryString: 'search-query-string-foo',
        error: 'error-loadsearchquerystring',
      },
    ]);
  });

  it('caches the error in loading search results', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    fetchMock.mockReject(new Error('error-loadsearchquerystring'));
    const store = mockStore({
      searchAPI: {
        requestsSearchResults: {
          'search-query-string-foo': {
            'ko-KR': Promise.reject(new Error('error-loadsearchquerystring')),
          },
        },
      },
    });
    let caught;
    try {
      await store.dispatch(loadSearchResults('search-query-string-foo'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-loadsearchquerystring');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: SEARCH_API_ACTION.SET_CURRENT_SEARCH_QUERY_STRING,
        searchQueryString: 'search-query-string-foo',
      },
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'ko-KR',
      },
    ]);
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
});
