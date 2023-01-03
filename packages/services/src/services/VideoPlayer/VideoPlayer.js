/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate';
import KalturaPlayerAPI from '../KalturaPlayer/KalturaPlayer';

/**
 * @deprecated in favor of KalturaPlayerAPI
 * VideoPlayerAPI class with methods of checking script state and
 * embed video meta data and api data
 *
 * In order to set the Partner ID/UIConf ID, set the following environment
 * variables:
 *
 * - KALTURA_PARTNER_ID (or REACT_APP_KALTURA_PARTNER_ID)
 * - KALTURA_UICONF_ID (or REACT_APP_KALTURA_UICONF_ID)
 */
class VideoPlayerAPI extends KalturaPlayerAPI {
  /**
   * Gets the embed meta data
   *
   * @param {string} videoId  The videoId we're embedding the placeholder for.
   * @param {string} targetId The targetId the ID where we're putting the placeholder.
   * @param {boolean} autoPlay Determine whether to autoplay on load of video.
   * @returns {object}  object
   * @example
   * import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';
   *
   * function embedMyVideo() {
   *   const elem = document.getElementById('foo');
   *   const videoid = '12345';
   *   VideoPlayerAPI.embedVideo(videoid, elem);
   * }
   */
  static async embedVideo(videoId, targetId, autoPlay) {
    await KalturaPlayerAPI.embedMedia(videoId, targetId, autoPlay);
  }

  /**
   * Convert media duration from milliseconds and seconds to HH:MM:SS
   *
   * @param {string} duration video duration in milliseconds
   * @param {boolean} fromMilliseconds the duration argument is expressed in milliseconds rather than seconds
   * @returns {string} converted duration
   */
  static getVideoDuration(duration, fromMilliseconds) {
    return KalturaPlayerAPI.getMediaDuration(duration, fromMilliseconds);
  }
}

export default deprecate(
  VideoPlayerAPI,
  'The VideoPlayerAPI service has been deprecated in favor of the KalturaPlayerAPI service.'
);
