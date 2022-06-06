/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CloudAccountAuthAPI from '../CloudAccountAuth';
import root from 'window-or-global';

describe('CloudAccountAuth personalization utility', () => {
  beforeEach(function() {
    root.digitalData = {
      page: {
        isDataLayerReady: true,
      },
      user: {
        segment: {
          isCloudLoggedOn: true,
        },
      },
    };
  });

  it('should fetch the personalization window boolean and return the authenticated string', async () => {
    const loginStatus = await CloudAccountAuthAPI.checkPersonalization();
    expect(loginStatus).toStrictEqual({ user: 'authenticated' });
  });

  it('should fetch the personalization window boolean and return the anonymous string', async () => {
    root.digitalData.user.segment.isCloudLoggedOn = false;

    const loginStatus = await CloudAccountAuthAPI.checkPersonalization();
    expect(loginStatus).toStrictEqual({ user: 'anonymous' });
  });
});
