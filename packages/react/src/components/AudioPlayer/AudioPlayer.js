/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Object, Number } from 'window-or-global';
import React, { useState, useEffect, useRef } from 'react';
import AudioPlayerAPI from '@carbon/ibmdotcom-services/es/services/AudioPlayer/AudioPlayer';

// import cx from 'classnames';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ClosedCaptionFilled32 from '@carbon/icons-react/es/closed-caption--filled/20';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
import Forward_1032 from '@carbon/icons-react/es/forward--10/24';
import { Image } from '../Image';
import PauseFilled32 from '@carbon/icons-react/es/pause--filled/32';
import PlayFilledAlt32 from '@carbon/icons-react/es/play--filled--alt/32';
import PropTypes from 'prop-types';

import Rewind_1032 from '@carbon/icons-react/es/rewind--10/24';
import settings from 'carbon-components/es/globals/js/settings';
// import Settings32 from '@carbon/icons-react/es/settings/20';
import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

import Time24 from '@carbon/icons-react/es/time/24';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';

import VolumeDown24 from '@carbon/icons-react/es/volume--down/24';
import VolumeMute24 from '@carbon/icons-react/es/volume--mute/24';
import VolumeUp24 from '@carbon/icons-react/es/volume--up/24';

// const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * AudioPlayer component.
 *
 *
 */

const AudioPlayer = ({ autoPlay, showPlayRateSpeed, showCaption, audioId }) => {
  const inputRef = useRef(null);
  const [audioData, setAudioData] = useState({ description: '', name: '' });

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

  // embedVideo is set to true when playbutton is clicked
  const [embeddedAudio, setEmbeddedAudio] = useState(false);
  const audioPlayerId = uniqueid(`audio-player__video-${audioId}-`);
  const uniqueAudioPlayerId = `${prefix}--${audioPlayerId}`;

  const audioDuration = AudioPlayerAPI.getVideoDuration(audioData.duration); // Video Total Time

  const [kalturaDigitalPlayer, setKalturaDigitalPlayer] = useState(false); // The KDP Object
  const [availableCaptions, setAvailableCaptions] = useState({}); // All Captions
  const [audioVolume, setAudioVolume] = useState(1); // Current Volume
  const [audioTime, setAudioTime] = useState(0); // Current Play Time
  const [audioCaption, setAudioCaption] = useState('');

  useEffect(() => {
    const listenerForPlayerUpdatePlayhead = time => {
      setAudioTime(Math.floor(time));
    };

    const listenerForNewClosedCaptionsData = captionData => {
      const processedCaptions = availableCaptions;
      processedCaptions[captionData.label] = captionData.captions;
      setAvailableCaptions(processedCaptions);
    };

    let stale = false;
    (async () => {
      if (autoPlay || embeddedAudio) {
        const embedAnswer = await AudioPlayerAPI.embedAudio(
          audioId,
          uniqueAudioPlayerId,
          true
        );

        const kdp = await embedAnswer.kWidget();

        kdp.addJsListener(
          'playerUpdatePlayhead',
          listenerForPlayerUpdatePlayhead
        );

        kdp.addJsListener(
          'newClosedCaptionsData',
          listenerForNewClosedCaptionsData
        );

        setKalturaDigitalPlayer(kdp);
      }
      if (stale) {
        return;
      }
      const newAudioData = await AudioPlayerAPI.api(audioId);
      if (stale) {
        return;
      }
      setAudioData(newAudioData);
    })();
    return () => {
      stale = true;
    };
  }, [
    autoPlay,
    audioId,
    embeddedAudio,
    uniqueAudioPlayerId,
    availableCaptions,
  ]);

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
    if (!embeddedAudio) {
      setPlayAudio(prev => !prev);
      setEmbeddedAudio(true);
    } else if (kalturaDigitalPlayer) {
      if (playAudio) {
        kalturaDigitalPlayer.sendNotification('doPause');
      } else {
        kalturaDigitalPlayer.sendNotification('doPlay');
      }
      setPlayAudio(prev => !prev);
    }
  };

  const volumeControlSlider = () => {
    return (
      displayVolumeControl && (
        <div
          className={`${prefix}--audio-player__volume-control-container ${prefix}--audio-player__container-shadow`}>
          <Slider
            max={1}
            min={0}
            step={0.1}
            value={audioVolume}
            onChange={({ value }) => handleAudioVolumeChange(value)}
            hideTextInput
            formatLabel={() => ''}
          />
        </div>
      )
    );
  };

  const handleAudioSpeed = velocity => {
    if (kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification(
        'playbackRateChangeSpeed',
        velocity
      );
    }
  };

  const audioSettingsMenu = () => {
    return (
      displayAudioSettings && (
        <div
          className={`${prefix}--audio-player__audio-settings-container ${prefix}--audio-player__container-shadow`}>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioSpeed(1)}
            onKeyDown={() => handleAudioSpeed(1)}
            className={`${prefix}--audio-player__audio-settings-container-settings-options ${prefix}--audio-player__audio-settings-container-settings-options-border`}>
            1x
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioSpeed(1.5)}
            onKeyDown={() => handleAudioSpeed(1.5)}
            className={`${prefix}--audio-player__audio-settings-container-settings-options ${prefix}--audio-player__audio-settings-container-settings-options-border`}>
            1.5x
          </div>
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioSpeed(2)}
            onKeyDown={() => handleAudioSpeed(2)}
            className={`${prefix}--audio-player__audio-settings-container-settings-options`}>
            2x
          </div>
        </div>
      )
    );
  };

  const handleAudioCaptions = (captions = '') => {
    if (captions === '') {
      setDisplayAudioCaptions(false);
    } else {
      setDisplayAudioCaptions(true);
    }
    setDisplayAudioCaptionsOptions(false);
    setAudioCaption(captions);
  };

  const handleRewindForwardAudio = addedValue => {
    if (kalturaDigitalPlayer) {
      let time = audioTime + addedValue;
      time = time < 0 ? 0 : time;
      time = time >= audioData.duration ? audioData.duration : time;

      kalturaDigitalPlayer.sendNotification('doSeek', time);
    }
  };

  const handleScrubberChange = time => {
    // As this will trigger every time the updatePlayhead listener triggers
    // and we floor the floating value returned, sometimes it will return like
    // 1.123 -> Floored to 1
    // then next function callback will return
    // 1.98123 -> Floored to 1
    // And this function will trigger and set the second on the player to 1
    // meaning it's going back in the audio time and thus generating
    // a really SAD choke/gulp in the audio
    // So this function should ONLY trigger if the absolute difference
    // of the new scrubber time is bigger then 1 from the previou time value
    if (Math.abs(time - audioTime) >= 1 && kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification('doSeek', time);
      setAudioTime(time);
    }
  };

  const handleAudioVolumeChange = volume => {
    volume = Number.parseFloat(volume.toString().substring(0, 3));
    if (kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification('changeVolume', volume);
      setAudioVolume(volume);
    }
  };

  const audioCaptionsMenu = () => {
    return (
      displayAudioCaptionsOptions && (
        <div
          className={`${prefix}--audio-player__captions-container ${prefix}--audio-player__container-shadow`}>
          {/* <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioCaptions('options')}
            onKeyDown={() => handleAudioCaptions('options')}
            className={`${prefix}--audio-player__captions-container-options ${prefix}--audio-player__captions-container-options-border`}>
            Options
          </div> */}
          <div
            role="button"
            tabIndex="0"
            onClick={() => handleAudioCaptions()}
            onKeyDown={() => handleAudioCaptions()}
            className={`${prefix}--audio-player__captions-container-options ${prefix}--audio-player__captions-container-options-border`}>
            Off
          </div>
          {Object.keys(availableCaptions).map((caption, index) => {
            return (
              <div
                key={index}
                role="button"
                tabIndex="0"
                onClick={() => handleAudioCaptions(caption)}
                onKeyDown={() => handleAudioCaptions(caption)}
                className={`${prefix}--audio-player__captions-container-options`}>
                {caption}
              </div>
            );
          })}
        </div>
      )
    );
  };

  const audioCaptionText = () => {
    /// availableCaptions
    /// audioCaption
    const captionText = (availableCaptions?.[audioCaption] || [])
      .filter(caption => {
        return audioTime >= caption.start && audioTime <= caption.end;
      })
      .map(caption => {
        return caption.content;
      })
      .join('<br />');

    return (
      displayAudioCaptions &&
      availableCaptions[audioCaption] && (
        <div className={`${prefix}--audio-player__audio-container-captions`}>
          <p
            className={`${prefix}--audio-player__audio-container-captions-text`}
            dangerouslySetInnerHTML={{
              __html: captionText,
            }}></p>
        </div>
      )
    );
  };

  return (
    <>
      <div className={`${prefix}--audio-player__audio-container`}>
        <div
          className={`${prefix}--audio-player__audio`}
          id={uniqueAudioPlayerId}></div>
        {audioHasThumbnail && (
          <div
            className={`${prefix}--audio-player__thumbnail-container`}
            ref={inputRef}>
            <div className={`${prefix}--audio-player__thumbnail`}>
              <Image defaultSrc={thumbnailUrl} alt="Audio" />
            </div>
          </div>
        )}
        {playAudio ? (
          <Button
            renderIcon={PauseFilled32}
            iconDescription="Pause"
            hasIconOnly
            kind="ghost"
            onClick={() => {
              handlePlayPauseAudio();
            }}
            tooltipPosition="top"
          />
        ) : (
          <Button
            renderIcon={PlayFilledAlt32}
            iconDescription="Play"
            hasIconOnly
            kind="ghost"
            onClick={() => {
              handlePlayPauseAudio();
            }}
            tooltipPosition="top"
          />
        )}

        <Button
          renderIcon={Rewind_1032}
          iconDescription="Rewind 10 seconds"
          hasIconOnly
          kind="ghost"
          tooltipPosition="top"
          onClick={() => {
            handleRewindForwardAudio(-10);
          }}
          disabled={!kalturaDigitalPlayer}
        />

        <div className={`${prefix}--audio-player__audio-time`}>
          <Slider
            min={0}
            max={160}
            minLabel={AudioPlayerAPI.getVideoDuration(audioTime)}
            maxLabel={audioDuration}
            value={audioTime}
            onChange={({ value }) => handleScrubberChange(value)}
            hideTextInput
            formatLabel={(value, minOrMaxLabel) =>
              handleFormat(value, minOrMaxLabel)
            }
            step={1}
            stepMultiplier={10}
            disabled={!kalturaDigitalPlayer}
          />
        </div>

        {
          <Button
            renderIcon={Forward_1032}
            iconDescription="Forward 10 seconds"
            hasIconOnly
            kind="ghost"
            tooltipPosition="top"
            onClick={() => {
              handleRewindForwardAudio(10);
            }}
            disabled={!kalturaDigitalPlayer}
          />
        }

        <div className={`${prefix}--audio-player__volume-control`}>
          {audioVolume === 0 && (
            <Button
              renderIcon={VolumeMute24}
              iconDescription="Volume"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayVolume()}
              tooltipPosition="top"
              disabled={!kalturaDigitalPlayer}
            />
          )}
          {audioVolume > 0 && audioVolume < 0.8 && (
            <Button
              renderIcon={VolumeDown24}
              iconDescription="Volume"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayVolume()}
              tooltipPosition="top"
              disabled={!kalturaDigitalPlayer}
            />
          )}
          {audioVolume >= 0.8 && (
            <Button
              renderIcon={VolumeUp24}
              iconDescription="Volume"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayVolume()}
              tooltipPosition="top"
              disabled={!kalturaDigitalPlayer}
            />
          )}
          {volumeControlSlider()}
        </div>

        {showPlayRateSpeed && (
          <div className={`${prefix}--audio-player__audio-settings`}>
            <Button
              renderIcon={Time24}
              iconDescription="Playrate Speed"
              hasIconOnly
              kind="ghost"
              onClick={() => handleDisplayAudioSettings()}
              tooltipPosition="top"
              disabled={!kalturaDigitalPlayer}
            />
            {audioSettingsMenu()}
          </div>
        )}

        {showCaption && (
          <>
            <div className={`${prefix}--audio-player__captions`}>
              <Button
                renderIcon={ClosedCaptionFilled32}
                iconDescription="Captions"
                hasIconOnly
                kind="ghost"
                onClick={() => handleDisplayAudioCaptions()}
                className={
                  displayAudioCaptions &&
                  `${prefix}--audio-player__captions-button`
                }
                disabled={!Object.keys(availableCaptions).length > 0}
                tooltipPosition="top"
              />
              {kalturaDigitalPlayer &&
                Object.keys(availableCaptions).length > 0 &&
                audioCaptionsMenu()}
            </div>
            {audioCaptionText()}
          </>
        )}
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  /**
   * `true` to show the playback speed button.
   */
  showPlayRateSpeed: PropTypes.bool,
  /**
   * `true` to show the captions object.
   */
  showCaption: PropTypes.bool,
  /**
   * Video ID from Kaltura video platform.
   */
  audioId: PropTypes.string.isRequired,

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
  // aspectRatio: PropTypes.string,
  /**
   * The CSS class name to apply.
   */
  // customClassName: PropTypes.string,
};

AudioPlayer.defaultProps = {
  autoPlay: false,
  showPlayRateSpeed: true,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayer;
