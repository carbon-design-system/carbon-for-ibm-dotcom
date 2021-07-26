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
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import { MEDIA_PLAYER_API_ACTION, MediaData, MediaPlayerAPIState } from '../../types/kalturaPlayerAPI';
import { setMediaData, loadMediaData } from '../kalturaPlayerAPI';
import convertValue from '../../../tests/utils/convert-value';

jest.mock('@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer');

const mockStore = configureMockStore<
  { mediaPlayerAPI: MediaPlayerAPIState },
  ThunkDispatch<{ mediaPlayerAPI: MediaPlayerAPIState }, void, AnyAction>
>([thunk]);

const mockMediaData: Partial<MediaData> = {
  name: 'name-foo',
  description: 'description-foo',
  duration: 120,
};

describe('Redux actions for `TranslateAPI`', () => {
  it('dispatches the action to set video data', () => {
    const store = mockStore();
    store.dispatch(setMediaData('video-id-foo', mockMediaData as MediaData));
    expect(store.getActions()).toEqual([
      {
        type: MEDIA_PLAYER_API_ACTION.SET_MEDIA_DATA,
        mediaId: 'video-id-foo',
        mediaData: mockMediaData,
      },
    ]);
  });

  it('dispatches the action to load video data', async () => {
    KalturaPlayerAPI.api.mockResolvedValue(mockMediaData);
    const store = mockStore();
    expect(await store.dispatch(loadMediaData('video-id-foo'))).toEqual(mockMediaData as MediaData);
    expect(convertValue(store.getActions())).toEqual([
      {
        type: MEDIA_PLAYER_API_ACTION.SET_REQUEST_MEDIA_DATA_IN_PROGRESS,
        mediaId: 'video-id-foo',
        request: 'PROMISE',
      },
      {
        type: MEDIA_PLAYER_API_ACTION.SET_MEDIA_DATA,
        mediaId: 'video-id-foo',
        mediaData: mockMediaData,
      },
    ]);
  });

  it('caches the loaded video data', async () => {
    KalturaPlayerAPI.api.mockResolvedValue(mockMediaData);
    const store = mockStore({
      mediaPlayerAPI: {
        requestsMediaData: {
          'video-id-foo': Promise.resolve(mockMediaData as MediaData),
        },
      },
    });
    expect(await store.dispatch(loadMediaData('video-id-foo'))).toEqual(mockMediaData as MediaData);
    expect(convertValue(store.getActions())).toEqual([]);
  });

  it('dispatches the action of error in loading language', async () => {
    KalturaPlayerAPI.api.mockRejectedValue(new Error('error-getvideodata'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadMediaData('video-id-foo'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getvideodata');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: MEDIA_PLAYER_API_ACTION.SET_REQUEST_MEDIA_DATA_IN_PROGRESS,
        mediaId: 'video-id-foo',
        request: 'PROMISE',
      },
      {
        type: MEDIA_PLAYER_API_ACTION.SET_ERROR_REQUEST_MEDIA_DATA,
        mediaId: 'video-id-foo',
        error: 'error-getvideodata',
      },
    ]);
  });

  it('caches the error in loading video data', async () => {
    const store = mockStore({
      mediaPlayerAPI: {
        requestsMediaData: {
          'video-id-foo': Promise.reject(new Error('error-getvideodata')),
        },
      },
    });
    let caught;
    try {
      await store.dispatch(loadMediaData('video-id-foo'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getvideodata');
    expect(convertValue(store.getActions())).toEqual([]);
  });
});
