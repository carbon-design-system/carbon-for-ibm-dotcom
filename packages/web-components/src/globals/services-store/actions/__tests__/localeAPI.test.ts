/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import { LocaleList, LOCALE_API_ACTION, LocaleAPIState } from '../../types/localeAPI';
import { setLanguage, loadLanguage, setLangDisplay, loadLangDisplay, setLocaleList, loadLocaleList } from '../localeAPI';
import convertValue from '../../../../../tests/utils/convert-value';

jest.mock('@carbon/ibmdotcom-services/es/services/Locale/Locale');

const mockLocaleList: LocaleList = {
  regionList: [
    {
      name: 'region-name-foo',
      key: 'region-key-foo',
      countryList: [
        {
          name: 'country-name-foo',
          locale: [
            ['locale-id-foo', 'language-foo'],
            ['locale-id-bar', 'language-bar'],
          ],
        },
      ],
    },
    {
      name: 'region-name-bar',
      key: 'region-key-bar',
      countryList: [
        {
          name: 'country-name-bar',
          locale: [['locale-id-baz', 'language-baz']],
        },
        {
          name: 'country-name-baz',
          locale: [
            ['locale-id-qux', 'language-qux'],
            ['locale-id-quux', 'language-quux'],
          ],
        },
      ],
    },
  ],
  localeModal: {
    headerTitle: 'header-title-foo',
    modalClose: 'modal-close-foo',
    searchLabel: 'search-label-foo',
    searchClearText: 'search-clear-text-foo',
    searchPlaceholder: 'search-placeholder-foo',
    availabilityText: 'availability-text-foo',
    unavailabilityText: 'unavailability-text-foo',
  },
};

const mockStore = configureMockStore<
  { localeAPI: LocaleAPIState },
  ThunkDispatch<{ localeAPI: LocaleAPIState }, void, AnyAction>
>([thunk]);

describe('Redux actions for `LocaleAPI`', () => {
  it('dispatches the action to set language', () => {
    const store = mockStore();
    store.dispatch(setLanguage('lang-foo'));
    expect(store.getActions()).toEqual([
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'lang-foo',
      },
    ]);
  });

  it('dispatches the action to load language', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    const store = mockStore();
    expect(await store.dispatch(loadLanguage())).toBe('ko-KR');
    expect(convertValue(store.getActions())).toEqual([
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

  it('caches the loaded language', async () => {
    const store = mockStore({
      localeAPI: {
        requestLanguage: Promise.resolve('lang-foo'),
      },
    });
    expect(await store.dispatch(loadLanguage())).toBe('lang-foo');
    expect(convertValue(store.getActions())).toEqual([]);
  });

  it('dispatches the action of error in loading language', async () => {
    LocaleAPI.getLang.mockRejectedValue(new Error('error-getlang'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadLanguage());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getlang');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE,
        error: 'error-getlang',
      },
    ]);
  });

  it('caches the error in loading language', async () => {
    const store = mockStore({
      localeAPI: {
        requestLanguage: Promise.reject(new Error('error-getlang')),
      },
    });
    let caught;
    try {
      await store.dispatch(loadLanguage());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getlang');
    expect(convertValue(store.getActions())).toEqual([]);
  });

  it('dispatches the action to set display language', () => {
    const store = mockStore();
    store.dispatch(setLangDisplay('lang-display-foo'));
    expect(store.getActions()).toEqual([
      {
        type: LOCALE_API_ACTION.SET_LANG_DISPLAY,
        langDisplay: 'lang-display-foo',
      },
    ]);
  });

  it('dispatches the action to load display language', async () => {
    LocaleAPI.getLangDisplay.mockResolvedValue('lang-display-foo');
    const store = mockStore();
    expect(await store.dispatch(loadLangDisplay())).toBe('lang-display-foo');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANG_DISPLAY_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANG_DISPLAY,
        langDisplay: 'lang-display-foo',
      },
    ]);
  });

  it('caches the loaded display language', async () => {
    const store = mockStore({
      localeAPI: {
        requestLangDisplay: Promise.resolve('lang-display-foo'),
      },
    });
    expect(await store.dispatch(loadLangDisplay())).toBe('lang-display-foo');
    expect(convertValue(store.getActions())).toEqual([]);
  });

  it('dispatches the action of error in loading display language', async () => {
    LocaleAPI.getLangDisplay.mockRejectedValue(new Error('error-getlangdisplay'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadLangDisplay());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getlangdisplay');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANG_DISPLAY_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANG_DISPLAY,
        error: 'error-getlangdisplay',
      },
    ]);
  });

  it('caches the error in loading display language', async () => {
    const store = mockStore({
      localeAPI: {
        requestLangDisplay: Promise.reject(new Error('error-getlangdisplay')),
      },
    });
    let caught;
    try {
      await store.dispatch(loadLangDisplay());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getlangdisplay');
    expect(convertValue(store.getActions())).toEqual([]);
  });

  it('dispatches the action to set locale list data', () => {
    const store = mockStore();
    store.dispatch(setLocaleList('lang-foo', mockLocaleList));
    expect(store.getActions()).toEqual([
      {
        type: LOCALE_API_ACTION.SET_LOCALE_LIST,
        language: 'lang-foo',
        localeList: mockLocaleList,
      },
    ]);
  });

  it('dispatches the action to load locale list data', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    LocaleAPI.getList.mockResolvedValue(mockLocaleList);
    const store = mockStore();
    expect(await store.dispatch(loadLocaleList())).toEqual(mockLocaleList);
    expect(convertValue(store.getActions())).toEqual([
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'ko-KR',
      },
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LOCALE_LIST_IN_PROGRESS,
        language: 'ko-KR',
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LOCALE_LIST,
        language: 'ko-KR',
        localeList: mockLocaleList,
      },
    ]);
  });

  it('caches the loaded locale list data', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    LocaleAPI.getList.mockResolvedValue(mockLocaleList);
    const store = mockStore({
      localeAPI: {
        requestsLocaleList: {
          'ko-KR': Promise.resolve(mockLocaleList),
        },
      },
    });
    expect(await store.dispatch(loadLocaleList())).toEqual(mockLocaleList);
    expect(convertValue(store.getActions())).toEqual([
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

  it('dispatches the action of error in loading language', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    LocaleAPI.getList.mockRejectedValue(new Error('error-getlocalelist'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadLocaleList());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getlocalelist');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_LANGUAGE,
        language: 'ko-KR',
      },
      {
        type: LOCALE_API_ACTION.SET_REQUEST_LOCALE_LIST_IN_PROGRESS,
        language: 'ko-KR',
        request: 'PROMISE',
      },
      {
        type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LOCALE_LIST,
        language: 'ko-KR',
        error: 'error-getlocalelist',
      },
    ]);
  });

  it('caches the error in loading locale list data', async () => {
    LocaleAPI.getLang.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    const store = mockStore({
      localeAPI: {
        requestsLocaleList: {
          'ko-KR': Promise.reject(new Error('error-getlocalelist')),
        },
      },
    });
    let caught;
    try {
      await store.dispatch(loadLocaleList());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getlocalelist');
    expect(convertValue(store.getActions())).toEqual([
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
});
