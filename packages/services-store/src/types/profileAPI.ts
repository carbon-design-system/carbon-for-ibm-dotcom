/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The user authentication status, etc.
 */
export interface UserStatus {
  /**
   * The user authentication status.
   */
  user: string;
}

/**
 * Unauthenticated user status
 */
export const UNAUTHENTICATED_STATUS = 'Unauthenticated';

/**
 * Cloud Unauthenticated user status
 */
export const CLOUD_UNAUTHENTICATED_STATUS = 'anonymous';

/**
 * The Redux action ID for `ProfileAPI`.
 */
export enum PROFILE_API_ACTION {
  /**
   * One to set the state that the REST call for user status is in progress or not.
   */
  SET_REQUEST_USER_STATUS_IN_PROGRESS = 'SET_REQUEST_USER_STATUS_IN_PROGRESS',
  /**
   * One to set the state that the call user authentication status failed.
   */
  SET_ERROR_REQUEST_USER_STATUS = 'SET_ERROR_REQUEST_USER_STATUS',

  /**
   * One to set the given user authentication status.
   */
  SET_USER_STATUS = 'SET_USER_STATUS',
}

/**
 * Authentication status types.
 */
export enum MASTHEAD_AUTH_METHOD {
  DEFAULT = 'profile-api',
  COOKIE = 'cookie',
  DOCS_API = 'docs-api',
}

/**
 * A Redux substate for `ProfileAPI`.
 */
export interface ProfileAPIState {
  /**
   * The error from the call for the user authentication status.
   */
  errorGetUserStatus?: Error;

  /**
   * The user authentication status.
   */
  request?: UserStatus;
}
