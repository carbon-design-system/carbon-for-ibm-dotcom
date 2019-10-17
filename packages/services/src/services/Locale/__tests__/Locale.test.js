import mockAxios from 'axios';
import LocaleAPI from '../Locale';
import response from './data/response.json';
import { ipcinfoCookie, geolocation } from '@carbon/ibmdotcom-utilities';

jest.mock('@carbon/ibmdotcom-utilities', () => ({
  ipcinfoCookie: {
    get: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
    set: jest.fn(() => Promise.resolve({})),
  },
  geolocation: jest.fn(() => Promise.resolve('us')),
}));

describe('LocaleAPI', () => {
  const _cc = 'us';
  const _lc = 'es';

  const endpoint = `${process.env.TRANSLATION_HOST}/common/v18/js/data/countrylist`;
  const fetchUrl = `${endpoint}/${_cc}${_lc}-utf8.json`;

  beforeEach(function() {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: response,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it('should set the ipcInfo cookie once combo has been verified', async () => {
    await LocaleAPI.getLocale();

    expect(ipcinfoCookie.set).toHaveBeenCalledTimes(1);
    expect(geolocation).toHaveBeenCalledTimes(1);
  });

  it('should make the call for the country list', async () => {
    const data = await LocaleAPI.getList(_cc, _lc);

    expect(data).toEqual(response);
    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });
});
