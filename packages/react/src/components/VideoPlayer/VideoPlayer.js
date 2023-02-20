/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services/es/services';
import LightboxMediaViewer from '../LightboxMediaViewer/LightboxMediaViewer';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/uniqueid/uniqueid';
import VideoImageOverlay from './VideoImageOverlay';

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
  playingMode,
  caption,
  thumbnail,
  alt,
}) => {
  const [videoData, setVideoData] = useState({ description: '', name: '' });

  // embedVideo is set to true when overlay thumbnail is clicked
  const [embedVideo, setEmbedVideo] = useState(false);
  const videoPlayerId = uniqueid(`video-player__video-${videoId}-`);
  const videoDuration = KalturaPlayerAPI.getMediaDuration(
    videoData.msDuration,
    true
  );

  useEffect(() => {
    let stale = false;
    (async () => {
      if (autoPlay || embedVideo) {
        await KalturaPlayerAPI.embedMedia(
          videoId,
          `${prefix}--${videoPlayerId}`
        );
      }
      if (stale) {
        return;
      }
      const newVideoData = await KalturaPlayerAPI.api(videoId);
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

  const renderInLightbox = (
    <>
      <div className={`${prefix}--video-player__video`}>
        <VideoImageOverlay
          videoId={videoId}
          videoData={videoData}
          embedVideo={setEmbedVideo}
          playingMode={playingMode}
          onClick={() => setEmbedVideo(true)}
          thumbnail={thumbnail}
          alt={alt}
        />
      </div>
      <LightboxMediaViewer
        open={embedVideo}
        media={{
          type: 'video',
          src: videoId,
        }}
        onClose={() => setEmbedVideo(false)}
      />
    </>
  );

  const renderInline = (
    <div
      className={`${prefix}--video-player__video`}
      id={`${prefix}--${videoPlayerId}`}>
      {!autoPlay && (
        <VideoImageOverlay
          videoId={videoId}
          videoData={videoData}
          embedVideo={setEmbedVideo}
          playingMode={playingMode}
          thumbnail={thumbnail}
          alt={alt}
        />
      )}
    </div>
  );

  const videoCaption = `${caption || videoData.name} ${videoDuration}`;
  return (
    <div aria-label={videoCaption} role="region" className={classnames}>
      <div
        className={`${prefix}--video-player__video-container ${aspectRatioClass}`}
        data-autoid={`${stablePrefix}--video-player__video-${videoId}`}>
        {playingMode === 'lightbox' ? renderInLightbox : renderInline}
      </div>
      {showCaption && (
        <div className={`${prefix}--video-player__video-caption`}>
          {videoCaption}
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

  /**
   * Optional custom video caption
   */
  caption: PropTypes.string,

  /**
   * Choose whether the video will be rendered inline or using the `LightboxMediaViewer`.
   */
  playingMode: PropTypes.oneOf(['inline', 'lightbox']),

  /**
   * Optional custom video thumbnail
   */
  thumbnail: PropTypes.string,

  /**
   * Optional custom alt text
   */
  alt: PropTypes.string,
};

VideoPlayer.defaultProps = {
  autoPlay: false,
  playingMode: 'inline',
};

export default VideoPlayer;
