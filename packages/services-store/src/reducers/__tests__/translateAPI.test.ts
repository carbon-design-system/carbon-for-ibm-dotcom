/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TRANSLATE_API_ACTION, Translation, TranslateAPIState } from '../../types/translateAPI';
import { TranslateAPIActions } from '../../actions/translateAPI';
import convertValue from '../../../tests/utils/convert-value';
import reducer from '../translateAPI';

const mockTranslation: Partial<Translation> = {
  mastheadNav: {
    links: [
      { title: 'item-title-foo', url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo' },
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

describe('Redux reducers for `LocaleAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = {
      translations: {
        'lang-foo': mockTranslation as Translation,
      },
    };
    expect(reducer(state, {} as TranslateAPIActions)).toEqual(state);
  });

  it('should support starting the spinner for loading translation data', () => {
    const request = Promise.resolve(mockTranslation as Translation);
    expect(
      convertValue(
        reducer({} as TranslateAPIState, {
          type: TRANSLATE_API_ACTION.SET_REQUEST_TRANSLATION_IN_PROGRESS,
          language: 'lang-foo',
          request,
        })
      )
    ).toEqual({
      requestsTranslationInProgress: {
        'lang-foo': true,
      },
      requestsTranslation: {
        'lang-foo': 'PROMISE',
      },
    });
  });

  it('should support setting error in loading translation data', () => {
    expect(
      convertValue(
        reducer({} as TranslateAPIState, {
          type: TRANSLATE_API_ACTION.SET_ERROR_REQUEST_TRANSLATION,
          language: 'lang-foo',
          error: new Error('error-lang'),
        })
      )
    ).toEqual({
      requestsTranslationInProgress: {
        'lang-foo': false,
      },
      errorsRequestTranslation: {
        'lang-foo': 'error-lang',
      },
    });
  });

  it('should support setting loaded translation data', () => {
    expect(
      convertValue(
        reducer({} as TranslateAPIState, {
          type: TRANSLATE_API_ACTION.SET_TRANSLATION,
          language: 'lang-foo',
          translation: mockTranslation as Translation,
        })
      )
    ).toEqual({
      requestsTranslationInProgress: {
        'lang-foo': false,
      },
      requestsTranslation: {
        'lang-foo': 'PROMISE',
      },
      translations: {
        'lang-foo': mockTranslation,
      },
    });
  });
});
