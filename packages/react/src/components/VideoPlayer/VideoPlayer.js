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
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * VideoPlayer component
 *
 * @param {string} videoId Kaltura video id
 * @returns {*} VideoPlayer components
 */
const VideoPlayer = ({ videoId }) => {
  const videoPlayerId = `video-player__video-${videoId}`;

  useEffect(() => {
    (async () => {
      await VideoPlayerAPI.embedVideo(videoId, `${prefix}--${videoPlayerId}`);
    })();
  });

  return (
    <div
      className={`${prefix}--video-player__container`}
      data-autoid={`${stablePrefix}--${videoPlayerId}`}>
      <div
        className={`${prefix}--video-player__video`}
        id={`${prefix}--${videoPlayerId}`}></div>
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
  videoId: PropTypes.string.isRequired,
};

export default VideoPlayer;
