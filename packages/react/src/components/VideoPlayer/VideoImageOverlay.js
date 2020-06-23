/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';
import PlayIcon from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * VideoPlayer Image Overlay component
 */
const VideoImageOverlay = ({ videoId, videoData, embedVideo }) => {
  return (
    <button
      className={`${prefix}--video-player__image-overlay`}
      data-autoid={`${stablePrefix}--video-player__image-overlay`}
      onClick={() => _embedPlayer(event, embedVideo)}>
      <Image
        defaultSrc={VideoPlayerAPI.getThumbnailUrl({
          videoId,
          width: '655',
        })}
        alt={videoData.name}
        icon={PlayIcon}
      />
    </button>
  );
};

const _embedPlayer = (e, embedVideo) => {
  const element = e.target;
  element.remove();
  embedVideo(true);
};

VideoImageOverlay.propTypes = {
  /**
   * Video ID from Kaltura video platform.
   */
  videoId: PropTypes.string.isRequired,

  /**
   * Object containing videoData such as name, description, duration, etc.
   */
  videoData: PropTypes.object,

  /**
   * Func to set state to trigger embedding of video
   */
  embedVideo: PropTypes.func,
};

export default VideoImageOverlay;
