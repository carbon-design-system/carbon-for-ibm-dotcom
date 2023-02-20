/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CLOUD_ACCOUNT_AUTH_API_ACTION,
  CloudAccountAuthAPIState,
} from '../../types/cloudAccountAuthAPI';
import { CloudAccountAuthAPIActions } from '../../actions/cloudAccountAuthAPI';
import convertValue from '../../../tests/utils/convert-value';
import reducer from '../cloudAccountAuthAPI';

describe('Redux reducers for `CloudAccountAuthAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = { request: { user: 'authenticated' } };
    expect(reducer(state, {} as CloudAccountAuthAPIActions)).toEqual(state);
  });

  it('should support setting error in monitoring user authentication status', () => {
    expect(
      convertValue(
        reducer({} as CloudAccountAuthAPIState, {
          type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_ERROR_REQUEST_USER_STATUS,
          error: new Error('error-user-status'),
        })
      )
    ).toEqual({
      errorGetUserStatus: 'error-user-status',
    });
  });

  it('should support setting new user status', () => {
    expect(
      convertValue(
        reducer({} as CloudAccountAuthAPIState, {
          type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_USER_STATUS,
          request: { user: 'authenticated' },
        })
      )
    ).toEqual({
      request: { user: 'authenticated' },
    });
  });
});
