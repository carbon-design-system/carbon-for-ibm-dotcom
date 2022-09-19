/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer.js';
import { MediaData, MEDIA_PLAYER_API_ACTION, MediaPlayerAPIState } from '../types/kalturaPlayerAPI';

/**
 * @param mediaId A language.
 * @param request The promise of the REST call for media data of the given language that is in progress.
 * @returns A Redux action to set the state that the REST call for media data for the given language that is in progress.
 * @private
 */
export function setRequestMediaDataInProgress(mediaId: string, request: Promise<MediaData>) {
  return {
    type: MEDIA_PLAYER_API_ACTION.SET_REQUEST_MEDIA_DATA_IN_PROGRESS,
    mediaId,
    request,
  };
}

/**
 * @param mediaId A language.
 * @param error An error from the REST call for media data of the given language.
 * @returns A Redux action to set the state that the REST call for media data for the given language failed.
 * @private
 */
export function setErrorRequestMediaData(mediaId: string, error: Error) {
  return {
    type: MEDIA_PLAYER_API_ACTION.SET_ERROR_REQUEST_MEDIA_DATA,
    mediaId,
    error,
  };
}

/**
 * @param mediaId A language.
 * @param mediaData The media data from the REST call.
 * @returns A Redux action to set the given media data.
 */
export function setMediaData(mediaId: string, mediaData: MediaData) {
  return {
    type: MEDIA_PLAYER_API_ACTION.SET_MEDIA_DATA,
    mediaId,
    mediaData,
  };
}

/**
 * A Redux action to work with `MediaPlayerAPI`.
 */
export type MediaPlayerAPIActions =
  | ReturnType<typeof setRequestMediaDataInProgress>
  | ReturnType<typeof setErrorRequestMediaData>
  | ReturnType<typeof setMediaData>;

/**
 * @returns A Redux action that sends a REST call for media data.
 */
export function loadMediaData(
  mediaId: string
): ThunkAction<Promise<MediaData>, { mediaPlayerAPI: MediaPlayerAPIState }, void, MediaPlayerAPIActions> {
  return async (dispatch, getState) => {
    const { requestsMediaData = {} } = getState().mediaPlayerAPI ?? {};
    const { [mediaId]: requestMediaData } = requestsMediaData;
    if (requestMediaData) {
      return requestMediaData;
    }
    const promiseVideoData: Promise<MediaData> = KalturaPlayerAPI.api(mediaId);
    dispatch(setRequestMediaDataInProgress(mediaId, promiseVideoData));
    try {
      dispatch(setMediaData(mediaId, await promiseVideoData));
    } catch (error) {
      dispatch(setErrorRequestMediaData(mediaId, error as Error));
    }
    return promiseVideoData;
  };
}
