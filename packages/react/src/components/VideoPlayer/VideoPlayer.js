/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * VideoPlayer component.
 */
const VideoPlayer = ({ inverse, showCaption, videoId, customClassName }) => {
  const [videoData, setVideoData] = useState({ description: '' });
  const videoPlayerId = `video-player__video-${videoId}`;
  const videoDuration = VideoPlayerAPI.getVideoDuration(videoData.msDuration);

  useEffect(() => {
    let stale = false;
    (async () => {
      await VideoPlayerAPI.embedVideo(videoId, `${prefix}--${videoPlayerId}`);
      if (stale) {
        return;
      }
      const newVideoData = await VideoPlayerAPI.api(videoId);
      if (stale) {
        return;
      }
      setVideoData(newVideoData);
    })();
    return () => {
      stale = true;
    };
  }, [videoId, videoPlayerId]);

  const classnames = cx(
    `${prefix}--video-player`,
    { [`${prefix}--video-player--inverse`]: inverse },
    customClassName
  );

  return (
    <div
      aria-label={`${videoData.name} ${videoDuration}`}
      className={classnames}>
      <div
        className={`${prefix}--video-player__video-container`}
        data-autoid={`${stablePrefix}--${videoPlayerId}`}>
        <div
          className={`${prefix}--video-player__video`}
          id={`${prefix}--${videoPlayerId}`}></div>
      </div>
      {showCaption && (
        <div className={`${prefix}--video-player__video-caption`}>
          {videoData.name} {videoDuration}
        </div>
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  /**
   * The CSS class name to apply.
   */
  customClassName: PropTypes.string,

  /**
   * Video ID from Kaltura video platform.
   */
  videoId: PropTypes.string.isRequired,

  /**
   * `true` to show the description.
   */
  showCaption: PropTypes.bool,

  /**
   * `true` to use the inverse theme.
   */
  inverse: PropTypes.bool,
};

export default VideoPlayer;
