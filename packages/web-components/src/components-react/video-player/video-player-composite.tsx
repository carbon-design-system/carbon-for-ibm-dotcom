/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { FunctionComponent, useEffect } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import { MediaData } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/kalturaPlayerAPI.d';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSVideoPlayer from './video-player';

const { stablePrefix: ddsPrefix } = ddsSettings;

export interface DDSVideoPlayerCompositeProps {
  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadVideoData?: (videoId: string) => Promise<MediaData>;

  /**
   * The placeholder for `_loadVideoData()` Redux action that may be mixed in.
   *
   * @internal
   */
  _embedMedia?: (videoId: string, backgroundMode?: boolean) => Promise<any>;

  /**
   * The placeholder for `_setAutoplayPreference()` Redux action that may be mixed in.
   */
  // @ts-ignore
  _setAutoplayPreference: (preference: boolean) => void;

  /**
   * The placeholder for `_getAutoplayPreference()` Redux action that may be mixed in.
   */
  // @ts-ignore
  _getAutoplayPreference: () => null | boolean;

  /**
   * The aspect ratio.
   */
  aspectRatio?: string;

  /**
   * `true` to autoplay the videos.
   */
  autoplay?: boolean;

  /**
   * The embedded Kaltura player element (that has `.sendNotification()`, etc. APIs), keyed by the video ID.
   */
  embeddedVideos?: { [videoId: string]: any };

  /**
   * `true` to autoplay, mute, and hide player UI.
   */
  backgroundMode?: boolean;

  /**
   * The video data, keyed by the video ID.
   */
  mediaData?: { [videoId: string]: MediaData };

  /**
   * Optional custom video caption.
   */
  caption?: string;

  /**
   * Custom video description. This property should only be set when `playing-mode="lightbox"`.
   */
  customVideoDescription?: string;

  /**
   * `true` to hide the caption.
   */
  hideCaption?: boolean;

  /**
   * The current playback state
   */
  isPlaying?: boolean;

  /**
   * The video player's mode showing Inline or Lightbox.
   */
  playingMode?: 'inline' | 'lightbox';

  /**
   * Optional custom video thumbnail
   */
  thumbnailUrl?: string;

  /**
   * The video ID.
   */
  videoId?: string;

  /**
   * The video thumbnail width.
   */
  videoThumbnailWidth?: number;
}

/**
 * Component that renders the video player.
 */
const DDSVideoPlayerComposite: FunctionComponent<DDSVideoPlayerCompositeProps> = ({
  aspectRatio,
  autoplay,
  backgroundMode,
  caption,
  customVideoDescription,
  mediaData = {},
  isPlaying,
  hideCaption,
  playingMode,
  thumbnailUrl,
  videoId,
  videoThumbnailWidth,
  _loadVideoData: loadVideoData,
  _embedMedia: embedMedia,
  _setAutoplayPreference: setAutoplayPreference,
  _getAutoplayPreference: getAutoplayPreference,
}) => {
  /**
   * Activate the DOM nodes for the embedded video of the given video ID, and deactivates others.
   *
   * @param videoId The video ID to activate.
   */

  useEffect(() => {
    const embeddedVideos = {};
    Object.keys(embeddedVideos).forEach(key => {
      console.log('key', key);
      embeddedVideos[key].sendNotification(key === videoId ? 'doPlay' : 'doStop');
    });

    console.log('embeddedVideos', embeddedVideos);

    if (videoId) {
      loadVideoData?.(videoId);
      if (autoplay || backgroundMode) {
        embedMedia?.(videoId, backgroundMode);
      }
    }
  }, [videoId, autoplay, backgroundMode, loadVideoData, embedMedia]);

  useEffect(() => {
    if (backgroundMode) {
      hideCaption = true;
    }

    if (autoplay || backgroundMode) {
      const storedPreferences = getAutoplayPreference();
      if (storedPreferences === null) {
        isPlaying = !window.matchMedia('(prefers-reduced-motion)').matches;
      } else {
        isPlaying = storedPreferences;
      }
    }
  });

  const { [videoId]: currentVideoData = {} as MediaData } = mediaData;
  const { duration, name } = currentVideoData;
  const thumbnail =
    thumbnailUrl ||
    KalturaPlayerAPI.getThumbnailUrl({
      mediaId: videoId,
      width: String(videoThumbnailWidth),
    });
  return (
    <DDSVideoPlayer
      data-autoid={`${ddsPrefix}--video-player`}
      duration={duration}
      aspectRatio={aspectRatio}
      autoPlay={autoplay}
      backgroundMode={backgroundMode}
      name={caption || name}
      customVideoDescription={customVideoDescription}
      hideCaption={hideCaption}
      playingMode={playingMode}
      thumbnailUrl={thumbnail}
      videoId={videoId}
      videoThumbnailWidth={videoThumbnailWidth}
    />
  );
};

DDSVideoPlayerComposite.propTypes = {
  _loadVideoData: PropTypes.func,
  _embedMedia: PropTypes.func,
  _setAutoplayPreference: PropTypes.func,
  _getAutoplayPreference: PropTypes.bool,
  /**
   * The aspect ratio.
   */
  aspectRatio: PropTypes.string,

  /**
   * `true` to autoplay the videos.
   */
  autoplay: PropTypes.bool,

  /**
   * `true` to autoplay, mute, and hide player UI.
   */
  backgroundMode: PropTypes.bool,

  /**
   * Optional custom video caption.
   */
  caption: PropTypes.string,

  /**
   * Custom video description. This property should only be set when `playing-mode="lightbox"`.
   */
  customVideoDescription: PropTypes.string,

  /**
   * `true` to hide the caption.
   */
  hideCaption: PropTypes.bool,

  /**
   * The video player's mode showing Inline or Lightbox.
   */
  playingMode: PropTypes.oneOf(['inline', 'lightbox']),

  /**
   * Optional custom video thumbnail
   */
  thumbnailUrl: PropTypes.string,

  /**
   * The video ID.
   */
  videoId: PropTypes.string,

  /**
   * The video thumbnail width.
   */
  videoThumbnailWidth: PropTypes.number,
};

export default DDSVideoPlayerComposite;
