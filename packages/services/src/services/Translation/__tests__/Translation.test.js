/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import oldSession from './data/timestamp_response.json';
import responseSuccess from './data/response.json';
import root from 'window-or-global';
import TranslationAPI from '../Translation';

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

const sessionStorageMock = (() => {
  let cache = {};

  return {
    getItem(key) {
      return cache[key] || null;
    },
    setItem(key, value) {
      cache[key] = value;
    },
    removeItem(key) {
      delete cache[key];
    },
    clear() {
      cache = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
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

  it('should fetch the i18n data from default endpoint', async () => {
    // Expected endpoint called
    const endpoint = `${process.env.TRANSLATION_HOST}/common/carbon-for-ibm-dotcom/translations/masthead-footer`;
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

  it('should fetch the i18n data from given endpoint', async () => {
    // Expected endpoint called
    const givenEndpoint = '/common/carbon-for-ibm-dotcom/custom-endpoint';
    const endpoint = `${process.env.TRANSLATION_HOST}${givenEndpoint}`;
    const fetchUrl = `${endpoint}/usen.json`;

    await TranslationAPI.getTranslation(
      {
        lc: 'en',
        cc: 'us',
      },
      givenEndpoint
    );

    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'text/plain',
        origin: 'https://ibm.com',
      },
    });
  });

  it('should return a json with a recent timestamp', async () => {
    const mockDate = 1546300800000; // Epoch time of January 1, 2019 midnight UTC
    global.Date.now = jest.fn(() => mockDate);

    // using very old cached session
    sessionStorageMock.setItem(
      'dds-translation-us-en',
      JSON.stringify(Object.assign(oldSession, { CACHE: true }))
    );

    await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    const newSession = JSON.parse(
      sessionStorageMock.getItem('dds-translation-us-en')
    );

    // fresh data would lack this property
    expect(newSession).not.toHaveProperty('CACHE');
  });

  afterEach(() => {
    TranslationAPI.clearCache();
  });
});
