/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { USER_AUTHENTICATION_STATUS, PROFILE_API_ACTION, ProfileAPIState } from '../../types/profileAPI';
import { ProfileAPIActions } from '../../actions/profileAPI';
import convertValue from '../../../../../tests/utils/convert-value';
import reducer from '../profileAPI';

describe('Redux reducers for `ProfileAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = { status: { user: USER_AUTHENTICATION_STATUS.AUTHENTICATED } };
    expect(reducer(state, {} as ProfileAPIActions)).toEqual(state);
  });

  it('should support setting error in monitoring user authentication status', () => {
    expect(
      convertValue(
        reducer({} as ProfileAPIState, {
          type: PROFILE_API_ACTION.SET_ERROR_MONITOR_USER_STATUS,
          error: new Error('error-user-status'),
        })
      )
    ).toEqual({
      errorMonitorUserStatus: 'error-user-status',
    });
  });

  it('should support setting new user status', () => {
    expect(
      convertValue(
        reducer({} as ProfileAPIState, {
          type: PROFILE_API_ACTION.SET_USER_STATUS,
          status: { user: USER_AUTHENTICATION_STATUS.AUTHENTICATED },
        })
      )
    ).toEqual({
      status: { user: USER_AUTHENTICATION_STATUS.AUTHENTICATED },
    });
  });
});
