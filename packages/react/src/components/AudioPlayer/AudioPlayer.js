/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import AudioPLayerCaptionsMenu from './AudioPlayerCaptionsMenu';
import AudioPlayerCaptionText from './AudioPlayerCaptionText';
import AudioPlayerPlaybackRateMenu from './AudioPlayerPlaybackRateMenu';
import AudioPlayerPlayButton from './AudioPlayerPlayButton';
import AudioPlayerScrubber from './AudioPlayerScrubber';
import AudioPlayerThumbnail from './AudioPlayerThumbnail';
import AudioPlayerVolumeControl from './AudioPlayerVolumeControl';
import cx from 'classnames';
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import featureFlag from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/featureflag/featureflag';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/uniqueid/uniqueid';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * AudioPlayer component.
 */
export function AudioPlayer({
  audioId,
  customClassName,
  autoPlay,
  showCaptionMenu,
  showPlaybackRateMenu,
  availablePlaybackRates,
  ...other
}) {
  const [audioData, setAudioData] = useState({ duration: 0 });
  const [displayVolumeControl, setDisplayVolumeControl] = useState(false);
  const audioPlayerId = uniqueid(`audio-player__audio-${audioId}-`);
  const uniqueAudioPlayerId = `${prefix}--${audioPlayerId}`;
  const [kalturaDigitalPlayer, setKalturaDigitalPlayer] = useState(false); // The KDP Object
  const [availableCaptions, setAvailableCaptions] = useState({}); // All Available Captions

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
  const [audioCaption, setAudioCaption] = useState(''); // Current Caption Language
  const [audioPlaybackRate, setAudioPlaybackRate] = useState(1); // Current Playback Rate

  useEffect(() => {
    let stale = false;
    (async () => {
      if (audioState === 'loading') {
        const embedAnswer = await KalturaPlayerAPI.embedMedia(
          audioId,
          uniqueAudioPlayerId,
          {
            autoPlay: true,
            playbackRateSelector: {
              defaultSpeed: 1,
              plugin: true,
            },
          }
        );

        setAudioState('playing');

        const kdp = await embedAnswer.kWidget();

        setKalturaDigitalPlayer(kdp);

        const listeners = {
          playerUpdatePlayhead: (time) => {
            setAudioTime(Math.floor(time));
          },
          newClosedCaptionsData: (captionData) => {
            const processedCaptions = availableCaptions;
            processedCaptions[captionData.label] = captionData.captions;
            setAvailableCaptions(processedCaptions);
          },
          playerPlayEnd: () => {
            setAudioState('stopped');
            /**
             * As the audio current time is floored on playhead update
             *  when the audio stop because it endend, there is a huge
             *  chance that the scrubber will show something like:
             *  2:29 <---- scrubber ----> 2:30
             *  but the audio will be ended and playbutton will show
             *  the reload icon
             * In order to fix it, we're manually setting the current
             *  audio time to the audio duration
             */
            setAudioTime(audioData.duration);
          },
        };

        // Loop and bind all the player listeners
        root.Object.keys(listeners).map((listenerKey) => {
          kdp.addJsListener(listenerKey, listeners[listenerKey]);
        });
      }
      if (stale) {
        return;
      }
      if (audioData.duration === 0) {
        const newAudioData = await KalturaPlayerAPI.api(audioId);
        if (stale) {
          return;
        }
        setAudioData(newAudioData);
      }
    })();
    return () => {
      stale = true;
    };
  }, [
    audioId,
    audioState,
    uniqueAudioPlayerId,
    availableCaptions,
    audioData.duration,
  ]);

  const initPlayer = () => {
    setAudioState('loading');
  };

  if (autoPlay && audioState === '') {
    initPlayer();
  }

  const classnames = cx(`${prefix}--audio-player`, customClassName);

  return featureFlag(
    DDS_AUDIO_PLAYER,
    <div className={classnames}>
      <div
        className={`${prefix}--audio-player__embedded-player`}
        data-autoid={`${stablePrefix}--audio-player__audio-${audioId}`}
        id={uniqueAudioPlayerId}></div>

      <AudioPlayerThumbnail audioId={audioId} />

      <AudioPlayerPlayButton
        kalturaDigitalPlayer={kalturaDigitalPlayer}
        initPlayer={initPlayer}
        audioState={audioState}
        setAudioState={setAudioState}
        setDisplayVolumeControl={setDisplayVolumeControl}
      />

      <AudioPlayerScrubber
        kalturaDigitalPlayer={kalturaDigitalPlayer}
        audioDuration={audioData.duration}
        audioTime={audioTime}
        setAudioTime={setAudioTime}
        setDisplayVolumeControl={setDisplayVolumeControl}
        rewindHelperText={other.rewindHelperText}
        forwardHelperText={other.forwardHelperText}
      />

      <AudioPlayerVolumeControl
        kalturaDigitalPlayer={kalturaDigitalPlayer}
        audioVolume={audioVolume}
        setAudioVolume={setAudioVolume}
        displayVolumeControl={displayVolumeControl}
        setDisplayVolumeControl={setDisplayVolumeControl}
      />

      {showPlaybackRateMenu && (
        <AudioPlayerPlaybackRateMenu
          kalturaDigitalPlayer={kalturaDigitalPlayer}
          availablePlaybackRates={availablePlaybackRates}
          audioPlaybackRate={audioPlaybackRate}
          setAudioPlaybackRate={setAudioPlaybackRate}
          setDisplayVolumeControl={setDisplayVolumeControl}
        />
      )}

      {showCaptionMenu && (
        <>
          <AudioPLayerCaptionsMenu
            kalturaDigitalPlayer={kalturaDigitalPlayer}
            setDisplayVolumeControl={setDisplayVolumeControl}
            availableCaptions={availableCaptions}
            audioCaption={audioCaption}
            setAudioCaption={setAudioCaption}
            closedCaptionsHelperText={other.closedCaptionsHelperText}
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
  );
}

AudioPlayer.propTypes = {
  /**
   * Media ID from Kaltura media platform.
   */
  audioId: PropTypes.string.isRequired,
  /**
   * The CSS class name to apply.
   */
  customClassName: PropTypes.string,
  /**
   * `true` to autoplay the audio on load
   */
  autoPlay: PropTypes.bool,
  /**
   * `true` to show the playback rate button.
   */
  showPlaybackRateMenu: PropTypes.bool,
  /**
   * `true` to show the captions object.
   */
  showCaptionMenu: PropTypes.bool,
  /**
   * The available speed multiplier for playback rate
   * example: [1, 1.5, 2]
   */
  availablePlaybackRates: PropTypes.arrayOf(PropTypes.number),
  /**
   * The CSS class name to apply.
   */
};

AudioPlayer.defaultProps = {
  customClassName: '',
  autoPlay: false,
  showCaptionMenu: true,
  showPlaybackRateMenu: true,
  availablePlaybackRates: [1, 1.5, 2],
};

export default AudioPlayer;
