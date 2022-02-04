/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CloudAccountAuthAPI from '../CloudAccountAuth';
import root from 'window-or-global';

describe('CloudAccountAuth personalization utility', () => {
  it('should fetch the personalization window boolean and return the authenticated string', () => {
    root.digitalData = {
      ddo: {
        user: {
          segment: {
            isCloudLoggedOn: true,
          },
        },
      },
    };

    const loginStatus = CloudAccountAuthAPI.checkPersonalization();
    expect(loginStatus).toStrictEqual({ user: 'authenticated' });
  });

  it('should fetch the personalization window boolean and return the anonymous string', () => {
    root.digitalData = {
      ddo: {
        user: {
          segment: {
            isCloudLoggedOn: false,
          },
        },
      },
    };

    const loginStatus = CloudAccountAuthAPI.checkPersonalization();
    expect(loginStatus).toStrictEqual({ user: 'anonymous' });
  });
});
