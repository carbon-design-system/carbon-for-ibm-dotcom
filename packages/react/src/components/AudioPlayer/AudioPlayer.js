/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
// import cx from 'classnames';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Download24 from '@carbon/icons-react/es/download/24';
import Forward_1032 from '@carbon/icons-react/es/forward--10/24';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
// import VideoImageOverlay from './VideoImageOverlay';
import PauseOutline32 from '@carbon/icons-react/es/pause--outline/32';
import PlayOutline32 from '@carbon/icons-react/es/play--outline/24';
// import PropTypes from 'prop-types';

import Rewind_1032 from '@carbon/icons-react/es/rewind--10/24';
import Select from '../../internal/vendor/carbon-components-react/components/Select/Select';
import SelectItem from '../../internal/vendor/carbon-components-react/components/SelectItem/SelectItem';
import settings from 'carbon-components/es/globals/js/settings';
import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';
// import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
// import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/AudioPlayer/AudioPlayer';
import VolumeDown24 from '@carbon/icons-react/es/volume--down/24';
import VolumeMute24 from '@carbon/icons-react/es/volume--mute/24';
import VolumeUp24 from '@carbon/icons-react/es/volume--up/24';

// const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * AudioPlayer component.
 * 
 * // showCaption,
  // videoId,
  // customClassName,
  // autoPlay,
  // aspectRatio,
 */

const AudioPlayer = () => {
  // const [, setVideoData] = useState({ description: '', name: '' });
  const [volume, setVolume] = useState(87);
  const [audioTime, setAudioTime] = useState(0);

  // embedVideo is set to true when overlay thumbnail is clicked
  const [embedAudio] = useState(true);
  // const videoPlayerId = uniqueid(`video-player__video-${videoId}-`);
  // const videoDuration = VideoPlayerAPI.getVideoDuration(videoData.msDuration);

  // useEffect(() => {
  //   let stale = false;
  //   (async () => {
  //     if (autoPlay || embedAudio) {
  //       await VideoPlayerAPI.embedVideo(
  //         videoId,
  //         `${prefix}--${videoPlayerId}`,
  //         true
  //       );
  //     }
  //     if (stale) {
  //       return;
  //     }
  //     const newVideoData = await VideoPlayerAPI.api(videoId);
  //     if (stale) {
  //       return;
  //     }
  //     setVideoData(newVideoData);
  //   })();
  //   return () => {
  //     stale = true;
  //   };
  // }, [autoPlay, videoId, videoPlayerId, embedAudio]);

  // const classnames = cx(`${prefix}--video-player`, customClassName);

  // const aspectRatioClass = cx({
  //   [`${prefix}--video-player__aspect-ratio--${aspectRatio}`]: aspectRatio,
  // });

  // useEffect(() => {
  //   console.log('ENTROU')
  //   const timeout = setTimeout(() => {
  //     setAudioTime(prev => prev + 1);
  //    }, 1000);

  //    if(audioTime > 100) {
  //     clearTimeout(timeout);
  //    }

  //  },[audioTime]);

  const handleFormat = (a, b) => {
    console.log(a);
    console.log(b);

    return b;
  };

  // <div
  //   aria-label={`${videoData.name} ${videoDuration}`}
  //   className={classnames}>
  //   <div
  //     className={`${prefix}--video-player__video-container ${aspectRatioClass}`}
  //     data-autoid={`${stablePrefix}--video-player__video-${videoId}`}>
  //     <div
  //       className={`${prefix}--video-player__video`}
  //       id={`${prefix}--${videoPlayerId}`}>
  //       {!autoPlay && (
  //         <VideoImageOverlay
  //           videoId={videoId}
  //           videoData={videoData}
  //           embedVideo={setEmbedVideo}
  //         />
  //       )}
  //     </div>
  //   </div>
  {
    /* {showCaption && (
      <div className={`${prefix}--video-player__video-caption`}>
        {videoData.name} {videoDuration}
      </div>
    )} */
  }
  // </div>
  return (
    <div className={`${prefix}--audio-player__audio-container`}>
      <div className={`${prefix}--audio-player`}>
        <div className={`${prefix}--description`}>
          <div className={`${prefix}--image-container`}>
            <img
              src="https://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616"
              alt=""
              className={`${prefix}--image__img`}
            />
          </div>
          <div className={`${prefix}--audio-information`}>
            <p class={`${prefix}--audio-information-title`}>
              Accelerating an answer to COVID-19
            </p>
            <p>Jonathan Strickland</p>
          </div>
        </div>

        <div className={`${prefix}--controls`}>
          <div className={`${prefix}--actions`}>
            <div className={`${prefix}--actions-controls`}>
              <span className={`${prefix}--actions-controls-download`}>
                <Download24 />
              </span>
              <span className={`${prefix}--actions-controls-move-back`}>
                <Rewind_1032 />
              </span>
              {embedAudio ? (
                <span className={`${prefix}--actions-controls-play`}>
                  <PlayOutline32 />
                </span>
              ) : (
                <span className={`${prefix}--actions-controls-pause`}>
                  <PauseOutline32 />
                </span>
              )}
              <span className={`${prefix}--actions-controls-move-forward`}>
                <Forward_1032 />
              </span>
            </div>
            <div className={`${prefix}--actions-volume`}>
              {volume === 0 && (
                <span class="volume muted hidden">
                  <VolumeMute24 />
                </span>
              )}
              {volume > 0 && volume < 80 && (
                <span class="volume half hidden">
                  <VolumeDown24 />
                </span>
              )}
              {volume >= 80 && (
                <span class="volume filled">
                  <VolumeUp24 />
                </span>
              )}
              <Slider
                max={100}
                min={0}
                value={volume}
                onChange={({ value }) => setVolume(value)}
                hideTextInput
                className={`${prefix}--actions-volume-position`}
              />
            </div>
          </div>
          <div className={`${prefix}--audio-time`}>
            <Slider
              // max={100}
              // min={0}
              minLabel="09"
              maxLabel="020"
              value={audioTime}
              onChange={({ value }) => setAudioTime(value)}
              hideTextInput
              className={`width`}
              formatLabel={(value, minOrMaxLabel) =>
                handleFormat(value, minOrMaxLabel)
              }
            />
          </div>
        </div>

        <div className={`${prefix}--extra-metadata`}>
          <Select
            hideLabel
            disabled
            className={`${prefix}--extra-metadata-transcript`}>
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
            <SelectItem value="option-3" text="Option 3" />
            <SelectItem value="option-4" text="Option 4" />
          </Select>
          <Link className={`${prefix}--extra-metadata-link`}>
            Lorem ipsum in dat
          </Link>
        </div>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  /**
   * `true` to autoplay the video on load
   */
  // autoPlay: PropTypes.bool,
  /**
   * Override default aspect ratio of `16x9`.
   * Available aspect ratios:
   *
   * `16x9`, `9x16`, `2x1`, `1x2`, `4x3`, `3x4`, `1x1`
   */
  // aspectRatio: PropTypes.string,
  /**
   * The CSS class name to apply.
   */
  // customClassName: PropTypes.string,
  /**
   * Video ID from Kaltura video platform.
   */
  // videoId: PropTypes.string.isRequired,
  /**
   * `true` to show the description.
   */
  // showCaption: PropTypes.bool,
};

AudioPlayer.defaultProps = {
  autoPlay: false,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayer;
