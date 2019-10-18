import axios from 'axios';

const _endpoint = process.env.GEO_API;
/**
 * Utility to retrieve user's country code based on their IP address
 *
 * @example
 * import { geolocation } from '@carbon/ibmdotcom-utilities';
 *
 * const locationInfo = await geolocation();
 *
 * @returns {string} country cc (cc)
 *
 */
async function geolocation() {
  const location = await axios
    .get(_endpoint, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(response => response.data);

  const cc = location && location.country;

  return cc;
}

export default geolocation;
