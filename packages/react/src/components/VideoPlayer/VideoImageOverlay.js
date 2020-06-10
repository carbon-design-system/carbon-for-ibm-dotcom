/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Image } from '../Image';
import PlayIcon from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

/**
 * VideoPlayer Image Overlay component
 */
const VideoImageOverlay = ({ videoId, videoData, setEmbedVideo }) => {
  return (
    <button
      id="video-thumbnail-overlay"
      onClick={() => _embedPlayer({ setEmbedVideo })}>
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

const _embedPlayer = ({ setEmbedVideo }) => {
  var element = document.getElementById('video-thumbnail-overlay');
  element.parentNode.removeChild(element);
  setEmbedVideo(true);
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
  setEmbedVideo: PropTypes.func,
};

VideoImageOverlay.defaultProps = {
  autoPlay: false,
};

export default VideoImageOverlay;
