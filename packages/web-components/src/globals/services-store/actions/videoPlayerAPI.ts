/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';
import { VideoData, VIDEO_PLAYER_API_ACTION, VideoPlayerAPIState } from '../types/videoPlayerAPI';

/**
 * @param videoId A language.
 * @param request The promise of the REST call for video data of the given language that is in progress.
 * @returns A Redux action to set the state that the REST call for video data for the given language that is in progress.
 * @private
 */
export function setRequestVideoDataInProgress(videoId: string, request: Promise<VideoData>) {
  return {
    type: VIDEO_PLAYER_API_ACTION.SET_REQUEST_VIDEO_DATA_IN_PROGRESS,
    videoId,
    request,
  };
}

/**
 * @param videoId A language.
 * @param error An error from the REST call for video data of the given language.
 * @returns A Redux action to set the state that the REST call for video data for the given language failed.
 * @private
 */
export function setErrorRequestVideoData(videoId: string, error: Error) {
  return {
    type: VIDEO_PLAYER_API_ACTION.SET_ERROR_REQUEST_VIDEO_DATA,
    videoId,
    error,
  };
}

/**
 * @param videoId A language.
 * @param videoData The video data from the REST call.
 * @returns A Redux action to set the given video data.
 */
export function setVideoData(videoId: string, videoData: VideoData) {
  return {
    type: VIDEO_PLAYER_API_ACTION.SET_VIDEO_DATA,
    videoId,
    videoData,
  };
}

/**
 * A Redux action to work with `VideoPlayerAPI`.
 */
export type VideoPlayerAPIActions =
  | ReturnType<typeof setRequestVideoDataInProgress>
  | ReturnType<typeof setErrorRequestVideoData>
  | ReturnType<typeof setVideoData>;

/**
 * @returns A Redux action that sends a REST call for video data.
 */
export function loadVideoData(
  videoId: string
): ThunkAction<Promise<VideoData>, { videoPlayerAPI: VideoPlayerAPIState }, void, VideoPlayerAPIActions> {
  return async (dispatch, getState) => {
    const { requestsVideoData = {} } = getState().videoPlayerAPI ?? {};
    const { [videoId]: requestVideoData } = requestsVideoData;
    if (requestVideoData) {
      return requestVideoData;
    }
    const promiseVideoData: Promise<VideoData> = VideoPlayerAPI.api(videoId);
    dispatch(setRequestVideoDataInProgress(videoId, promiseVideoData));
    try {
      dispatch(setVideoData(videoId, await promiseVideoData));
    } catch (error) {
      dispatch(setErrorRequestVideoData(videoId, error));
    }
    return promiseVideoData;
  };
}
