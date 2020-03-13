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
 * @returns {*} VideoPlayer components
 */
const VideoPlayer = ({ videoId, showDescription }) => {
  const videoPlayerId = `video-player__video-${videoId}`;
  const [videoData, setVideoData] = useState({});
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    (async () => {
      await VideoPlayerAPI.embedVideo(videoId, `${prefix}--${videoPlayerId}`);
      const getVideoData = await VideoPlayerAPI.api(videoId);
      setVideoData(getVideoData);
    })();
  }, [videoId, videoPlayerId]);

  /**
   * Convert video duration in milliseconds to HH:MM:SS
   *
   * @param {string} duration video duration in milliseconds
   * @returns {*} converted duration
   */
  function videoTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours > 0 ? hours + ':' : '';
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + minutes + ':' + seconds;
  }

  useEffect(() => {
    setVideoDuration(videoTime(videoData.msDuration));
  }, [videoData.msDuration]);

  return (
    <>
      <div
        className={`${prefix}--video-player__container`}
        data-autoid={`${stablePrefix}--${videoPlayerId}`}>
        <div
          className={`${prefix}--video-player__video`}
          id={`${prefix}--${videoPlayerId}`}></div>
      </div>
      {showDescription && (
        <div className={`${prefix}--video-player__description`}>
          {videoData.description} ({videoDuration})
        </div>
      )}
    </>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 *
 * @type {{videoId: string, showDescription: bool}}
 */
VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  showDescription: PropTypes.bool,
};

export default VideoPlayer;
