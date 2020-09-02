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
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import { VIDEO_PLAYER_API_ACTION, VideoData, VideoPlayerAPIState } from '../../types/videoPlayerAPI';
import { setVideoData, loadVideoData } from '../videoPlayerAPI';
import convertValue from '../../../../../tests/utils/convert-value';

jest.mock('@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer');

const mockStore = configureMockStore<
  { videoPlayerAPI: VideoPlayerAPIState },
  ThunkDispatch<{ videoPlayerAPI: VideoPlayerAPIState }, void, AnyAction>
>([thunk]);

const mockVideoData: Partial<VideoData> = {
  name: 'name-foo',
  description: 'description-foo',
  duration: 120,
};

describe('Redux actions for `TranslateAPI`', () => {
  it('dispatches the action to set video data', () => {
    const store = mockStore();
    store.dispatch(setVideoData('video-id-foo', mockVideoData as VideoData));
    expect(store.getActions()).toEqual([
      {
        type: VIDEO_PLAYER_API_ACTION.SET_VIDEO_DATA,
        videoId: 'video-id-foo',
        videoData: mockVideoData,
      },
    ]);
  });

  it('dispatches the action to load video data', async () => {
    VideoPlayerAPI.api.mockResolvedValue(mockVideoData);
    const store = mockStore();
    expect(await store.dispatch(loadVideoData('video-id-foo'))).toEqual(mockVideoData as VideoData);
    expect(convertValue(store.getActions())).toEqual([
      {
        type: VIDEO_PLAYER_API_ACTION.SET_REQUEST_VIDEO_DATA_IN_PROGRESS,
        videoId: 'video-id-foo',
        request: 'PROMISE',
      },
      {
        type: VIDEO_PLAYER_API_ACTION.SET_VIDEO_DATA,
        videoId: 'video-id-foo',
        videoData: mockVideoData,
      },
    ]);
  });

  it('caches the loaded video data', async () => {
    VideoPlayerAPI.api.mockResolvedValue(mockVideoData);
    const store = mockStore({
      videoPlayerAPI: {
        requestsVideoData: {
          'video-id-foo': Promise.resolve(mockVideoData as VideoData),
        },
      },
    });
    expect(await store.dispatch(loadVideoData('video-id-foo'))).toEqual(mockVideoData as VideoData);
    expect(convertValue(store.getActions())).toEqual([]);
  });

  it('dispatches the action of error in loading language', async () => {
    VideoPlayerAPI.api.mockRejectedValue(new Error('error-getvideodata'));
    const store = mockStore();
    let caught;
    try {
      await store.dispatch(loadVideoData('video-id-foo'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getvideodata');
    expect(convertValue(store.getActions())).toEqual([
      {
        type: VIDEO_PLAYER_API_ACTION.SET_REQUEST_VIDEO_DATA_IN_PROGRESS,
        videoId: 'video-id-foo',
        request: 'PROMISE',
      },
      {
        type: VIDEO_PLAYER_API_ACTION.SET_ERROR_REQUEST_VIDEO_DATA,
        videoId: 'video-id-foo',
        error: 'error-getvideodata',
      },
    ]);
  });

  it('caches the error in loading video data', async () => {
    const store = mockStore({
      videoPlayerAPI: {
        requestsVideoData: {
          'video-id-foo': Promise.reject(new Error('error-getvideodata')),
        },
      },
    });
    let caught;
    try {
      await store.dispatch(loadVideoData('video-id-foo'));
    } catch (error) {
      caught = error;
    }
    expect(caught?.message).toBe('error-getvideodata');
    expect(convertValue(store.getActions())).toEqual([]);
  });
});
