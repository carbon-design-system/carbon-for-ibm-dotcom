/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ipcinfoCookie from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/ipcinfoCookie/ipcinfoCookie';
import LocaleAPI from '../Locale';
import { DDOAPI } from '../../DDO';
import mockAxios from 'axios';
import root from 'window-or-global';
import countriesResponse from './data/countries_response.json';
import digitalDataResponse from './data/ddo_response.json';
import oldSession from './data/timestamp_response.json';

const mockDigitalDataResponse = digitalDataResponse;

jest.mock(
  '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/ipcinfoCookie/ipcinfoCookie'
);
jest.mock('../../DDO');

describe('LocaleAPI', () => {
  const handles = [];

  beforeEach(function () {
    mockAxios.get.mockImplementation(async () => ({
      data: countriesResponse,
    }));

    // Setup all fallback levels to initially be set to Brazilian Portuguese.
    // We intentionally avoid en-US to avoid matching the default fallback and
    // producing false positives.

    // Mock DDO includes:
    // page.pageInfo.language === 'pt-BR'
    // page.pageInfo.ibm.country === 'br'
    root.digitalData = JSON.parse(JSON.stringify(mockDigitalDataResponse));

    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'pt',
      configurable: true,
    });

    ipcinfoCookie.get.mockImplementation(() => ({ cc: 'br', lc: 'pt' }));

    DDOAPI.getLocation.mockImplementation(() => Promise.resolve('br'));

    Object.defineProperty(root, 'navigator', {
      value: { language: 'pt-BR' },
      writable: true,
    });

    LocaleAPI.clearCache();
  });

  afterEach(() => {
    for (let handle = handles.pop(); handle; handle = handles.pop()) {
      handle.release();
    }
    // Restore any mocks back to a predictable state.
    jest.restoreAllMocks();
    mockAxios.get.mockRestore();
    ipcinfoCookie.get.mockRestore();
    DDOAPI.getLocation.mockRestore();
  });

  it('should fallback to the locale from the html lang attribute (cc and lc) when there is no ddo defined', async () => {
    root.digitalData.page = false;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'fr-CA',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should fallback to the lang from the html lang attribute (lc only) when there is no ddo defined', async () => {
    root.digitalData.page = false;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'it',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      lc: 'it',
    });
  });

  it('should fallback to only lc when only lc is present in ddo language', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: 'es',
        },
      },
    };

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      lc: 'es',
    });
  });

  it('should fallback to the cookie locale when ddo and lang are undefined', async () => {
    root.digitalData = undefined;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: '',
      configurable: true,
    });
    ipcinfoCookie.get.mockImplementationOnce(() => ({ cc: 'ca', lc: 'fr' }));

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({ cc: 'ca', lc: 'fr' });
  });

  it('should fallback to browser locale when ddo, lang, and cookie are undefined', async () => {
    root.digitalData = undefined;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: '',
      configurable: true,
    });
    ipcinfoCookie.get.mockImplementationOnce(() => undefined);
    DDOAPI.getLocation.mockImplementation(() => Promise.resolve('fr'));
    Object.defineProperty(root, 'navigator', {
      value: { language: 'fr-FR' },
      writable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({ cc: 'fr', lc: 'fr' });
  });

  it('should fallback to default when ddo, lang, cookie, and browser are undefined', async () => {
    root.digitalData = undefined;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: '',
      configurable: true,
    });
    ipcinfoCookie.get.mockImplementationOnce(() => undefined);
    Object.defineProperty(root, 'navigator', {
      value: { language: '' },
      writable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should fallback to default when ddo, lang, cookie, and browser are undefined and the DDOAPI timeouts', async () => {
    root.digitalData = undefined;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: '',
      configurable: true,
    });
    ipcinfoCookie.get.mockImplementationOnce(() => undefined);
    DDOAPI.getLocation.mockImplementation(() => Promise.reject(new Error()));
    Object.defineProperty(root, 'navigator', {
      value: { language: '' },
      writable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should fallback to the locale from the html lang attribute when no ddo.page', async () => {
    root.digitalData.page = false;
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'fr-CA',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should fallback to the locale from the html lang attribute when no ddo.page.pageInfo', async () => {
    root.digitalData = {
      page: {
        pageInfo: false,
      },
    };
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'fr-CA',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should fallback to the locale from the html lang attribute when no ddo.page.pageInfo.ibm', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          ibm: false,
        },
      },
    };
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'fr-CA',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should fallback to the locale from the html lang attribute when no ddo.page.pageInfo.ibm.country', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          ibm: {
            country: false,
          },
        },
      },
    };
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'fr-CA',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should fallback to the locale from the html lang attribute when no ddo.page.pageInfo.language', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: false,
          ibm: {
            country: 'de',
          },
        },
      },
    };
    Object.defineProperty(root.document.documentElement, 'lang', {
      value: 'fr-CA',
      configurable: true,
    });

    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should get locale from DDO', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: 'de-DE',
          ibm: {
            country: 'de',
          },
        },
      },
    };
    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'de',
      lc: 'de',
    });
  });

  it('should handle multiple countries', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: 'de-DE',
          ibm: {
            country: 'de,ca',
          },
        },
      },
    };
    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'de',
      lc: 'de',
    });
  });

  it('should handle map gb to uk', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: 'de-DE',
          ibm: {
            country: 'gb',
          },
        },
      },
    };
    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'uk',
      lc: 'de',
    });
  });

  it('should handle map zz to us', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: 'de-DE',
          ibm: {
            country: 'zz',
          },
        },
      },
    };
    const lang = await LocaleAPI.getLocale();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'de',
    });
  });

  it('should get countries list', async () => {
    const countries = await LocaleAPI.getList({
      cc: 'testCC',
      lc: 'testLC',
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://ibm.com/common/js/dynamicnav/www/countrylist/jsononly/testCCtestLC-utf8.json',
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );

    expect(countries).toEqual(countriesResponse);
  });

  it('should get countries list from session cache', async () => {
    const countries1 = await LocaleAPI.getList({
      cc: 'testCC',
      lc: 'testLC',
    });
    const countries2 = await LocaleAPI.getList({
      cc: 'testCC',
      lc: 'testLC',
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(countries1).toEqual(countriesResponse);
    expect(countries2).toEqual(countriesResponse);
  });

  it('should get default countries list on initial reject', async () => {
    mockAxios.get
      .mockReturnValueOnce(Promise.reject())
      .mockReturnValueOnce(Promise.resolve({ data: countriesResponse }));

    const countries = await LocaleAPI.getList({
      cc: 'testCC',
      lc: 'testLC',
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://ibm.com/common/js/dynamicnav/www/countrylist/jsononly/testCCtestLC-utf8.json',
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
    expect(mockAxios.get).toHaveBeenCalledWith(
      'https://ibm.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json',
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );

    expect(countries).toEqual(countriesResponse);
  });

  it('should reject countries list', async () => {
    mockAxios.get.mockImplementation(() => Promise.reject());

    let caught;
    try {
      await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    } catch (error) {
      caught = true;
    }
    expect(caught).not.toBeNull();
  });

  it('should verify locale', () => {
    const locale = LocaleAPI.verifyLocale('us', 'en', {
      regionList: [
        {
          countryList: [
            {
              locale: [['en-us']],
            },
            {
              locale: [['de-de']],
            },
          ],
        },
      ],
    });

    expect(locale).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should verify priority locale', () => {
    const locale = LocaleAPI.verifyLocale('us', 'fr', {
      regionList: [
        {
          countryList: [
            {
              locale: [['en-us']],
            },
            {
              locale: [['de-de']],
            },
          ],
        },
      ],
    });

    expect(locale).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should verify undefined', () => {
    const locale = LocaleAPI.verifyLocale('us', 'en', false);

    expect(locale).toBeUndefined();
  });

  it('should get lang display', async () => {
    jest.spyOn(LocaleAPI, 'getLang').mockReturnValue(
      Promise.resolve({
        cc: 'testCC',
        lc: 'testLC',
      })
    );
    jest.spyOn(LocaleAPI, 'getList').mockReturnValue(
      Promise.resolve({
        regionList: [
          {
            countryList: [
              {
                name: 'testName',
                locale: [
                  ['testLC-testCC', 'testDisplay'],
                  ['altLocale', 'altDisplay'],
                ],
              },
              {
                locale: [['testLC2-testCC2', 'testDisplay2']],
              },
            ],
          },
        ],
      })
    );

    const display = await LocaleAPI.getLangDisplay({
      cc: 'testCC',
      lc: 'testLC',
    });

    expect(display).toEqual('testName — testDisplay');
  });

  it('should use getLocale for display with no langCode argument', async () => {
    jest.spyOn(LocaleAPI, 'getLocale');

    const display = await LocaleAPI.getLangDisplay(false);

    expect(LocaleAPI.getLocale).toHaveBeenCalledTimes(1);
    expect(display).toEqual('Brazil — Portuguese');
  });

  it('should get default lang display for missing locale', async () => {
    const display = await LocaleAPI.getLangDisplay({
      cc: 'missingCC',
      lc: 'missingLC',
    });

    expect(display).toEqual('United States — English');
  });

  it('should get locale from getLocale', async () => {
    jest
      .spyOn(LocaleAPI, 'getLocale')
      .mockReturnValue(Promise.resolve('testLang'));

    const locale = await LocaleAPI.getLang();

    expect(LocaleAPI.getLocale).toHaveBeenCalledTimes(1);
    expect(locale).toEqual('testLang');
  });

  it('should use the cache for the country list, keyed by locale', async () => {
    await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    await LocaleAPI.getList({ cc: 'kr', lc: 'ko' });

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });

  it('should update the cached response if session is old', async () => {
    // mock storage for specific test
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

    Object.defineProperty(root, 'sessionStorage', {
      value: sessionStorageMock,
    });

    const mockDate = 1546300800000; // Epoch time of January 1, 2019 midnight UTC
    root.Date.now = jest.fn(() => mockDate);

    // using very old cached session
    sessionStorageMock.setItem(
      'cds-countrylist-en-us',
      JSON.stringify(Object.assign(oldSession, { CACHE: true }))
    );

    await LocaleAPI.getList({
      cc: 'us',
      lc: 'en',
    });

    const newSession = JSON.parse(
      sessionStorageMock.getItem('cds-countrylist-en-us')
    );

    // fresh cached data would lack this property
    expect(newSession).not.toHaveProperty('CACHE');
  });
});
