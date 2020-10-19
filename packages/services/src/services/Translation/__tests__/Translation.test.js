/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import oldSession from './data/timestamp_response.json';
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

const sessionStorageMock = (() => {
  let cache = {};

  return {
    getItem(key) {
      return cache[key];
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
    //sessionStorageMock.mockRestore();
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
    //console.log(responseSuccess.timestamp)

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

    /*

    console.log(mockAxios.get.getMockImplementation.toString())
    console.log(responseSuccess.timestamp)
    console.log(response.timestamp);
    console.log(elseResponse.timestamp) */

    expect(elseResponse).toEqual(responseSuccess);

    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'text/plain',
        origin: 'https://ibm.com',
      },
    });
    expect(response).toEqual(responseSuccess);
  });

  it('should return a json with a recent timestamp', async () => {
    // using very old cached session
    sessionStorageMock.setItem('dds-translation-us-en', oldSession);
    const previousSession = sessionStorageMock.getItem('dds-translation-us-en');

    // reinitializing import
    const TranslationAPI = (await import('../Translation')).default;

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });

    const newSession = JSON.parse(
      sessionStorageMock.getItem('dds-translation-us-en')
    );

    // newest response and storage data should match
    expect(response).toEqual(newSession);

    // should contain timestamp
    expect(response).toHaveProperty('timestamp');

    // should not equal old timestamp
    expect(previousSession.timestamp).not.toEqual(response.timestamp);

    const timeDiff = response.timestamp - previousSession.timestamp,
      _twoHours = 60 * 60 * 2000;

    // timestamps should have at least a two hour difference
    expect(timeDiff).toBeGreaterThan(_twoHours);
  });
});
