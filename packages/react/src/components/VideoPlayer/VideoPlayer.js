/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  settings as ddsSettings,
  markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * VideoPlayer component
 *
 * @param {object} props props object
 * @param {boolean} props.inverse theming options
 * @param {string} props.showCaption video caption
 * @param {string} props.videoId Kaltura video id
 * @returns {*} VideoPlayer component
 */
const VideoPlayer = ({ inverse, showCaption, videoId, customClassName }) => {
  const [videoData, setVideoData] = useState({});
  const videoPlayerId = `video-player__video-${videoId}`;
  const videoDuration = VideoPlayerAPI.getVideoDuration(videoData.msDuration);

  useEffect(() => {
    (async () => {
      await VideoPlayerAPI.embedVideo(videoId, `${prefix}--${videoPlayerId}`);
      setVideoData(await VideoPlayerAPI.api(videoId));
    })();
  }, [videoId, videoPlayerId]);

  const classnames = cx(
    `${prefix}--video-player`,
    { [`${prefix}--video-player--inverse`]: inverse },
    customClassName
  );

  return (
    <div
      aria-label={`${videoData.description} ${videoDuration}`}
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
          {videoData.description &&
            markdownToHtml(videoData.description, {
              textOnly: true,
              cleanString: true,
            })}
          {` ${videoDuration}`}
        </div>
      )}
    </div>
  );
};

/**
 * @property {object} propTypes VideoPlayer propTypes
 * @description Defined property types for component
 * @type {{videoId: string, showCaption: boolean}}
 */
VideoPlayer.propTypes = {
  customClassName: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  showCaption: PropTypes.bool,
  inverse: PropTypes.bool,
};

export default VideoPlayer;
