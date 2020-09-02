/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The video data for ibm.com sites
 */
export interface VideoData {
  /**
   * The video description.
   */
  description: string;

  /**
   * The video duration.
   */
  duration: number;

  /**
   * The video name.
   */
  name: string;
}

/**
 * The Redux action ID for `VideoPlayerAPI`.
 */
export enum VIDEO_PLAYER_API_ACTION {
  /**
   * One to set the state that the REST call for video data that is in progress.
   */
  SET_REQUEST_VIDEO_DATA_IN_PROGRESS = 'SET_REQUEST_VIDEO_DATA_IN_PROGRESS',

  /**
   * One to set the state that the REST call for video data failed.
   */
  SET_ERROR_REQUEST_VIDEO_DATA = 'SET_ERROR_REQUEST_VIDEO_DATA',

  /**
   * One to set the given video data.
   */
  SET_VIDEO_DATA = 'SET_VIDEO_DATA',
}

/**
 * A Redux substate for `VideoPlayerAPI`.
 */
export interface VideoPlayerAPIState {
  /**
   * The video data, keyed by the video ID.
   */
  videoData?: { [videoId: string]: VideoData };

  /**
   * The requests for the video data, keyed by the video ID.
   */
  requestsVideoData?: { [videoId: string]: Promise<VideoData> };

  /**
   * The status of whether requests for the video data are in progress, keyed by the video ID.
   */
  requestsVideoDataInProgress?: { [videoId: string]: boolean };

  /**
   * The errors from the requests for the video data, keyed by the video ID.
   */
  errorsRequestVideoData?: { [videoId: string]: Error };
}
