/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PROFILE_API_ACTION, ProfileAPIState } from '../types/profileAPI';
import {
  setErrorRequestUserStatus,
  setUserStatus,
  ProfileAPIActions,
} from '../actions/profileAPI';

/**
 * @param state The state for profile API.
 * @param action The action.
 * @returns The new state for profile API.
 */
export default function reducer(
  state: ProfileAPIState = {},
  action: ProfileAPIActions
): ProfileAPIState {
  switch (action.type) {
    case PROFILE_API_ACTION.SET_ERROR_REQUEST_USER_STATUS: {
      const { error: errorGetUserStatus } = action as ReturnType<
        typeof setErrorRequestUserStatus
      >;
      return {
        ...state,
        errorGetUserStatus,
      };
    }
    case PROFILE_API_ACTION.SET_USER_STATUS: {
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
