/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  geolocation,
  ipcinfoCookie,
} from '../../../internal/vendor/@carbon/ibmdotcom-utilities';
import digitalDataResponse from '../../DDO/__tests__/data/response.json';
import LocaleAPI from '../Locale';
import mockAxios from 'axios';
import oldSession from './data/timestamp_response.json';
import response from './data/response.json';
import root from 'window-or-global';

const mockDigitalDataResponse = digitalDataResponse;

jest.mock(
  '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/ipcinfoCookie/ipcinfoCookie',
  () => ({
    get: jest.fn(() => ({ cc: 'us', lc: 'en' })),
    set: jest.fn(() => ({})),
  })
);

jest.mock(
  '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/geolocation/geolocation',
  () => jest.fn(() => Promise.resolve('us'))
);

describe('LocaleAPI', () => {
  const handles = [];

  beforeEach(function () {
    mockAxios.get.mockImplementation(async () => ({
      data: response,
    }));

    root.digitalData = mockDigitalDataResponse;

    Object.defineProperty(window.document.documentElement, 'lang', {
      value: '',
      configurable: true,
    });

    LocaleAPI.clearCache();
  });

  it('should fetch the lang from the html attribute when there is no ddo defined', async () => {
    root.digitalData.page = false;

    Object.defineProperty(window.document.documentElement, 'lang', {
      value: 'fr-ca',
      configurable: true,
    });

    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'ca',
      lc: 'fr',
    });
  });

  it('should default to value from the html lang attribute if cc and lc are not defined', async () => {
    Object.defineProperty(window.document.documentElement, 'lang', {
      value: 'it',
      configurable: true,
    });

    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      lc: 'it',
    });
  });

  it('should return only lc when only lc is present in ddo language', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          language: 'es',
        },
      },
    };

    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      lc: 'es',
    });
  });

  it('should default when ddo and lang are undefined', async () => {
    root.digitalData = undefined;
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should default when no ddo.page', async () => {
    root.digitalData.page = false;
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should default when no ddo.page.pageInfo', async () => {
    root.digitalData = {
      page: {
        pageInfo: false,
      },
    };
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should default when no ddo.page.pageInfo.ibm', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          ibm: false,
        },
      },
    };
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should default when no ddo.page.pageInfo.ibm.country', async () => {
    root.digitalData = {
      page: {
        pageInfo: {
          ibm: {
            country: false,
          },
        },
      },
    };
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should default when no ddo.page.pageInfo.language', async () => {
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
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should get from DDO', async () => {
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
    const lang = await LocaleAPI.getLang();

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
    const lang = await LocaleAPI.getLang();

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
    const lang = await LocaleAPI.getLang();

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
    const lang = await LocaleAPI.getLang();

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

    expect(countries).toEqual(response);
  });

  it('should get countries list from session cache', async () => {
    mockAxios.get.mockClear();
    const countries1 = await LocaleAPI.getList({
      cc: 'testCC',
      lc: 'testLC',
    });
    const countries2 = await LocaleAPI.getList({
      cc: 'testCC',
      lc: 'testLC',
    });

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(countries1).toEqual(response);
    expect(countries2).toEqual(response);
  });

  it('should get default countries list on inital reject', async () => {
    mockAxios.get.mockClear();
    mockAxios.get
      .mockReturnValueOnce(Promise.reject())
      .mockReturnValueOnce(Promise.resolve({ data: response }));

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

    expect(countries).toEqual(response);
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

  it('should get lang for display', async () => {
    const display = await LocaleAPI.getLangDisplay(false);

    expect(display).toEqual('testName — testDisplay');
  });

  it('should get default lang display', async () => {
    const display = await LocaleAPI.getLangDisplay({
      cc: 'missingCC',
      lc: 'missingLC',
    });

    expect(display).toEqual('United States — English');
  });

  it('should get locale from getLang', async () => {
    jest
      .spyOn(LocaleAPI, 'getLang')
      .mockReturnValue(Promise.resolve('testLang'));
    jest
      .spyOn(LocaleAPI, 'getList')
      .mockReturnValue(Promise.resolve('testList'));
    jest.spyOn(LocaleAPI, 'verifyLocale').mockReturnValue('testVerified');
    const locale = await LocaleAPI.getLocale();

    expect(locale).toEqual('testLang');
  });

  it('should get locale from cookies', async () => {
    jest.spyOn(LocaleAPI, 'getLang').mockReturnValue(Promise.resolve(false));

    const locale = await LocaleAPI.getLocale();

    expect(locale).toEqual({ cc: 'us', lc: 'en' });
  });

  it('should get locale from geolocation on missing cookie', async () => {
    ipcinfoCookie.get.mockImplementation(() => false);

    await LocaleAPI.getLocale();

    expect(geolocation).toHaveBeenCalledTimes(1);
  });

  it('should get locale from geolocation on missing cookie lc', async () => {
    geolocation.mockClear();
    ipcinfoCookie.get.mockImplementation(() => ({ cc: 'testCC' }));

    await LocaleAPI.getLocale();

    expect(geolocation).toHaveBeenCalledTimes(1);
  });

  it('should get locale from geolocation on missing cookie cc', async () => {
    geolocation.mockClear();
    ipcinfoCookie.get.mockImplementation(() => ({ lc: 'testLC' }));

    await LocaleAPI.getLocale();

    expect(geolocation).toHaveBeenCalledTimes(1);
  });

  it('should get locale from geolocation', async () => {
    ipcinfoCookie.set.mockClear();
    ipcinfoCookie.get.mockImplementation(() => false);

    const locale = await LocaleAPI.getLocale();

    expect(locale).toEqual('testVerified');
    expect(ipcinfoCookie.set).toHaveBeenCalledTimes(1);
    expect(ipcinfoCookie.set).toHaveBeenCalledWith('testVerified');
  });

  it('should get undefined locale on no cc', async () => {
    geolocation.mockImplementation(() => Promise.resolve(false));

    const locale = await LocaleAPI.getLocale();
    expect(locale).toBeUndefined();
  });

  it('should use the cache for the country list, keyed by locale', async () => {
    mockAxios.get.mockClear();
    LocaleAPI.getList.mockRestore();
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

    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
    });

    const mockDate = 1546300800000; // Epoch time of January 1, 2019 midnight UTC
    global.Date.now = jest.fn(() => mockDate);

    // using very old cached session
    sessionStorageMock.setItem(
      'dds-countrylist-en-us',
      JSON.stringify(Object.assign(oldSession, { CACHE: true }))
    );

    await LocaleAPI.getList({
      cc: 'us',
      lc: 'en',
    });

    const newSession = JSON.parse(
      sessionStorageMock.getItem('dds-countrylist-en-us')
    );

    // fresh cached data would lack this property
    expect(newSession).not.toHaveProperty('CACHE');
  });

  afterEach(() => {
    for (let handle = handles.pop(); handle; handle = handles.pop()) {
      handle.release();
    }
  });
});
