/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import AudioPlayerAPI from '@carbon/ibmdotcom-services/es/services/AudioPlayer/AudioPlayer';
import AudioPLayerCaptionsMenu from './AudioPlayerCaptionsMenu';
import AudioPlayerCaptionText from './AudioPlayerCaptionText';
import AudioPlayerPlaybackRateMenu from './AudioPlayerPlaybackRateMenu';
import AudioPlayerPlayButton from './AudioPlayerPlayButton';
import AudioPlayerScrubber from './AudioPlayerScrubber';
import AudioPlayerThumbnail from './AudioPlayerThumbnail';
import AudioPlayerVolumeControl from './AudioPlayerVolumeControl';

// import cx from 'classnames';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';

import { Object } from 'window-or-global';

import PropTypes from 'prop-types';

import settings from 'carbon-components/es/globals/js/settings';

import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';

// const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * AudioPlayer component.
 */
const AudioPlayer = ({
  autoPlay,
  showPlaybackRate,
  playbackRates,
  showCaption,
  audioId,
}) => {
  const [audioData, setAudioData] = useState({ description: '', name: '' });

  const [displayVolumeControl, setDisplayVolumeControl] = useState(false);

  const audioPlayerId = uniqueid(`audio-player__video-${audioId}-`);
  const uniqueAudioPlayerId = `${prefix}--${audioPlayerId}`;

  const [kalturaDigitalPlayer, setKalturaDigitalPlayer] = useState(false); // The KDP Object
  const [availableCaptions, setAvailableCaptions] = useState({}); // All Captions
  /**
   * The current state of the player
   *
   * @param {string} '' - Player not initialized
   * @param {string} 'loading' - Player initialized but waiting kdp to load
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

  const initPlayer = () => {
    setAudioState('loading');
  };

  const handleDisplayVolume = value => {
    if (value !== undefined) {
      setDisplayVolumeControl(value);
    } else {
      setDisplayVolumeControl(prev => !prev);
    }
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

        <AudioPlayerThumbnail audioId={audioId} />

        <AudioPlayerPlayButton
          initPlayer={initPlayer}
          audioState={audioState}
          setAudioState={setAudioState}
          kalturaDigitalPlayer={kalturaDigitalPlayer}
        />

        <AudioPlayerScrubber
          kalturaDigitalPlayer={kalturaDigitalPlayer}
          audioTime={audioTime}
          audioData={audioData}
          setAudioTime={setAudioTime}
        />

        <AudioPlayerVolumeControl
          kalturaDigitalPlayer={kalturaDigitalPlayer}
          handleDisplayVolume={handleDisplayVolume}
          audioVolume={audioVolume}
          setAudioVolume={setAudioVolume}
          displayVolumeControl={displayVolumeControl}
        />

        {showPlaybackRate && (
          <AudioPlayerPlaybackRateMenu
            kalturaDigitalPlayer={kalturaDigitalPlayer}
            playbackRates={playbackRates}
            handleDisplayVolume={handleDisplayVolume}
          />
        )}

        {showCaption && (
          <>
            <AudioPLayerCaptionsMenu
              kalturaDigitalPlayer={kalturaDigitalPlayer}
              handleDisplayVolume={handleDisplayVolume}
              availableCaptions={availableCaptions}
              audioCaption={audioCaption}
              setAudioCaption={setAudioCaption}
            />

            {availableCaptions?.[audioCaption] && (
              <AudioPlayerCaptionText
                captions={availableCaptions[audioCaption]}
                audioTime={audioTime}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  /**
   * Video ID from Kaltura video platform.
   */
  audioId: PropTypes.string.isRequired,
  /**
   * `true` to autoplay the video on load
   */
  autoPlay: PropTypes.bool,
  /**
   * `true` to show the playback rate button.
   */
  showPlaybackRate: PropTypes.bool,
  /**
   * `true` to show the captions object.
   */
  showCaption: PropTypes.bool,
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
