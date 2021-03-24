/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
// import cx from 'classnames';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ClosedCaptionFilled32 from '@carbon/icons-react/es/closed-caption--filled/20';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
// import Download24 from '@carbon/icons-react/es/download/24';
import Forward_1032 from '@carbon/icons-react/es/forward--10/24';
// import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
// import VideoImageOverlay from './VideoImageOverlay';
import PauseFilled32 from '@carbon/icons-react/es/pause--filled/32';
import PlayFilledAlt32 from '@carbon/icons-react/es/play--filled--alt/32';
// import PropTypes from 'prop-types';

import Rewind_1032 from '@carbon/icons-react/es/rewind--10/24';
// import Select from '../../internal/vendor/carbon-components-react/components/Select/Select';
// import SelectItem from '../../internal/vendor/carbon-components-react/components/SelectItem/SelectItem';
import settings from 'carbon-components/es/globals/js/settings';
import Settings32 from '@carbon/icons-react/es/settings/20';
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
  const [volume, setVolume] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [displayAudio, setDisplayAudio] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  // embedVideo is set to true when overlay thumbnail is clicked
  // const [embedAudio] = useState(true);
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

  const handleDisplayVolume = () => {
    setDisplayAudio(prev => !prev);
  };

  const handlePlayPauseAudio = () => {
    setPlayAudio(prev => !prev);
  };

  return (
    <>
      {displayAudio && (
        <div className={`${prefix}--audio-player__audio-volume`}>
          <div>
            <Slider
              max={100}
              min={0}
              value={volume}
              onChange={({ value }) => setVolume(value)}
              hideTextInput
              className={`${prefix}--audio-player__audio-volume-position`}
            />
          </div>
        </div>
      )}
      <div className={`${prefix}--audio-player__audio-container`}>
        {playAudio ? (
          <Button
            renderIcon={PlayFilledAlt32}
            iconDescription="Play"
            hasIconOnly
            kind="ghost"
            onClick={() => handlePlayPauseAudio}
          />
        ) : (
          <Button
            renderIcon={PauseFilled32}
            iconDescription="Pause"
            hasIconOnly
            kind="ghost"
            onClick={() => handlePlayPauseAudio}
          />
        )}
        <Button
          renderIcon={Rewind_1032}
          iconDescription="Rewind 10 seconds"
          hasIconOnly
          kind="ghost"
        />
        <div className={`${prefix}--audio-player__audio-time`}>
          <Slider
            minLabel="09"
            maxLabel="020"
            value={audioTime}
            onChange={({ value }) => setAudioTime(value)}
            hideTextInput
            formatLabel={(value, minOrMaxLabel) =>
              handleFormat(value, minOrMaxLabel)
            }
          />
        </div>
        <Button
          renderIcon={Forward_1032}
          iconDescription="Forward 10 seconds"
          hasIconOnly
          kind="ghost"
        />
        {volume === 0 && (
          <Button
            renderIcon={VolumeMute24}
            iconDescription="Volume"
            hasIconOnly
            kind="ghost"
            onClick={() => handleDisplayVolume()}
          />
        )}
        {volume > 0 && volume < 80 && (
          <Button
            renderIcon={VolumeDown24}
            iconDescription="Volume"
            hasIconOnly
            kind="ghost"
            onClick={() => handleDisplayVolume()}
          />
        )}
        {volume >= 80 && (
          <Button
            renderIcon={VolumeUp24}
            iconDescription="Volume"
            hasIconOnly
            kind="ghost"
            onClick={() => handleDisplayVolume()}
          />
        )}
        <Button
          renderIcon={Settings32}
          iconDescription="Settings"
          hasIconOnly
          kind="ghost"
        />
        <Button
          renderIcon={ClosedCaptionFilled32}
          iconDescription="Captions"
          hasIconOnly
          kind="ghost"
        />
      </div>
    </>
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
