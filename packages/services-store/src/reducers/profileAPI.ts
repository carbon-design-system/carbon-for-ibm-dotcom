/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PROFILE_API_ACTION, ProfileAPIState } from '../types/profileAPI';
import { setMonitorUserStatusError, setUserStatus, ProfileAPIActions } from '../actions/profileAPI';

/**
 * @param state The state for profile API.
 * @param action The action.
 * @returns The new state for profile API.
 */
export default function reducer(state: ProfileAPIState = {}, action: ProfileAPIActions): ProfileAPIState {
  switch (action.type) {
    case PROFILE_API_ACTION.SET_ERROR_MONITOR_USER_STATUS: {
      const { error: errorMonitorUserStatus } = action as ReturnType<typeof setMonitorUserStatusError>;
      return {
        ...state,
        errorMonitorUserStatus,
      };
    }
    case PROFILE_API_ACTION.SET_USER_STATUS: {
      const { status } = action as ReturnType<typeof setUserStatus>;
      return {
        ...state,
        status,
      };
    }
    default:
      return state;
  }
}
