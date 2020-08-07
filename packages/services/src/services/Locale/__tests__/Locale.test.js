/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('LocaleAPI', () => {
  beforeEach(function() {
    jest.resetModules();

    this.testDDO = {
      page: {
        pageInfo: {
          ibm: {},
          language: 'de-DE',
        },
      },
    };

    this.testAxios = 'testData';

    this.mockAxios = {
      get: jest.fn(() => Promise.resolve({ data: this.testAxios })),
    };
    jest.doMock('axios', () => this.mockAxios);

    this.testCookie = {
      cc: 'us',
      lc: 'en',
    };
    this.mockCookieInfo = {
      get: jest.fn(() => this.testCookie),
      set: jest.fn(),
    };
    jest.doMock(
      '@carbon/ibmdotcom-utilities/lib/utilities/ipcinfoCookie/ipcinfoCookie',
      () => this.mockCookieInfo
    );

    this.mockGeoLoc = jest.fn(() => Promise.resolve('us'));
    jest.doMock(
      '@carbon/ibmdotcom-utilities/lib/utilities/geolocation/geolocation',
      () => this.mockGeoLoc
    );

    root.digitalData = mockDigitalDataResponse;

    LocaleAPI.clearCache();
  });

  afterEach(function() {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  describe('getLang', function() {
    it('should fetch the lang from the html attribute', async function() {
      Object.defineProperty(window.document.documentElement, 'lang', {
        value: 'fr-ca',
        configurable: true,
      });

      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'ca',
        lc: 'fr',
      });
    });

    it('should default to en-us from the html attribute if cc and lc are not defined', async function() {
      Object.defineProperty(window.document.documentElement, 'lang', {
        value: 'it',
        configurable: true,
      });

      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default to en-us if lang is not defined', async function() {
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default when ddo is undefined', async function() {
      this.testDDO = undefined;
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default when no ddo.page', async function() {
      this.testDDO.page = false;
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default when no ddo.page.pageInfo', async function() {
      this.testDDO.page.pageInfo = false;
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default when no ddo.page.pageInfo.ibm', async function() {
      this.testDDO.page.pageInfo.ibm = false;
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default when no ddo.page.pageInfo.ibm.country', async function() {
      this.testDDO.page.pageInfo.ibm.country = false;
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should default when no ddo.page.pageInfo.language', async function() {
      this.testDDO.page.pageInfo.language = false;
      this.testDDO.page.pageInfo.ibm.country = 'de';
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should get from DDO', async function() {
      this.testDDO.page.pageInfo.language = 'de-DE';
      this.testDDO.page.pageInfo.ibm.country = 'de';
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'de',
        lc: 'de',
      });
    });

    it('should handle multiple countries', async function() {
      this.testDDO.page.pageInfo.language = 'de-DE';
      this.testDDO.page.pageInfo.ibm.country = 'de,ca';
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'de',
        lc: 'de',
      });
    });

    it('should handle map gb to uk', async function() {
      this.testDDO.page.pageInfo.language = 'de-DE';
      this.testDDO.page.pageInfo.ibm.country = 'gb';
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'uk',
        lc: 'de',
      });
    });

    it('should handle map zz to us', async function() {
      this.testDDO.page.pageInfo.language = 'de-DE';
      this.testDDO.page.pageInfo.ibm.country = 'zz';
      const lang = await this.LocaleAPI.getLang();

      expect(lang).toEqual({
        cc: 'us',
        lc: 'de',
      });
    });
  });

  describe('getList', function() {
    it('should get countries', async function() {
      const countries = await this.LocaleAPI.getList({
        cc: 'testCC',
        lc: 'testLC',
      });

      expect(this.mockAxios.get).toHaveBeenCalledTimes(1);
      expect(
        this.mockAxios.get
      ).toHaveBeenCalledWith(
        'https://cra-myproxy.com/https://ibm.com/common/js/dynamicnav/www/countrylist/jsononly/testCCtestLC-utf8.json',
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );

      expect(countries).toEqual(this.testAxios);
    });

    it('should get countries from session cache', async function() {
      const countries1 = await this.LocaleAPI.getList({
        cc: 'testCC',
        lc: 'testLC',
      });
      const countries2 = await this.LocaleAPI.getList({
        cc: 'testCC',
        lc: 'testLC',
      });

      expect(this.mockAxios.get).toHaveBeenCalledTimes(1);
      expect(countries1).toEqual(this.testAxios);
      expect(countries2).toEqual(this.testAxios);
    });

    it('should exhaust retries', function(done) {
      this.mockAxios.get.mockImplementation(() => new Promise(() => {}));

      this.LocaleAPI.getList({ cc: 'testCC', lc: 'testLC' });
      const listPromise = this.LocaleAPI.getList({
        cc: 'testCC',
        lc: 'testLC',
      });

      jest.advanceTimersByTime(100 * 51);

      return listPromise.then(done.fail).catch(() => {
        done();
      });
    }, 6000);

    it('should get default on inital reject', async function() {
      this.mockAxios.get.mockReturnValueOnce(
        Promise.reject(),
        Promise.resolve({ data: this.testAxios })
      );

      const countries = await this.LocaleAPI.getList({
        cc: 'testCC',
        lc: 'testLC',
      });
      expect(this.mockAxios.get).toHaveBeenCalledTimes(2);
      expect(
        this.mockAxios.get
      ).toHaveBeenCalledWith(
        'https://cra-myproxy.com/https://ibm.com/common/js/dynamicnav/www/countrylist/jsononly/testCCtestLC-utf8.json',
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
      expect(
        this.mockAxios.get
      ).toHaveBeenCalledWith(
        'https://cra-myproxy.com/https://ibm.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json',
        { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );

      expect(countries).toEqual(this.testAxios);
    });

    it('should reject', function(done) {
      this.mockAxios.get.mockImplementation(() => Promise.reject());

      this.LocaleAPI.getList({ cc: 'us', lc: 'en' })
        .then(done.fail)
        .catch(done);
    });
  });

  describe('verifyLocale', function() {
    beforeEach(function() {
      this.testList = {
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
      };
    });

    it('should get locale', function() {
      const locale = this.LocaleAPI.verifyLocale('us', 'en', this.testList);

      expect(locale).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should get priority locale', function() {
      const locale = this.LocaleAPI.verifyLocale('us', 'fr', this.testList);

      expect(locale).toEqual({
        cc: 'us',
        lc: 'en',
      });
    });

    it('should get undefined', function() {
      const locale = this.LocaleAPI.verifyLocale('us', 'en', false);

      expect(locale).toBeUndefined();
    });
  });

  describe('getLangDisplay', function() {
    beforeEach(function() {
      this.testLang = {
        cc: 'testCC',
        lc: 'testLC',
      };

      this.testList = {
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
      };

      this.getLangSpy = jest.spyOn(this.LocaleAPI, 'getLang');
      this.getLangSpy.mockReturnValue(Promise.resolve(this.testLang));

      this.getListSpy = jest.spyOn(this.LocaleAPI, 'getList');
      this.getListSpy.mockReturnValue(Promise.resolve(this.testList));
    });

    it('should get display', async function() {
      const display = await this.LocaleAPI.getLangDisplay({
        cc: 'testCC',
        lc: 'testLC',
      });

      expect(display).toEqual('testName — testDisplay');
    });

    it('should get lang for display', async function() {
      const display = await this.LocaleAPI.getLangDisplay(false);

      expect(display).toEqual('testName — testDisplay');
    });

    it('should get default display', async function() {
      const display = await this.LocaleAPI.getLangDisplay({
        cc: 'missingCC',
        lc: 'missingLC',
      });

      expect(display).toEqual('United States — English');
    });
  });

  describe('getLocale', function() {
    beforeEach(function() {
      this.getLangSpy = jest.spyOn(this.LocaleAPI, 'getLang');
      this.getLangSpy.mockReturnValue(Promise.resolve('testLang'));

      this.getListSpy = jest.spyOn(this.LocaleAPI, 'getList');
      this.getListSpy.mockReturnValue(Promise.resolve('testList'));

      this.verifyLocaleSpy = jest.spyOn(this.LocaleAPI, 'verifyLocale');
      this.verifyLocaleSpy.mockReturnValue('testVerified');
    });

    it('should use getLang', async function() {
      const locale = await this.LocaleAPI.getLocale();

      expect(locale).toEqual('testLang');
    });

    it('should use cookies', async function() {
      this.getLangSpy.mockReturnValue(false);

      const locale = await this.LocaleAPI.getLocale();

      expect(locale).toEqual(this.testCookie);
    });

    it('should use geolocation on missing cookie', async function() {
      this.getLangSpy.mockReturnValue(Promise.resolve(false));
      this.testCookie = false;

      await this.LocaleAPI.getLocale();

      expect(this.mockGeoLoc).toHaveBeenCalledTimes(1);
    });

    it('should use geolocation on missing cookie lc', async function() {
      this.getLangSpy.mockReturnValue(Promise.resolve(false));
      this.testCookie = { cc: 'testCC' };

      await this.LocaleAPI.getLocale();

      expect(this.mockGeoLoc).toHaveBeenCalledTimes(1);
    });

    it('should use geolocation on missing cookie cc', async function() {
      this.getLangSpy.mockReturnValue(Promise.resolve(false));
      this.testCookie = { lc: 'testLC' };

      await this.LocaleAPI.getLocale();

      expect(this.mockGeoLoc).toHaveBeenCalledTimes(1);
    });

    it('should use geolocation', async function() {
      this.getLangSpy.mockReturnValue(Promise.resolve(false));
      this.testCookie = false;

      const locale = await this.LocaleAPI.getLocale();

      expect(locale).toEqual('testVerified');
      expect(this.mockCookieInfo.set).toHaveBeenCalledTimes(1);
      expect(this.mockCookieInfo.set).toHaveBeenCalledWith('testVerified');
    });

    it('should return undefined on no cc', async function() {
      this.getLangSpy.mockReturnValue(Promise.resolve(false));
      this.testCookie = false;
      this.mockGeoLoc.mockReturnValue(Promise.resolve(false));

      const locale = await this.LocaleAPI.getLocale();
      expect(locale).toBeUndefined();
    });
  });

  it('should use the cache for the country list, keyed by locale', async () => {
    await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    await LocaleAPI.getList({ cc: 'us', lc: 'en' });
    await LocaleAPI.getList({ cc: 'kr', lc: 'ko' });

    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });
});
