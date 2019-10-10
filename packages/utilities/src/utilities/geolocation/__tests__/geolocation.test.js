import mockAxios from 'axios';
import { geolocation } from '../';

mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      country: 'us',
    },
  })
);

describe('Geolocation utility', () => {
  it('should return an object with the expected cc and lc', async () => {
    Object.defineProperty(window.navigator, 'language', {
      writable: true,
      value: 'en',
    });

    const info = await geolocation();
    const endpoint = process.env.GEO_API;
    const expected = {
      cc: 'us',
      lc: 'en',
    };
    expect(info).toStrictEqual(expected);
    expect(mockAxios.get).toHaveBeenCalledWith(endpoint, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });
});
