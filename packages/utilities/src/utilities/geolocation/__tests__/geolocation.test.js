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
  it('should return an object with the expected cc', async () => {
    const info = await geolocation();
    const endpoint = process.env.GEO_API;
    expect(info).toBe('us');
    expect(mockAxios.get).toHaveBeenCalledWith(endpoint, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });
});
