/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { geolocation } from '../';
import mockAxios from 'axios';

mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      country: 'us',
    },
  })
);

describe('Geolocation utility', () => {
  it('should return an object with the expected cc', async () => {
    const info = await geolocation();
    const endpoint =
      process.env.GEO_API || 'https://api.www.s81c.com/webmaster/dbip/';
    expect(info).toBe('us');
    expect(mockAxios.get).toHaveBeenCalledWith(endpoint, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });
});
