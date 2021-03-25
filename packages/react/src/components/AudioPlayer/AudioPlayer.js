/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import AudioImageOverlay from './AudioImageOverlay';
import AudioPlayerAPI from '@carbon/ibmdotcom-services/es/services/AudioPlayer/AudioPlayer';

// import cx from 'classnames';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ClosedCaptionFilled32 from '@carbon/icons-react/es/closed-caption--filled/20';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import Forward_1032 from '@carbon/icons-react/es/forward--10/24';
import PauseFilled32 from '@carbon/icons-react/es/pause--filled/32';
import PlayFilledAlt32 from '@carbon/icons-react/es/play--filled--alt/32';
import PropTypes from 'prop-types';

import Rewind_1032 from '@carbon/icons-react/es/rewind--10/24';
import settings from 'carbon-components/es/globals/js/settings';
import Settings32 from '@carbon/icons-react/es/settings/20';
import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

// import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
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

const AudioPlayer = ({ hasSettings, audioId }) => {
  // const [, setVideoData] = useState({ description: '', name: '' });
  const [volume, setVolume] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [displayVolumeControl, setDisplayVolumeControl] = useState(false);
  const [displayAudioSettings, setDisplayAudioSettings] = useState(false);
  const [
    displayAudioCaptionsOptions,
    setDisplayAudioCaptionsOptions,
  ] = useState(false);
  const [displayAudioCaptions, setDisplayAudioCaptions] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [audioHasThumbnail, setAudioHasThumbnail] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

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

  useEffect(() => {
    const thumbnailUrl = AudioPlayerAPI.getThumbnailUrl({
      videoId: audioId,
      width: '48',
      height: '48',
    });

    fetch(thumbnailUrl)
      .then(() => {
        setAudioHasThumbnail(true);
        setThumbnailUrl(thumbnailUrl);
      })
      .catch(() => setAudioHasThumbnail(false));
  }, [audioId]);

  const handleFormat = (minMax, minOrMaxLabel) => {
    return minOrMaxLabel;
  };

  const toggleAudioVolumeControlAndSettings = audioCommand => {
    if (audioCommand === 'volume') {
      setDisplayAudioSettings(false);
      setDisplayAudioCaptionsOptions(false);
    }

    if (audioCommand === 'settings') {
      setDisplayVolumeControl(false);
      setDisplayAudioCaptionsOptions(false);
    }

    if (audioCommand === 'captions') {
      setDisplayVolumeControl(false);
      setDisplayAudioSettings(false);
    }
  };

  const handleDisplayVolume = () => {
    toggleAudioVolumeControlAndSettings('volume');
    setDisplayVolumeControl(prev => !prev);
  };

  const handleDisplayAudioSettings = () => {
    toggleAudioVolumeControlAndSettings('settings');
    setDisplayAudioSettings(prev => !prev);
  };

  const handleDisplayAudioCaptions = () => {
    toggleAudioVolumeControlAndSettings('captions');
    setDisplayAudioCaptionsOptions(prev => !prev);
  };

  const handlePlayPauseAudio = () => {
    setPlayAudio(prev => !prev);
  };

  const volumeControl = () => {
    return (
      displayVolumeControl && (
        <div className={`${prefix}--audio-player__volume-control-container`}>
          <Slider
            max={100}
            min={0}
            value={volume}
            onChange={({ value }) => setVolume(value)}
            hideTextInput
            formatLabel={() => ''}
          />
        </div>
      )
    );
  };

  const handleAudioSpeed = () => {
    console.log('CLICK');
  };

  const audioSettings = () => {
    return (
      displayAudioSettings && (
        <div className={`${prefix}--audio-player__audio-settings-container`}>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioSpeed()}
            onKeyDown={() => handleAudioSpeed()}
            className={`${prefix}--audio-player__audio-settings-container-settings-options ${prefix}--audio-player__audio-settings-container-settings-options-border`}>
            1x
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioSpeed()}
            onKeyDown={() => handleAudioSpeed()}
            className={`${prefix}--audio-player__audio-settings-container-settings-options ${prefix}--audio-player__audio-settings-container-settings-options-border`}>
            1.5x
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioSpeed()}
            onKeyDown={() => handleAudioSpeed()}
            className={`${prefix}--audio-player__audio-settings-container-settings-options`}>
            2x
          </div>
        </div>
      )
    );
  };

  const handleAudioCaptions = captions => {
    if (captions === 'off') {
      setDisplayAudioCaptions(false);
    } else {
      setDisplayAudioCaptions(true);
    }
    setDisplayAudioCaptionsOptions(false);
  };

  const audioCaptions = () => {
    return (
      displayAudioCaptionsOptions && (
        <div className={`${prefix}--audio-player__captions-container`}>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioCaptions('options')}
            onKeyDown={() => handleAudioCaptions('options')}
            className={`${prefix}--audio-player__captions-container-captions-options ${prefix}--audio-player__captions-container-captions-options-border`}>
            Options
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioCaptions('off')}
            onKeyDown={() => handleAudioCaptions('off')}
            className={`${prefix}--audio-player__captions-container-captions-options ${prefix}--audio-player__captions-container-captions-options-border`}>
            Off
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioCaptions('english')}
            onKeyDown={() => handleAudioCaptions('english')}
            className={`${prefix}--audio-player__captions-container-captions-options`}>
            English
          </div>
        </div>
      )
    );
  };

  const captions = () => {
    return (
      displayAudioCaptions && (
        <div
          className={`${prefix}--audio-player__audio-container-container-captions`}>
          <p
            className={`${prefix}--audio-player__audio-container-container-captions-captions-text`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      )
    );
  };

  return (
    <>
      <div className={`${prefix}--audio-player__audio-container`}>
        {audioHasThumbnail && (
          <AudioImageOverlay
            src={thumbnailUrl}
            styleOfComponent={`${prefix}--audio-player__thumbnail`}
          />
        )}
        {captions()}
        {playAudio ? (
          <Button
            renderIcon={PauseFilled32}
            iconDescription="Pause"
            hasIconOnly
            kind="ghost"
            onClick={() => handlePlayPauseAudio()}
            tooltipPosition="bottom"
          />
        ) : (
          <Button
            renderIcon={PlayFilledAlt32}
            iconDescription="Play"
            hasIconOnly
            kind="ghost"
            onClick={() => handlePlayPauseAudio()}
            tooltipPosition="bottom"
          />
        )}

        <Button
          renderIcon={Rewind_1032}
          iconDescription="Rewind 10 seconds"
          hasIconOnly
          kind="ghost"
          tooltipPosition="bottom"
        />

        <div className={`${prefix}--audio-player__audio-time`}>
          <Slider
            min={0}
            max={160}
            minLabel="00:00"
            maxLabel="00:20"
            value={audioTime}
            onChange={({ value }) => setAudioTime(value)}
            hideTextInput
            formatLabel={(value, minOrMaxLabel) =>
              handleFormat(value, minOrMaxLabel)
            }
            step={1}
          />
        </div>

        <Button
          renderIcon={Forward_1032}
          iconDescription="Forward 10 seconds"
          hasIconOnly
          kind="ghost"
          tooltipPosition="bottom"
        />

        <div className={`${prefix}--audio-player__volume-control`}>
          {volumeControl()}
          {volume === 0 && (
            <Button
              renderIcon={VolumeMute24}
              iconDescription="Volume"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayVolume()}
              tooltipPosition="bottom"
            />
          )}
          {volume > 0 && volume < 80 && (
            <Button
              renderIcon={VolumeDown24}
              iconDescription="Volume"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayVolume()}
              tooltipPosition="bottom"
            />
          )}
          {volume >= 80 && (
            <Button
              renderIcon={VolumeUp24}
              iconDescription="Volume"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayVolume()}
              tooltipPosition="bottom"
            />
          )}
        </div>

        {hasSettings && (
          <div className={`${prefix}--audio-player__audio-settings`}>
            {audioSettings()}
            <Button
              renderIcon={Settings32}
              iconDescription="Settings"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayAudioSettings()}
              tooltipPosition="bottom"
            />
          </div>
        )}

        <div className={`${prefix}--audio-player__captions`}>
          {audioCaptions()}
          <Button
            renderIcon={ClosedCaptionFilled32}
            iconDescription="Captions"
            hasIconOnly
            kind="ghost"
            onClick={() => handleDisplayAudioCaptions()}
            className={
              displayAudioCaptions && `${prefix}--audio-player__captions-button`
            }
            tooltipPosition="bottom"
          />
        </div>
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  /**
   * `true` to show the settings button.
   */
  hasSettings: PropTypes.bool,
  /**
   * Video ID from Kaltura video platform.
   */
  audioId: PropTypes.string.isRequired,

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
   * `true` to show the description.
   */
  // showCaption: PropTypes.bool,
};

AudioPlayer.defaultProps = {
  autoPlay: false,
  hasSettings: true,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayer;
