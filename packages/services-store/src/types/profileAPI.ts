/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The user authentication status.
 */
export enum USER_AUTHENTICATION_STATUS {
  /**
   * Authenticated.
   */
  AUTHENTICATED = 'Authenticated',

  /**
   * Unauthenticated.
   */
  UNAUTHENTICATED = 'Unauthenticated',
}

/**
 * The user authentication status, etc.
 */
export interface UserStatus {
  /**
   * The user authentication status.
   */
  user: USER_AUTHENTICATION_STATUS;
}

/**
 * The Redux action ID for `ProfileAPI`.
 */
export enum PROFILE_API_ACTION {
  /**
   * One to set the state that the JSONP call for user authentication status failed.
   */
  SET_ERROR_MONITOR_USER_STATUS = 'SET_ERROR_MONITOR_USER_STATUS',

  /**
   * One to set the given user authentication status.
   */
  SET_USER_STATUS = 'SET_USER_STATUS',
}

/**
 * A Redux substate for `ProfileAPI`.
 */
export interface ProfileAPIState {
  /**
   * The error from the JSONP call for the user authentication status.
   */
  errorMonitorUserStatus?: Error;

  /**
   * The user authentication status.
   */
  status?: UserStatus;
}
