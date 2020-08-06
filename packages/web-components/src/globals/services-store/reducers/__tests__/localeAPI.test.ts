/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LocaleList, LOCALE_API_ACTION, LocaleAPIState } from '../../types/localeAPI';
import { LocaleAPIActions } from '../../actions/localeAPI';
import convertValue from '../../../../../tests/utils/convert-value';
import reducer from '../localeAPI';

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

describe('Redux reducers for `LocaleAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = { language: 'lang-foo' };
    expect(reducer(state, {} as LocaleAPIActions)).toEqual(state);
  });

  it('should support starting the spinner for loading language', () => {
    const request = Promise.resolve('lang-foo');
    expect(
      reducer({} as LocaleAPIState, {
        type: LOCALE_API_ACTION.SET_REQUEST_LANGUAGE_IN_PROGRESS,
        request,
      })
    ).toEqual({
      requestLanguageInProgress: true,
      requestLanguage: request,
    });
  });

  it('should support setting error in loading language', () => {
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANGUAGE,
          error: new Error('error-lang'),
        })
      )
    ).toEqual({
      requestLanguageInProgress: false,
      errorRequestLanguage: 'error-lang',
    });
  });

  it('should support setting loaded language', () => {
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_LANGUAGE,
          language: 'lang-foo',
        })
      )
    ).toEqual({
      requestLanguageInProgress: false,
      requestLanguage: 'PROMISE',
      language: 'lang-foo',
    });
  });

  it('should support starting the spinner for loading display language', () => {
    const request = Promise.resolve('lang-display-foo');
    expect(
      reducer({} as LocaleAPIState, {
        type: LOCALE_API_ACTION.SET_REQUEST_LANG_DISPLAY_IN_PROGRESS,
        request,
      })
    ).toEqual({
      requestLangDisplayInProgress: true,
      requestLangDisplay: request,
    });
  });

  it('should support setting error in loading display language', () => {
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LANG_DISPLAY,
          error: new Error('error-langdisplay'),
        })
      )
    ).toEqual({
      requestLangDisplayInProgress: false,
      errorRequestLangDisplay: 'error-langdisplay',
    });
  });

  it('should support setting loaded display language', () => {
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_LANG_DISPLAY,
          langDisplay: 'lang-display-foo',
        })
      )
    ).toEqual({
      requestLangDisplayInProgress: false,
      requestLangDisplay: 'PROMISE',
      langDisplay: 'lang-display-foo',
    });
  });

  it('should support starting the spinner for loading locale list data', () => {
    const request = Promise.resolve(mockLocaleList);
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_REQUEST_LOCALE_LIST_IN_PROGRESS,
          language: 'lang-foo',
          request,
        })
      )
    ).toEqual({
      requestsLocaleListInProgress: {
        'lang-foo': true,
      },
      requestsLocaleList: {
        'lang-foo': 'PROMISE',
      },
    });
  });

  it('should support setting error in loading locale list data', () => {
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_ERROR_REQUEST_LOCALE_LIST,
          language: 'lang-foo',
          error: new Error('error-lang'),
        })
      )
    ).toEqual({
      requestsLocaleListInProgress: {
        'lang-foo': false,
      },
      errorsRequestLocaleList: {
        'lang-foo': 'error-lang',
      },
    });
  });

  it('should support setting loaded locale list data', () => {
    expect(
      convertValue(
        reducer({} as LocaleAPIState, {
          type: LOCALE_API_ACTION.SET_LOCALE_LIST,
          language: 'lang-foo',
          localeList: mockLocaleList,
        })
      )
    ).toEqual({
      requestsLocaleListInProgress: {
        'lang-foo': false,
      },
      requestsLocaleList: {
        'lang-foo': 'PROMISE',
      },
      localeLists: {
        'lang-foo': mockLocaleList,
      },
    });
  });
});
