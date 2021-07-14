/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import deprecate from '@carbon/ibmdotcom-utilities/es/utilities/deprecate/deprecate';
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
  static async embedVideo(videoId, targetId, autoPlay) {
    await KalturaPlayerAPI.embedMedia(videoId, targetId, autoPlay);
  }

  static getVideoDuration(duration) {
    return KalturaPlayerAPI.getMediaDuration(duration);
  }
}

export default deprecate(
  VideoPlayerAPI,
  'The VideoPlayerAPI service has been deprecated in favor of the KalturaPlayerAPI service.'
);
