/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import CloudAccountAuthAPI from '@carbon/ibmdotcom-services/es/services/CloudAccountAuth/CloudAccountAuth.js';
import { UNAUTHENTICATED_STATUS, CLOUD_ACCOUNT_AUTH_API_ACTION, CloudAccountAuthAPIState } from '../../types/cloudAccountAuthAPI';
import convertValue from '../../../tests/utils/convert-value';
import { loadUserStatus, setUserStatus } from '../cloudAccountAuthAPI';

jest.mock('@carbon/ibmdotcom-services/es/services/CloudAccountAuth/CloudAccountAuth');

const mockStore = configureMockStore<
  { cloudAccountAuthAPI: CloudAccountAuthAPIState },
  ThunkDispatch<{ cloudAccountAuthAPI: CloudAccountAuthAPIState }, void, AnyAction>
>([thunk]);

describe('Redux actions for `CloudAccountAuthAPI`', () => {
  it('dispatches the action to set user authentication status', () => {
    const store = mockStore();
    store.dispatch(setUserStatus({ user: 'test.user@ibm.com' }));
    expect(store.getActions()).toEqual([
      {
        type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_USER_STATUS,
        request: { user: 'test.user@ibm.com' },
      },
    ]);
  });

  it('dispatches the action to get user authentication status', async () => {
    CloudAccountAuthAPI.checkAPI.mockResolvedValue({ user: UNAUTHENTICATED_STATUS });
    const store = mockStore();
    await store.dispatch(loadUserStatus('api'));
    expect(convertValue(store.getActions())).toEqual([
      {
        type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_REQUEST_USER_STATUS_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_USER_STATUS,
        request: { user: UNAUTHENTICATED_STATUS },
      },
    ]);
  });

  it('dispatches the action of error in monitoring user authentication status', async () => {
    CloudAccountAuthAPI.checkAPI.mockRejectedValue(new Error('error-getuserstatus'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadUserStatus('api'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getuserstatus');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_REQUEST_USER_STATUS_IN_PROGRESS,
        request: 'PROMISE',
      },
      {
        type: CLOUD_ACCOUNT_AUTH_API_ACTION.SET_ERROR_REQUEST_USER_STATUS,
        error: 'error-getuserstatus',
      },
    ]);
  });
});
