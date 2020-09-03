/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import responseSuccess from './data/response.json';

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
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should fetch the i18n data', async () => {
    // setting up individual test environment variables
    delete process.env.REACT_APP_CORS_PROXY;
    delete process.env.CORS_PROXY;

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

  it('should replace the signout url "state" param with current location', async () => {
    Object.defineProperty(global, 'location', {
      value: {
        href: 'https://www.loremipsum.com',
      },
      writable: true,
    });

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

  xit('should fetch using REACT_APP_CORS_PROXY', async () => {
    // setting up individual test environment variables
    process.env.REACT_APP_CORS_PROXY = 'https://cra-myproxy.net/';
    process.env.CORS_PROXY = 'https://myproxy.net/';

    // reinitializing imports
    const TranslationAPI = (await import('../Translation')).default;

    // Expected endpoint called
    const endpoint = `${process.env.REACT_APP_CORS_PROXY}${process.env.TRANSLATION_HOST}/common/v18/js/data/jsononly`;
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

  xit('should fetch using CORS_PROXY', async () => {
    // setting up individual test environment variables
    delete process.env.REACT_APP_CORS_PROXY;
    process.env.CORS_PROXY = 'https://myproxy.net/';

    // reinitializing import
    const TranslationAPI = (await import('../Translation')).default;

    // Expected endpoint called
    const endpoint = `${process.env.CORS_PROXY}${process.env.TRANSLATION_HOST}/common/v18/js/data/jsononly`;
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
