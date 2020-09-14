/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const searchParams = new URLSearchParams();
searchParams.append('response_type', 'token');
searchParams.append('client_id', 'v18loginprod');
searchParams.append('state', window.location.href);
searchParams.append('redirect_uri', 'https://myibm.ibm.com/OIDCHandler.html');
searchParams.append('scope', 'openid');

/**
 * The default nav items for authenticated state.
 */
export const authenticatedProfileItems = [
  {
    title: 'My IBM',
    url: 'https://myibm.ibm.com/?lnk=mmi',
  },
  {
    title: 'Profile',
    url: 'https://myibm.ibm.com/profile/?lnk=mmi',
  },
  {
    title: 'Billing',
    url: 'https://myibm.ibm.com/billing/?lnk=mmi',
  },
  {
    title: 'Log out',
    url: 'https://myibm.ibm.com/pkmslogout?filename=accountRedir.html',
  },
];

/**
 * The default nav items for unauthenticated state.
 */
export const unauthenticatedProfileItems = [
  {
    title: 'Log in',
    url: `https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?${searchParams.toString()}`,
  },
];
