/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';

import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';

import PauseFilled32 from '@carbon/icons-react/es/pause--filled/32';
import PlayFilledAlt32 from '@carbon/icons-react/es/play--filled--alt/32';

import PropTypes from 'prop-types';
import React from 'react';

import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const AudioPlayerPlayButton = ({
  kalturaDigitalPlayer,
  initPlayer,
  audioState,
  setAudioState,
  setDisplayVolumeControl,
}) => {
  const handlePlayButton = () => {
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
      // Hide the Volume Control Bar if Opened
      setDisplayVolumeControl(false);
    }
  };

  const handleButtonProps = () => {
    let icon = PlayFilledAlt32;
    let iconDescription = 'Play';

    switch (audioState) {
      case 'loading':
      case 'playing':
        icon = PauseFilled32;
        iconDescription = 'Pause';
        break;
    }

    return {
      icon,
      iconDescription,
    };
  };

  const playButtonProps = handleButtonProps();

  return (
    <Button
      className={`${prefix}--audio-player__play-button`}
      renderIcon={playButtonProps.icon}
      iconDescription={playButtonProps.iconDescription}
      hasIconOnly
      kind="ghost"
      onClick={() => {
        handlePlayButton();
      }}
      tooltipPosition="top"
    />
  );
};

AudioPlayerPlayButton.propTypes = {
  /**
   * The kaltura digital player (KDP) object
   * It starts as false and gets morphed into the html element
   *  of the target player id reference during the kaltura player
   *  embeding process as soon as the kaltura ready callback triggers
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * The function that start the kaltura digital player embeding
   *  process, bind all the events and start / gives-life-to the
   *  audio component.
   */
  initPlayer: PropTypes.func.isRequired,
  /**
   * The state getter for the current state of the player
   * The state list can be found in AudioPlayer.js
   */
  audioState: PropTypes.string.isRequired,
  /**
   * The state setter for the current state of the player
   * The state list can be found in AudioPlayer.js
   */
  setAudioState: PropTypes.func.isRequired,
  /**
   * The state setter that show/hide the custom volume menu
   */
  setDisplayVolumeControl: PropTypes.func.isRequired,
};

AudioPlayerPlayButton.defaultProps = {
  kalturaDigitalPlayer: false,
  audioState: '',
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerPlayButton;
