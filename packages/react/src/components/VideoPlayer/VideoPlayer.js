/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
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
 * @returns {*} VideoPlayer component
 */
const VideoPlayer = ({ videoId, showDescription }) => {
  const [videoData, setVideoData] = useState({});
  const videoPlayerId = `video-player__video-${videoId}`;
  const videoDuration = VideoPlayerAPI.getVideoDuration(videoData.msDuration);

  useEffect(() => {
    (async () => {
      await VideoPlayerAPI.embedVideo(videoId, `${prefix}--${videoPlayerId}`);
      setVideoData(await VideoPlayerAPI.api(videoId));
    })();
  }, [videoId, videoPlayerId]);

  return (
    <div
      aria-label={`${videoData.description} ${videoDuration}`}
      className={`${prefix}--video-player`}>
      <div
        className={`${prefix}--video-player__video-container`}
        data-autoid={`${stablePrefix}--${videoPlayerId}`}>
        <div
          className={`${prefix}--video-player__video`}
          id={`${prefix}--${videoPlayerId}`}></div>
      </div>
      {showDescription && (
        <div className={`${prefix}--video-player__video-description`}>
          {videoData.description} {videoDuration}
        </div>
      )}
    </div>
  );
};

/**
 * @property {object} propTypes VideoPlayer propTypes
 * @description Defined property types for component
 * @type {{videoId: string, showDescription: boolean}}
 */
VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  showDescription: PropTypes.bool,
};

export default VideoPlayer;
