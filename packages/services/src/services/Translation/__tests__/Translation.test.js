/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import responseSuccess from './data/response.json';
import TranslationAPI from '../Translation';

jest.mock('../../Locale', () => ({
  LocaleAPI: {
    getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
  },
}));

describe('TranslationAPI', () => {
  beforeEach(function() {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: responseSuccess,
      })
    );
  });

  it('should fetch the i18n data', async () => {
    const endpoint = `${process.env.CORS_PROXY}${process.env.TRANSLATION_HOST}/common/v18/js/data/jsononly`;
    const fetchUrl = `${endpoint}/usen.json`;

    const response = await TranslationAPI.getTranslation({
      lc: 'en',
      cc: 'us',
    });
    expect(response).toEqual(responseSuccess);

    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'text/plain',
        origin: 'https://ibm.com',
      },
    });
  });
});
