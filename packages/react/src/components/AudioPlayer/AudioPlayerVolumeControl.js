/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';

import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
import { Number } from 'window-or-global';
// const { stablePrefix } = ddsSettings;

import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

import VolumeDown32 from '@carbon/icons-react/es/volume--down/32';
import VolumeMute32 from '@carbon/icons-react/es/volume--mute/32';
import VolumeUp32 from '@carbon/icons-react/es/volume--up/32';

const { prefix } = settings;

const AudioPlayerVolumeControl = ({
  kalturaDigitalPlayer,
  handleDisplayVolume,
  audioVolume,
  setAudioVolume,
  displayVolumeControl,
}) => {
  const handleAudioVolumeChange = volume => {
    volume = Number.parseFloat(volume.toString().substring(0, 3));
    if (kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification('changeVolume', volume);
      setAudioVolume(volume);
    }
  };

  const renderVolumeButtonIcon = () => {
    if (audioVolume === 0) {
      return VolumeMute32;
    } else if (audioVolume > 0 && audioVolume < 0.8) {
      return VolumeDown32;
    }
    return VolumeUp32;
  };

  return (
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

      {displayVolumeControl && (
        <div
          className={`${prefix}--audio-player__volume-control-menu ${prefix}--audio-player__shadow`}>
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
      )}
    </div>
  );
};

AudioPlayerVolumeControl.propTypes = {
  /**
   * The kdp object
   */
  kalturaDigitalPlayer: PropTypes.object.isRequired,
  /**
   * The function that show/hide the custom volume menu
   */
  handleDisplayVolume: PropTypes.func.isRequired,
  /**
   * The current volume of the player
   */
  audioVolume: PropTypes.number.isRequired,
  /**
   * The state setter for the current volume of the player
   */
  setAudioVolume: PropTypes.func.isRequired,
  /**
   * Should the custom volume control show up?
   */
  displayVolumeControl: PropTypes.bool.isRequired,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayerVolumeControl;
