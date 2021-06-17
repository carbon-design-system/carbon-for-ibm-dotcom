/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cloudAccountAuthentication } from '../';

describe('cloudAccountAuthentication cookie utility', () => {
  it('should fetch the cloudAccountAuthentication cookie and return the authenticated string', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'com.ibm.cloud.iam.LoggedIn.manual=1',
    });

    const loginStatus = cloudAccountAuthentication.checkCookie();
    expect(loginStatus).toStrictEqual('authenticated');
  });

  it('should fetch the cloudAccountAuthentication cookie and return the anonymous string', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'com.ibm.cloud.iam.LoggedIn.manual=0',
    });

    const loginStatus = cloudAccountAuthentication.checkCookie();
    expect(loginStatus).toStrictEqual('anonymous');
  });
});

describe('cloudAccountAuthentication api utility', () => {
  xit('should fetch the cloudAccountAuthentication api and return the authenticated string', () => {
    expect(true).toBe(true);
  });

  xit('should fetch the cloudAccountAuthentication api and return the anonymous string', () => {
    expect(true).toBe(true);
  });
});
