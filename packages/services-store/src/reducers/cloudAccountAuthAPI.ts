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
} from '../types/cloudAccountAuthAPI';
import {
  setErrorRequestUserStatus,
  setUserStatus,
  CloudAccountAuthAPIActions,
} from '../actions/cloudAccountAuthAPI';

/**
 * @param state The state for cloud account auth API.
 * @param action The action.
 * @returns The new state for cloud account auth API.
 */
export default function reducer(
  state: CloudAccountAuthAPIState = {},
  action: CloudAccountAuthAPIActions
): CloudAccountAuthAPIState {
  switch (action.type) {
    case CLOUD_ACCOUNT_AUTH_API_ACTION.SET_ERROR_REQUEST_USER_STATUS: {
      const { error: errorGetUserStatus } = action as ReturnType<
        typeof setErrorRequestUserStatus
      >;
      return {
        ...state,
        errorGetUserStatus,
      };
    }
    case CLOUD_ACCOUNT_AUTH_API_ACTION.SET_USER_STATUS: {
      const { request } = action as ReturnType<typeof setUserStatus>;
      return {
        ...state,
        request,
      };
    }
    default:
      return state;
  }
}
