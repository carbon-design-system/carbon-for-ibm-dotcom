/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import responseSuccess from './data/response.json';
import root from 'window-or-global';

jest.mock('../../Locale', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
  },
}));

jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({ data: require('./data/response.json') })
    ),
  };
});

describe('TranslationAPI', () => {
  const { location } = root;

  afterEach(() => {
    jest.resetModules();
    root.location = location;
  });

  it('should replace the signout url "state" param with current location', async () => {
    delete root.location;

    root.location = {
      href: 'https://www.loremipsum.com',
    };

    // reinitializing import
    const TranslationAPI = (await import('../Translation')).default;

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    expect(
      response.profileMenu.signedout[1].url.indexOf(
        'https%3A%2F%2Fwww.loremipsum.com'
      )
    ).toBeGreaterThan(-1);
  });

  it('should fetch the i18n data', async () => {
    // reinitializing import
    const TranslationAPI = (await import('../Translation')).default;

    // Expected endpoint called
    const endpoint = `${process.env.TRANSLATION_HOST}/common/v18/js/data/jsononly`;
    const fetchUrl = `${endpoint}/usen.json`;

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    const elseResponse = await TranslationAPI.getTranslation({});

    expect(elseResponse).toEqual(responseSuccess);

    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'text/plain',
        origin: 'https://ibm.com',
      },
    });

    expect(response).toEqual(responseSuccess);
  });
});
