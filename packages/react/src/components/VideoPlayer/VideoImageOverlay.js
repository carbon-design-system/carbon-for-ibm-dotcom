/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useState } from 'react';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { Image } from '../Image';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import PlayIcon from '@carbon/ibmdotcom-styles/icons/svg/play-video.svg';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * VideoPlayer Image Overlay component
 */
const VideoImageOverlay = ({
  videoId,
  videoData,
  embedVideo,
  playingMode,
  thumbnail,
  alt,
  ...rest
}) => {
  const [thumbnailSize, setThumbnailSize] = useState(3);

  const refImage = useCallback((node) => {
    if (node?.parentElement) {
      setThumbnailSize(node.parentElement.offsetWidth);
    }
  }, []);

  const handleClick = (event) => {
    const { onClick } = rest;
    onClick && onClick(event);

    if (playingMode === 'inline') {
      _embedPlayer(event, embedVideo);
    }
  };

  const imageSrc =
    thumbnail ||
    KalturaPlayerAPI.getThumbnailUrl({
      mediaId: videoId,
      width: thumbnailSize,
    });

  return (
    <button
      className={`${prefix}--video-player__image-overlay`}
      data-autoid={`${stablePrefix}--video-player__image-overlay`}
      onClick={handleClick}>
      <Image
        refImage={refImage}
        defaultSrc={imageSrc}
        alt={alt || videoData.name}
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

export default VideoImageOverlay;
