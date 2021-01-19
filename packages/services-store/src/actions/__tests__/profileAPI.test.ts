/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
// import ProfileAPI from '@carbon/ibmdotcom-services/es/services/Profile/Profile.js';
import { PROFILE_API_ACTION, ProfileAPIState } from '../../types/profileAPI';
// import convertValue from '../../../tests/utils/convert-value';
import { setUserStatus } from '../profileAPI';

jest.mock('@carbon/ibmdotcom-services/es/services/Profile/Profile');

const mockStore = configureMockStore<
  { profileAPI: ProfileAPIState },
  ThunkDispatch<{ profileAPI: ProfileAPIState }, void, AnyAction>
>([thunk]);

describe('Redux actions for `ProfileAPI`', () => {
  it('dispatches the action to set user authentication status', () => {
    const store = mockStore();
    store.dispatch(setUserStatus({ user: 'test.user@ibm.com' }));
    expect(store.getActions()).toEqual([
      {
        type: PROFILE_API_ACTION.SET_USER_STATUS,
        status: { user: 'test.user@ibm.com' },
      },
    ]);
  });

  // it('dispatches the action to get user authentication status', async () => {
  //   ProfileAPI.getUserStatus.mockResolvedValue({ user: 'Unauthenticated' });
  //   const store = mockStore();
  //   await store.dispatch(ProfileAPI.getUserStatus());
  //   expect(convertValue(store.getActions())).toEqual([
  //     {
  //       type: PROFILE_API_ACTION.SET_REQUEST_USER_STATUS_IN_PROGRESS,
  //       request: 'PROMISE',
  //     },
  //     {
  //       type: PROFILE_API_ACTION.SET_USER_STATUS,
  //       status: { user: 'Unauthenticated' },
  //     },
  //   ]);
  // });

  // it('dispatches the action of error in monitoring user authentication status', () => {
  //   ProfileAPI.getUserStatus.mockImplementation(callback => {
  //     callback(new Error('error-getuserstatus'));
  //   });
  //   const store = mockStore();
  //   store.dispatch(getUserStatus());
  //   expect(convertValue(store.getActions())).toEqual([
  //     {
  //       type: PROFILE_API_ACTION.SET_ERROR_REQUEST_USER_STATUS,
  //       error: 'error-getuserstatus',
  //     },
  //   ]);
  // });
});
