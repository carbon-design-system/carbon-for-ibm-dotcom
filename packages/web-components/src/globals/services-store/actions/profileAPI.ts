/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import ProfileAPI from '@carbon/ibmdotcom-services/es/services/Profile/Profile';
import { UserStatus, PROFILE_API_ACTION, ProfileAPIState } from '../types/profileAPI';

/**
 * @param error An error from the JSONP call for user authentication status.
 * @returns A Redux action to set the state that the JSONP call for user authentication status failed.
 * @private
 */
export function setMonitorUserStatusError(error: Error) {
  return {
    type: PROFILE_API_ACTION.SET_ERROR_MONITOR_USER_STATUS,
    error,
  };
}

/**
 * @param status The user authentication status from the JSONP call.
 * @returns A Redux action to set the given user authentication status.
 */
export function setUserStatus(status: UserStatus) {
  return {
    type: PROFILE_API_ACTION.SET_USER_STATUS,
    status,
  };
}

export type ProfileAPIActions = ReturnType<typeof setMonitorUserStatusError> | ReturnType<typeof setUserStatus>;

/**
 * @returns A Redux action that monitors user authentication status.
 */
export function monitorUserStatus(): ThunkAction<void, { profileAPI: ProfileAPIState }, void, ProfileAPIActions> {
  return dispatch => {
    ProfileAPI.monitorUserStatus((error: Error, status: UserStatus) => {
      if (error) {
        dispatch(setMonitorUserStatusError(error));
      } else {
        dispatch(setUserStatus(status));
      }
    });
  };
}
