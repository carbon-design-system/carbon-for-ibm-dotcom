/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CloudAccountAuthAPI from '../CloudAccountAuth';

describe('CloudAccountAuth cookie utility', () => {
  it('should fetch the CloudAccountAuth cookie and return the authenticated string', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'com.ibm.cloud.iam.LoggedIn.manual=1',
    });

    const loginStatus = CloudAccountAuthAPI.checkCookie();
    expect(loginStatus).toStrictEqual('authenticated');
  });

  it('should fetch the CloudAccountAuth cookie and return the anonymous string', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'com.ibm.cloud.iam.LoggedIn.manual=0',
    });

    const loginStatus = CloudAccountAuthAPI.checkCookie();
    expect(loginStatus).toStrictEqual('anonymous');
  });
});
