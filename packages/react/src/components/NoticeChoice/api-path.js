/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const publicRuntimeConfig = {
  API_DOMAIN_V2: 'https://www.ibm.com',
  // API_ENDPOINT_V2: 'https://www.ibm.com/account/apis/v2.0',
  API_ENDPOINT_V2: 'https://idm02.somerslab.ibm.com/account/apis/v2.0',
};
// console.log('publicRuntimeConfig', publicRuntimeConfig);

const URX_PWS_LOOKUP = `${publicRuntimeConfig.API_ENDPOINT_V2}/pws/lookup`;
const URX_PWS_LOOKUP_V3 = `${publicRuntimeConfig.API_ENDPOINT_V2}/pws/V3.0/lookup`;
const FORM_PATH = `${publicRuntimeConfig.API_DOMAIN_V2}${publicRuntimeConfig.API_ENDPOINT_V2}/forms`;

export { FORM_PATH, URX_PWS_LOOKUP, URX_PWS_LOOKUP_V3 };
export function apiPath(path) {
  let pathToReturn = path;
  const match = path.match(/^\/([a-z]{2}-[a-z]{2})\//i);
  if (match && match[1]) {
    pathToReturn = pathToReturn.replace(match[1], '');
    pathToReturn = pathToReturn.replace('//', '/');
  }
  return pathToReturn;
}
