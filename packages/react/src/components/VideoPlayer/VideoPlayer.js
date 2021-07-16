/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
import VideoImageOverlay from './VideoImageOverlay';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * VideoPlayer component.
 */
const VideoPlayer = ({
  showCaption,
  videoId,
  customClassName,
  autoPlay,
  aspectRatio,
}) => {
  const [videoData, setVideoData] = useState({ description: '', name: '' });

  // embedVideo is set to true when overlay thumbnail is clicked
  const [embedVideo, setEmbedVideo] = useState(false);
  const videoPlayerId = uniqueid(`video-player__video-${videoId}-`);
  const videoDuration = VideoPlayerAPI.getVideoDuration(videoData.msDuration);

  useEffect(() => {
    let stale = false;
    (async () => {
      if (autoPlay || embedVideo) {
        await VideoPlayerAPI.embedMedia(videoId, `${prefix}--${videoPlayerId}`);
      }
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
  }, [autoPlay, videoId, videoPlayerId, embedVideo]);

  const classnames = cx(`${prefix}--video-player`, customClassName);

  const aspectRatioClass = cx({
    [`${prefix}--video-player__aspect-ratio--${aspectRatio}`]: aspectRatio,
  });

  return (
    <div
      aria-label={`${videoData.name} ${videoDuration}`}
      className={classnames}>
      <div
        className={`${prefix}--video-player__video-container ${aspectRatioClass}`}
        data-autoid={`${stablePrefix}--video-player__video-${videoId}`}>
        <div
          className={`${prefix}--video-player__video`}
          id={`${prefix}--${videoPlayerId}`}>
          {!autoPlay && (
            <VideoImageOverlay
              videoId={videoId}
              videoData={videoData}
              embedVideo={setEmbedVideo}
            />
          )}
        </div>
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
   * `true` to autoplay the video on load
   */
  autoPlay: PropTypes.bool,
  /**
   * Override default aspect ratio of `16x9`.
   * Available aspect ratios:
   *
   * `16x9`, `9x16`, `2x1`, `1x2`, `4x3`, `3x4`, `1x1`
   */
  aspectRatio: PropTypes.string,
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
};

VideoPlayer.defaultProps = {
  autoPlay: false,
};

export default VideoPlayer;
