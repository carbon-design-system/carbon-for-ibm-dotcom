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
 *
 * @param {string} type returns inverse or default
 * @returns {string} theme classname
 */
function textClassname(type) {
  if (type === 'inverse') {
    return `${prefix}--video-player-inverse__video-description`;
  } else return `${prefix}--video-player__video-description`;
}

/**
 *
 * @param {string} type returns inverse or default
 * @returns {string} theme classname
 */
function themeClassname(type) {
  if (type === 'inverse') {
    return `${prefix}--video-player-inverse`;
  } else return `${prefix}--video-player`;
}

/**
 * VideoPlayer component
 *
 * @param {object} props props object
 * @param {string} props.type theming options
 * @param {string} props.showDescription video caption
 * @param {string} props.videoId Kaltura video id
 * @returns {*} VideoPlayer component
 */
const VideoPlayer = ({ type, showDescription, videoId }) => {
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
      className={themeClassname(type)}>
      <div
        className={`${prefix}--video-player__video-container`}
        data-autoid={`${stablePrefix}--${videoPlayerId}`}>
        <div
          className={`${prefix}--video-player__video`}
          id={`${prefix}--${videoPlayerId}`}></div>
      </div>
      {showDescription && (
        <div className={textClassname(type)}>
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
  type: PropTypes.oneOf(['inverse', '']),
};

export default VideoPlayer;
