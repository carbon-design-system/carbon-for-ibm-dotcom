/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import ProfileAPI from '@carbon/ibmdotcom-services/es/services/Profile/Profile.js';
import { USER_AUTHENTICATION_STATUS, PROFILE_API_ACTION, ProfileAPIState } from '../../types/profileAPI';
import convertValue from '../../../../../tests/utils/convert-value';
import { setUserStatus, monitorUserStatus } from '../profileAPI';

jest.mock('@carbon/ibmdotcom-services/es/services/Profile/Profile');

const mockStore = configureMockStore<
  { profileAPI: ProfileAPIState },
  ThunkDispatch<{ profileAPI: ProfileAPIState }, void, AnyAction>
>([thunk]);

describe('Redux actions for `ProfileAPI`', () => {
  it('dispatches the action to set user authentication status', () => {
    const store = mockStore();
    store.dispatch(setUserStatus({ user: USER_AUTHENTICATION_STATUS.AUTHENTICATED }));
    expect(store.getActions()).toEqual([
      {
        type: PROFILE_API_ACTION.SET_USER_STATUS,
        status: { user: USER_AUTHENTICATION_STATUS.AUTHENTICATED },
      },
    ]);
  });

  it('dispatches the action to monitor user authentication status', () => {
    ProfileAPI.monitorUserStatus.mockImplementation(callback => {
      callback(null, { user: USER_AUTHENTICATION_STATUS.AUTHENTICATED });
      callback(null, { user: USER_AUTHENTICATION_STATUS.UNAUTHENTICATED });
    });
    const store = mockStore();
    store.dispatch(monitorUserStatus());
    expect(convertValue(store.getActions())).toEqual([
      {
        type: PROFILE_API_ACTION.SET_USER_STATUS,
        status: { user: USER_AUTHENTICATION_STATUS.AUTHENTICATED },
      },
      {
        type: PROFILE_API_ACTION.SET_USER_STATUS,
        status: { user: USER_AUTHENTICATION_STATUS.UNAUTHENTICATED },
      },
    ]);
  });

  it('dispatches the action of error in monitoring user authentication status', () => {
    ProfileAPI.monitorUserStatus.mockImplementation(callback => {
      callback(new Error('error-monitoruserstatus'));
    });
    const store = mockStore();
    store.dispatch(monitorUserStatus());
    expect(convertValue(store.getActions())).toEqual([
      {
        type: PROFILE_API_ACTION.SET_ERROR_MONITOR_USER_STATUS,
        error: 'error-monitoruserstatus',
      },
    ]);
  });
});
