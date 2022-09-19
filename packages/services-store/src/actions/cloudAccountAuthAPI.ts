/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import CloudAccountAuthAPI from '@carbon/ibmdotcom-services/es/services/CloudAccountAuth/CloudAccountAuth.js';
import { UserStatus, CLOUD_ACCOUNT_AUTH_API_ACTION, CloudAccountAuthAPIState } from '../types/cloudAccountAuthAPI';

/**
 * @param error An error from the JSONP call for user authentication status.
 * @returns A Redux action to set the state that the JSONP call for user authentication status failed.
 * @private
 */
export function setErrorRequestUserStatus(error: Error) {
  return {
    type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_ERROR_REQUEST_USER_STATUS,
    error,
  };
}

/**
 * @param request The promise of the REST call for  user status that is in progress.
 * @returns A Redux action to set the state that the REST call for user status is in progress.
 * @private
 */
export function setRequestUserStatusInProgress(request: Promise<UserStatus>) {
  return {
    type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_REQUEST_USER_STATUS_IN_PROGRESS,
    request,
  };
}

/**
 * @param request The user authentication status from the JSONP call.
 * @returns A Redux action to set the given user authentication status.
 */
export function setUserStatus(request: UserStatus) {
  return {
    type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_USER_STATUS,
    request,
  };
}

export type CloudAccountAuthAPIActions =
  | ReturnType<typeof setErrorRequestUserStatus>
  | ReturnType<typeof setRequestUserStatusInProgress>
  | ReturnType<typeof setUserStatus>;

/**
 * @returns A Redux action that sends a REST call for user authentication status.
 */
export function loadUserStatus(
  authMethod: string
): ThunkAction<Promise<UserStatus>, { cloudAccountAuthAPI: CloudAccountAuthAPIState }, void, CloudAccountAuthAPIActions> {
  return async dispatch => {
    const promiseStatus: Promise<UserStatus> =
      authMethod === 'cookie' ? CloudAccountAuthAPI.checkCookie() : CloudAccountAuthAPI.checkAPI();
    dispatch(setRequestUserStatusInProgress(promiseStatus));
    try {
      dispatch(setUserStatus(await promiseStatus));
    } catch (error) {
      dispatch(setErrorRequestUserStatus(error as Error));
      throw error;
    }
    return promiseStatus;
  };
}
