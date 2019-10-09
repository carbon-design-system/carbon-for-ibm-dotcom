import axios from 'axios';

const _endpoint = process.env.GEO_API;
/**
 * Utility to retrieve user's country code based on their IP address
 * and the language code from the browser language preference
 *
 * @returns {object} object with cc and lc data
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

  // get language preference from browser
  const lc = window.navigator.language;

  if (cc && lc) {
    return { cc, lc };
  } else return;
}

export default geolocation;
