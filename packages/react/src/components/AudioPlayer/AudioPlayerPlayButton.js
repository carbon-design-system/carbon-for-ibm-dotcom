/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';

import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';

import PauseFilled32 from '@carbon/icons-react/es/pause--filled/32';
import PlayFilledAlt32 from '@carbon/icons-react/es/play--filled--alt/32';

import PropTypes from 'prop-types';
import React from 'react';

import Replay32 from '@carbon/icons-react/es/renew/32';

const AudioPlayerPlayButton = ({
  initPlayer,
  audioState,
  setAudioState,
  kalturaDigitalPlayer,
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
      case 'stopped':
        icon = Replay32;
        iconDescription = 'Replay';
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
   * The function to start the player
   */
  initPlayer: PropTypes.func.isRequired,
  /**
   * The current state of the player
   */
  audioState: PropTypes.string.isRequired,
  /**
   * A function to update the audioState
   */
  setAudioState: PropTypes.func.isRequired,
  /**
   * The kdp object
   */
  kalturaDigitalPlayer: PropTypes.object.isRequired,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayerPlayButton;
