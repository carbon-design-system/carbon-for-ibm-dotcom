/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import ProfileAPI from '@carbon/ibmdotcom-services/es/services/Profile/Profile.js';
import { UserStatus, PROFILE_API_ACTION, ProfileAPIState } from '../types/profileAPI';

/**
 * @param error An error from the JSONP call for user authentication status.
 * @returns A Redux action to set the state that the JSONP call for user authentication status failed.
 * @private
 */
export function setErrorRequestUserStatus(error: Error) {
  return {
    type: PROFILE_API_ACTION.SET_ERROR_REQUEST_USER_STATUS,
    error,
  };
}

/**
 * @param status The promise of the REST call for  user status that is in progress.
 * @returns A Redux action to set the state that the REST call for user status is in progress.
 * @private
 */
export function setRequestUserStatusInProgress(status: Promise<UserStatus>) {
  return {
    type: PROFILE_API_ACTION.SET_REQUEST_USER_STATUS_IN_PROGRESS,
    status,
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

export type ProfileAPIActions =
  | ReturnType<typeof setErrorRequestUserStatus>
  | ReturnType<typeof setRequestUserStatusInProgress>
  | ReturnType<typeof setUserStatus>;

/**
 * @returns A Redux action that gets user authentication status.
 */
export function getUserStatus(): ThunkAction<Promise<UserStatus>, { profileAPI: ProfileAPIState }, void, ProfileAPIActions> {
  return async dispatch => {
    const promiseStatus: Promise<UserStatus> = ProfileAPI.getUserStatus();
    dispatch(setRequestUserStatusInProgress(promiseStatus));
    try {
      dispatch(setUserStatus(await promiseStatus));
    } catch (error) {
      dispatch(setErrorRequestUserStatus(error));
      throw error;
    }
    return promiseStatus;
  };
}
