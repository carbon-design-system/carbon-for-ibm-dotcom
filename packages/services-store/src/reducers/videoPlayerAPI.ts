/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { VIDEO_PLAYER_API_ACTION, VideoPlayerAPIState } from '../types/videoPlayerAPI';
import {
  VideoPlayerAPIActions,
  setRequestVideoDataInProgress,
  setErrorRequestVideoData,
  setVideoData,
} from '../actions/videoPlayerAPI';

/**
 * @param state The state for video player API.
 * @param action The action.
 * @returns The new state for video player API.
 */
export default function reducer(state: VideoPlayerAPIState = {}, action: VideoPlayerAPIActions): VideoPlayerAPIState {
  switch (action.type) {
    case VIDEO_PLAYER_API_ACTION.SET_REQUEST_VIDEO_DATA_IN_PROGRESS: {
      const { videoId, request } = action as ReturnType<typeof setRequestVideoDataInProgress>;
      return {
        ...state,
        requestsVideoDataInProgress: {
          ...(state.requestsVideoDataInProgress || {}),
          [videoId]: true,
        },
        requestsVideoData: {
          ...(state.requestsVideoData || {}),
          [videoId]: request,
        },
      };
    }
    case VIDEO_PLAYER_API_ACTION.SET_ERROR_REQUEST_VIDEO_DATA: {
      const { videoId, error } = action as ReturnType<typeof setErrorRequestVideoData>;
      return {
        ...state,
        requestsVideoDataInProgress: {
          ...(state.requestsVideoDataInProgress || {}),
          [videoId]: false,
        },
        errorsRequestVideoData: {
          ...(state.errorsRequestVideoData || {}),
          [videoId]: error,
        },
      };
    }
    case VIDEO_PLAYER_API_ACTION.SET_VIDEO_DATA: {
      const { videoId, videoData } = action as ReturnType<typeof setVideoData>;
      return {
        ...state,
        // If application sets language data without making a REST call, mark the request as resolved already
        requestsVideoDataInProgress: {
          ...(state.requestsVideoDataInProgress || {}),
          [videoId]: false,
        },
        requestsVideoData: {
          ...(state.requestsVideoData || {}),
          [videoId]: Promise.resolve(videoData),
        },
        videoData: {
          ...(state.videoData || {}),
          [videoId]: videoData,
        },
      };
    }
    default:
      return state;
  }
}
