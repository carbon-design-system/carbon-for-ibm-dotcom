/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services/lib/services/VideoPlayer';

const { prefix } = settings;

/**
 * VideoPlayer component
 *
 * @param {string} videoId Kaltura video id
 * @returns {*} VideoPlayer components
 */
const VideoPlayer = videoId => {
  useEffect(() => {
    async function getVideoData(videoId) {
      return await VideoPlayerAPI.api('0_uka1msg4');
    }

    // const videoData = getVideoData(videoId);
  });

  return (
    <div
      id="kaltura_player"
      className={`${prefix}--lighbox-media-viewer__content__videoPlayer`}>
      <a href="http://www.example.com">watch</a>
    </div>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{videoId: string}}
 */
VideoPlayer.propTypes = {
  videoId: PropTypes.string,
};

export default VideoPlayer;
