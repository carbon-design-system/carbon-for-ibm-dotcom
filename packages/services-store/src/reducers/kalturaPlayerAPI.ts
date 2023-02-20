/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  MEDIA_PLAYER_API_ACTION,
  MediaPlayerAPIState,
} from '../types/kalturaPlayerAPI';
import {
  MediaPlayerAPIActions,
  setRequestMediaDataInProgress,
  setErrorRequestMediaData,
  setMediaData,
} from '../actions/kalturaPlayerAPI';

/**
 * @param state The state for media player API.
 * @param action The action.
 * @returns The new state for media player API.
 */
export default function reducer(
  state: MediaPlayerAPIState = {},
  action: MediaPlayerAPIActions
): MediaPlayerAPIState {
  switch (action.type) {
    case MEDIA_PLAYER_API_ACTION.SET_REQUEST_MEDIA_DATA_IN_PROGRESS: {
      const { mediaId, request } = action as ReturnType<
        typeof setRequestMediaDataInProgress
      >;
      return {
        ...state,
        requestsMediaDataInProgress: {
          ...(state.requestsMediaDataInProgress || {}),
          [mediaId]: true,
        },
        requestsMediaData: {
          ...(state.requestsMediaData || {}),
          [mediaId]: request,
        },
      };
    }
    case MEDIA_PLAYER_API_ACTION.SET_ERROR_REQUEST_MEDIA_DATA: {
      const { mediaId, error } = action as ReturnType<
        typeof setErrorRequestMediaData
      >;
      return {
        ...state,
        requestsMediaDataInProgress: {
          ...(state.requestsMediaDataInProgress || {}),
          [mediaId]: false,
        },
        errorsRequestMediaData: {
          ...(state.errorsRequestMediaData || {}),
          [mediaId]: error,
        },
      };
    }
    case MEDIA_PLAYER_API_ACTION.SET_MEDIA_DATA: {
      const { mediaId, mediaData } = action as ReturnType<typeof setMediaData>;
      return {
        ...state,
        // If application sets language data without making a REST call, mark the request as resolved already
        requestsMediaDataInProgress: {
          ...(state.requestsMediaDataInProgress || {}),
          [mediaId]: false,
        },
        requestsMediaData: {
          ...(state.requestsMediaData || {}),
          [mediaId]: Promise.resolve(mediaData),
        },
        mediaData: {
          ...(state.mediaData || {}),
          [mediaId]: mediaData,
        },
      };
    }
    default:
      return state;
  }
}
