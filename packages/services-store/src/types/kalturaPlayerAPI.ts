/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The media data for ibm.com sites
 */
export interface MediaData {
  /**
   * The media description.
   */
  description: string;

  /**
   * The media duration.
   */
  duration: number;

  /**
   * The media name.
   */
  name: string;
}

/**
 * The Redux action ID for `MediaPlayerAPI`.
 */
export enum MEDIA_PLAYER_API_ACTION {
  /**
   * One to set the state that the REST call for media data that is in progress.
   */
  SET_REQUEST_MEDIA_DATA_IN_PROGRESS = 'SET_REQUEST_MEDIA_DATA_IN_PROGRESS',

  /**
   * One to set the state that the REST call for media data failed.
   */
  SET_ERROR_REQUEST_MEDIA_DATA = 'SET_ERROR_REQUEST_MEDIA_DATA',

  /**
   * One to set the given media data.
   */
  SET_MEDIA_DATA = 'SET_MEDIA_DATA',
}

/**
 * A Redux substate for `MediaPlayerAPI`.
 */
export interface MediaPlayerAPIState {
  /**
   * The media data, keyed by the media ID.
   */
  mediaData?: { [mediaId: string]: MediaData };

  /**
   * The requests for the media data, keyed by the media ID.
   */
  requestsMediaData?: { [mediaId: string]: Promise<MediaData> };

  /**
   * The status of whether requests for the media data are in progress, keyed by the media ID.
   */
  requestsMediaDataInProgress?: { [mediaId: string]: boolean };

  /**
   * The errors from the requests for the media data, keyed by the media  ID.
   */
  errorsRequestMediaData?: { [mediaId: string]: Error };
}
