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
import Forward1032 from '@carbon/icons-react/es/forward--10/32';
import { Image } from '../Image';

import OverflowMenu from '../../internal/vendor/carbon-components-react/components/OverflowMenu';
import OverflowMenuItem from '../../internal/vendor/carbon-components-react/components/OverflowMenuItem';

import PauseFilled32 from '@carbon/icons-react/es/pause--filled/32';
import PlayFilledAlt32 from '@carbon/icons-react/es/play--filled--alt/32';
import PropTypes from 'prop-types';

import Replay32 from '@carbon/icons-react/es/renew/32';

import Rewind_1032 from '@carbon/icons-react/es/rewind--10/32';
import settings from 'carbon-components/es/globals/js/settings';
// import Settings32 from '@carbon/icons-react/es/settings/20';
import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

import Time32 from '@carbon/icons-react/es/time/32';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';

import VolumeDown32 from '@carbon/icons-react/es/volume--down/32';
import VolumeMute32 from '@carbon/icons-react/es/volume--mute/32';
import VolumeUp32 from '@carbon/icons-react/es/volume--up/32';

// const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * AudioPlayer component.
 *
 *
 */

const AudioPlayer = ({
  autoPlay,
  showPlaybackRate,
  playbackRates,
  showCaption,
  audioId,
}) => {
  const inputRef = useRef(null);
  const [audioData, setAudioData] = useState({ description: '', name: '' });

  const [displayVolumeControl, setDisplayVolumeControl] = useState(false);

  const [audioHasThumbnail, setAudioHasThumbnail] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const audioPlayerId = uniqueid(`audio-player__video-${audioId}-`);
  const uniqueAudioPlayerId = `${prefix}--${audioPlayerId}`;

  const audioDuration = AudioPlayerAPI.getVideoDuration(audioData.duration); // Video Total Time

  const [kalturaDigitalPlayer, setKalturaDigitalPlayer] = useState(false); // The KDP Object
  const [availableCaptions, setAvailableCaptions] = useState({}); // All Captions
  /**
   * The current state of the player
   *
   * @param {string} '' - Player not initiated
   * @param {string} 'loading' - Player initiated but waiting kdp to load
   * @param {string} 'playing' - Player is playing
   * @param {string} 'paused' - Player is paused
   * @param {string} 'stopped' - Player stopped playing (audio finished)
   */
  const [audioState, setAudioState] = useState('');
  const [audioVolume, setAudioVolume] = useState(1); // Current Volume
  const [audioTime, setAudioTime] = useState(0); // Current Play Time
  const [audioCaption, setAudioCaption] = useState('');

  useEffect(() => {
    const listeners = {
      playerUpdatePlayhead: time => {
        setAudioTime(Math.floor(time));
      },
      newClosedCaptionsData: captionData => {
        const processedCaptions = availableCaptions;
        processedCaptions[captionData.label] = captionData.captions;
        setAvailableCaptions(processedCaptions);
      },
      playerPlayEnd: () => {
        setAudioState('stopped');
      },
    };

    let stale = false;
    (async () => {
      if (audioState === 'loading') {
        const embedAnswer = await AudioPlayerAPI.embedAudio(
          audioId,
          uniqueAudioPlayerId,
          true
        );

        setAudioState('playing');

        const kdp = await embedAnswer.kWidget();

        // Loop and bind all the player listeners
        Object.keys(listeners).map(listenerKey => {
          kdp.addJsListener(listenerKey, listeners[listenerKey]);
        });

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
  }, [audioId, audioState, uniqueAudioPlayerId, availableCaptions]);

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

  const initPlayer = () => {
    setAudioState('loading');
  };

  const handleFormat = (minMax, minOrMaxLabel) => {
    return minOrMaxLabel;
  };

  const hasCaptions = () => {
    return Object.keys(availableCaptions).length > 0;
  };

  const handleDisplayVolume = value => {
    if (value !== undefined) {
      setDisplayVolumeControl(value);
    } else {
      setDisplayVolumeControl(prev => !prev);
    }
  };

  const handlePlayPauseAudio = () => {
    if (audioState === '') {
      initPlayer();
    } else if (kalturaDigitalPlayer) {
      if (audioState === 'playing') {
        setAudioState('paused');
        kalturaDigitalPlayer.sendNotification('doPause');
      } else if (audioState === 'paused' || audioState === 'stopped') {
        setAudioState('playing');
        kalturaDigitalPlayer.sendNotification('doPlay');
      }
    }
  };

  const renderVolumeControlSlider = () => {
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

  const handleAudioPlaybackRate = velocity => {
    if (kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification(
        'playbackRateChangeSpeed',
        velocity
      );
    }
  };

  const handleAudioCaptions = (caption = '') => {
    setAudioCaption(caption);
  };

  const handleRewindForwardAudio = addedValue => {
    if (kalturaDigitalPlayer) {
      let time = audioTime + addedValue;
      time = time < 0 ? 0 : time;
      time = time >= audioData.duration ? audioData.duration : time;

      kalturaDigitalPlayer.sendNotification('doSeek', time);
      setAudioTime(time);
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

  const renderCaptionText = () => {
    const captionText = (availableCaptions?.[audioCaption] || [])
      .filter(caption => {
        return audioTime >= caption.start && audioTime <= caption.end;
      })
      .map(caption => {
        return caption.content;
      })
      .join('<br />');

    return (
      audioCaption !== '' &&
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

  const renderVolumeButtonIcon = () => {
    if (audioVolume === 0) {
      return VolumeMute32;
    } else if (audioVolume > 0 && audioVolume < 0.8) {
      return VolumeDown32;
    }
    return VolumeUp32;
  };

  const renderPlayButton = () => {
    let icon = PlayFilledAlt32;
    let iconDescription = 'Play';

    switch (audioState) {
      case 'loading':
      case 'playing':
        icon = PauseFilled32;
        iconDescription = 'Pause';
        break;
      case 'stopped':
        icon = Replay32;
        iconDescription = 'Replay';
        break;
    }

    return (
      <Button
        renderIcon={icon}
        iconDescription={iconDescription}
        hasIconOnly
        kind="ghost"
        onClick={() => {
          handlePlayPauseAudio();
        }}
        tooltipPosition="top"
      />
    );
  };

  const renderDisabledIcon = icon => {
    return (
      <Button
        renderIcon={icon}
        iconDescription="Disabled"
        hasIconOnly
        kind="ghost"
        disabled={true}
      />
    );
  };

  if (autoPlay && audioState === '') {
    initPlayer();
  }

  return (
    <>
      <div className={`${prefix}--audio-player__audio-container`}>
        <div
          className={`${prefix}--audio-player__embedded-player`}
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

        {renderPlayButton()}

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

        <Button
          renderIcon={Forward1032}
          iconDescription="Forward 10 seconds"
          hasIconOnly
          kind="ghost"
          tooltipPosition="top"
          onClick={() => {
            handleRewindForwardAudio(10);
          }}
          disabled={!kalturaDigitalPlayer}
        />

        <div className={`${prefix}--audio-player__volume-control`}>
          <Button
            renderIcon={renderVolumeButtonIcon()}
            iconDescription="Volume"
            hasIconOnly
            kind="ghost"
            onClick={() => handleDisplayVolume()}
            tooltipPosition="top"
            disabled={!kalturaDigitalPlayer}
          />

          {renderVolumeControlSlider()}
        </div>

        {showPlaybackRate && !kalturaDigitalPlayer ? (
          renderDisabledIcon(Time32)
        ) : (
          <div className={`${prefix}--audio-player__button-container`}>
            <OverflowMenu
              renderIcon={Time32}
              direction="top"
              flipped={true}
              iconDescription="Playback Rate Speed"
              selectorPrimaryFocus=""
              onOpen={() => handleDisplayVolume(false)}>
              {playbackRates.map((playbackRateValue, playbackRateIndex) => {
                return (
                  <OverflowMenuItem
                    key={playbackRateIndex}
                    itemText={playbackRateValue.toString() + 'x'}
                    hasDivider
                    onClick={() =>
                      handleAudioPlaybackRate(playbackRateValue.toString())
                    }
                    disabled={!kalturaDigitalPlayer}
                  />
                );
              })}
            </OverflowMenu>
          </div>
        )}

        {showCaption && (
          <>
            {!kalturaDigitalPlayer || !hasCaptions() ? (
              renderDisabledIcon(ClosedCaptionFilled32)
            ) : (
              <div className={`${prefix}--audio-player__button-container`}>
                <OverflowMenu
                  renderIcon={ClosedCaptionFilled32}
                  direction="top"
                  flipped={true}
                  iconDescription="Closed Captions"
                  selectorPrimaryFocus={`.${prefix}--audio-player__button-for-closed-caption-${audioCaption.toLowerCase()}`}
                  onOpen={() => handleDisplayVolume(false)}>
                  <OverflowMenuItem
                    className={`${prefix}--audio-player__button-for-closed-caption-`}
                    itemText="Off"
                    hasDivider
                    onClick={() => handleAudioCaptions()}
                    disabled={!kalturaDigitalPlayer || !hasCaptions()}
                  />
                  {Object.keys(availableCaptions).map(
                    (captionLabel, captionIndex) => {
                      return (
                        <OverflowMenuItem
                          className={`${prefix}--audio-player__button-for-closed-caption-${captionLabel.toLowerCase()}`}
                          key={captionIndex}
                          itemText={captionLabel}
                          hasDivider
                          onClick={() =>
                            handleAudioCaptions(captionLabel.toString())
                          }
                          disabled={!kalturaDigitalPlayer || !hasCaptions()}
                        />
                      );
                    }
                  )}
                </OverflowMenu>
              </div>
            )}
            {renderCaptionText()}
          </>
        )}
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  /**
   * `true` to show the playback rate button.
   */
  showPlaybackRate: PropTypes.bool,
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
   * The available speed multiplier for playback rate
   * example: [1, 1.5, 2]
   */
  playbackRates: PropTypes.arrayOf(PropTypes.number),
  /**
   * The CSS class name to apply.
   */
  // customClassName: PropTypes.string,
};

AudioPlayer.defaultProps = {
  autoPlay: false,
  showPlaybackRate: true,
  playbackRates: [1, 1.5, 2],
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayer;
