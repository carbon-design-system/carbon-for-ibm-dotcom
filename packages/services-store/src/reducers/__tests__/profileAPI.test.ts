/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PROFILE_API_ACTION, ProfileAPIState } from '../../types/profileAPI';
import { ProfileAPIActions } from '../../actions/profileAPI';
import convertValue from '../../../tests/utils/convert-value';
import reducer from '../profileAPI';

describe('Redux reducers for `ProfileAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = { request: { user: 'test.user@ibm.com' } };
    expect(reducer(state, {} as ProfileAPIActions)).toEqual(state);
  });

  it('should support setting error in monitoring user authentication status', () => {
    expect(
      convertValue(
        reducer({} as ProfileAPIState, {
          type: PROFILE_API_ACTION.SET_ERROR_REQUEST_USER_STATUS,
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
        reducer({} as ProfileAPIState, {
          type: PROFILE_API_ACTION.SET_USER_STATUS,
          request: { user: 'test.user@ibm.com' },
        })
      )
    ).toEqual({
      request: { user: 'test.user@ibm.com' },
    });
  });
});
