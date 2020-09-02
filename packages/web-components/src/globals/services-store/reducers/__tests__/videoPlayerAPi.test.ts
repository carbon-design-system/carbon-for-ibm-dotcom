/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { VIDEO_PLAYER_API_ACTION, VideoData, VideoPlayerAPIState } from '../../types/videoPlayerAPI';
import { VideoPlayerAPIActions } from '../../actions/videoPlayerAPI';
import convertValue from '../../../../../tests/utils/convert-value';
import reducer from '../videoPlayerAPI';

const mockVideoData: Partial<VideoData> = {
  name: 'name-foo',
  description: 'description-foo',
  duration: 120,
};

describe('Redux reducers for `VideoPlayerAPI`', () => {
  it('should return the state unmodified for unknown action', () => {
    const state = {
      videoData: {
        'video-id-foo': mockVideoData as VideoData,
      },
    };
    expect(reducer(state, {} as VideoPlayerAPIActions)).toEqual(state);
  });

  it('should support starting the spinner for loading video data', () => {
    const request = Promise.resolve(mockVideoData as VideoData);
    expect(
      convertValue(
        reducer({} as VideoPlayerAPIState, {
          type: VIDEO_PLAYER_API_ACTION.SET_REQUEST_VIDEO_DATA_IN_PROGRESS,
          videoId: 'video-id-foo',
          request,
        })
      )
    ).toEqual({
      requestsVideoDataInProgress: {
        'video-id-foo': true,
      },
      requestsVideoData: {
        'video-id-foo': 'PROMISE',
      },
    });
  });

  it('should support setting error in loading video data', () => {
    expect(
      convertValue(
        reducer({} as VideoPlayerAPIState, {
          type: VIDEO_PLAYER_API_ACTION.SET_ERROR_REQUEST_VIDEO_DATA,
          videoId: 'video-id-foo',
          error: new Error('error-getvideodata'),
        })
      )
    ).toEqual({
      requestsVideoDataInProgress: {
        'video-id-foo': false,
      },
      errorsRequestVideoData: {
        'video-id-foo': 'error-getvideodata',
      },
    });
  });

  it('should support setting loaded video data', () => {
    expect(
      convertValue(
        reducer({} as VideoPlayerAPIState, {
          type: VIDEO_PLAYER_API_ACTION.SET_VIDEO_DATA,
          videoId: 'video-id-foo',
          videoData: mockVideoData as VideoData,
        })
      )
    ).toEqual({
      requestsVideoDataInProgress: {
        'video-id-foo': false,
      },
      requestsVideoData: {
        'video-id-foo': 'PROMISE',
      },
      videoData: {
        'video-id-foo': mockVideoData,
      },
    });
  });
});
