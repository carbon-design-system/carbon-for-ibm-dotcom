/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';

const _endpoint =
  (process && process.env.GEO_API) ||
  'https://api.www.s81c.com/webmaster/dbip/';
/**
 * Utility to retrieve user's country code based on their IP address
 *
 * @example
 * import { geolocation } from '@carbon/ibmdotcom-utilities';
 *
 * const locationInfo = await geolocation();
 * @returns {string} country cc (cc)
 */
async function geolocation() {
  const location = await axios
    .get(_endpoint, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then((response) => response.data);

  const cc = location && location.country;

  return cc;
}

export default geolocation;
