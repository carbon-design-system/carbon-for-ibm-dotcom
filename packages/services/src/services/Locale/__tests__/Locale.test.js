/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { geolocation, ipcinfoCookie } from '@carbon/ibmdotcom-utilities';
import digitalDataResponse from '../../DDO/__tests__/data/response.json';
import LocaleAPI from '../Locale';
import mockAxios from 'axios';
import response from './data/response.json';
import root from 'window-or-global';

const mockDigitalDataResponse = digitalDataResponse;

jest.mock(
  '@carbon/ibmdotcom-utilities/lib/utilities/ipcinfoCookie/ipcinfoCookie',
  () => ({
    get: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    set: jest.fn(() => Promise.resolve({})),
  })
);

jest.mock(
  '@carbon/ibmdotcom-utilities/lib/utilities/geolocation/geolocation',
  () => jest.fn(() => Promise.resolve('us'))
);

describe('LocaleAPI', () => {
  const _cc = 'us';
  const _lc = 'en';

  const endpoint = `${process.env.REACT_APP_CORS_PROXY}${process.env.TRANSLATION_HOST}/common/js/dynamicnav/www/countrylist/jsononly`;
  const fetchUrl = `${endpoint}/${_cc}${_lc}-utf8.json`;

  beforeEach(function() {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: response,
      })
    );

    root.digitalData = mockDigitalDataResponse;

    LocaleAPI.clearCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should fetch the lang from the html attribute', async () => {
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

  it('should default to en-us from the html attribute if cc and lc are not defined', async () => {
    Object.defineProperty(window.document.documentElement, 'lang', {
      value: 'it',
      configurable: true,
    });

    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should default to en-us if lang is not defined', async () => {
    const lang = await LocaleAPI.getLang();

    expect(lang).toEqual({
      cc: 'us',
      lc: 'en',
    });
  });

  it('should fetch the display name based on language/locale combination', async () => {
    const data = await LocaleAPI.getLangDisplay();
    expect(data).toEqual('United States — English');
  });

  it('should fetch locale from cookie if availiable', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'ipcInfo=cc%253Dus%253Blc%253Den',
    });

    const locale = await LocaleAPI.getLocale();

    expect(locale).toEqual({ cc: 'us', lc: 'en' });
  });

  it('should verify the locale and return existing combo', () => {
    const locale = LocaleAPI.verifyLocale('us', 'es', response);

    expect(locale).toEqual({ cc: 'us', lc: 'en' });
  });

  xit('should set the ipcInfo cookie once combo has been verified', async () => {
    await LocaleAPI.getLocale();

    expect(ipcinfoCookie.set).toHaveBeenCalledTimes(1);
    expect(geolocation).toHaveBeenCalledTimes(1);
  });

  it('should make the call for the country list', async () => {
    const data = await LocaleAPI.getList({ cc: _cc, lc: _lc });

    expect(data).toEqual(response);
    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });

  it('should use the cache for the country list, keyed by locale', async () => {
    await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    await LocaleAPI.getList({ cc: 'kr', lc: 'ko' });

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });
});
