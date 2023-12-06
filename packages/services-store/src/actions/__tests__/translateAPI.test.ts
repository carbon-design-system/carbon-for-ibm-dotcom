/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import TranslateAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation.js';
import { LOCALE_API_ACTION } from '../../types/localeAPI';
import {
  TRANSLATE_API_ACTION,
  Translation,
  TranslateAPIState,
} from '../../types/translateAPI';
import { setTranslation, loadTranslation } from '../translateAPI';
import convertValue from '../../../tests/utils/convert-value';

jest.mock('@carbon/ibmdotcom-services/es/services/Locale/Locale');
jest.mock('@carbon/ibmdotcom-services/es/services/Translation/Translation');

const mockStore = configureMockStore<
  { translateAPI: TranslateAPIState },
  ThunkDispatch<{ translateAPI: TranslateAPIState }, void, AnyAction>
>([thunk]);

const mockTranslation: Partial<Translation> = {
  mastheadNav: {
    links: [
      {
        title: 'item-title-foo',
        url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo',
      },
      {
        title: 'menu-title-foo',
        menuSections: [
          {
            menuItems: [
              {
                title: 'menu-item-title-bar',
                url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar',
              },
            ],
          },
        ],
      },
    ],
  },
};

const endpoint =
  '/common/carbon-for-ibm-dotcom/translations/masthead-footer/v2';

describe('Redux actions for `TranslateAPI`', () => {
  it('dispatches the action to set translation data', () => {
    const store = mockStore();
    store.dispatch(
      setTranslation('lang-foo', mockTranslation as Translation, endpoint)
    );
    expect(store.getActions()).toEqual([
      {
        type: TRANSLATE_API_ACTION.SET_TRANSLATION,
        language: 'lang-foo',
        translation: mockTranslation,
        endpoint,
      },
    ]);
  });

  it('dispatches the action to load translation data', async () => {
    LocaleAPI.getLocale.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    TranslateAPI.getTranslation.mockResolvedValue(mockTranslation);
    const store = mockStore();
    expect(await store.dispatch(loadTranslation())).toEqual(
      mockTranslation as Translation
    );
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
        type: TRANSLATE_API_ACTION.SET_REQUEST_TRANSLATION_IN_PROGRESS,
        language: 'ko-KR',
        request: 'PROMISE',
      },
      {
        type: TRANSLATE_API_ACTION.SET_TRANSLATION,
        language: 'ko-KR',
        translation: mockTranslation,
      },
    ]);
  });

  it('caches the loaded translation data', async () => {
    LocaleAPI.getLocale.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    TranslateAPI.getTranslation.mockResolvedValue(mockTranslation);
    const store = mockStore({
      translateAPI: {
        requestsTranslation: {
          'ko-KR': Promise.resolve(mockTranslation as Translation),
        },
      },
    });
    expect(await store.dispatch(loadTranslation())).toEqual(
      mockTranslation as Translation
    );
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
    LocaleAPI.getLocale.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    TranslateAPI.getTranslation.mockRejectedValue(
      new Error('error-gettranslation')
    );
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadTranslation());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-gettranslation');
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
        type: TRANSLATE_API_ACTION.SET_REQUEST_TRANSLATION_IN_PROGRESS,
        language: 'ko-KR',
        request: 'PROMISE',
      },
      {
        type: TRANSLATE_API_ACTION.SET_ERROR_REQUEST_TRANSLATION,
        language: 'ko-KR',
        error: 'error-gettranslation',
      },
    ]);
  });

  it('caches the error in loading translation data', async () => {
    LocaleAPI.getLocale.mockResolvedValue({ cc: 'KR', lc: 'ko' });
    const store = mockStore({
      translateAPI: {
        requestsTranslation: {
          'ko-KR': Promise.reject(new Error('error-gettranslation')),
        },
      },
    });
    let caught;
    try {
      await store.dispatch(loadTranslation());
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-gettranslation');
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
