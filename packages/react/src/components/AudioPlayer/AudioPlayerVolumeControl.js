/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';

import cx from 'classnames';

import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';

import PropTypes from 'prop-types';
import React from 'react';

import root from 'window-or-global';

import settings from 'carbon-components/es/globals/js/settings';

import Slider from '../../internal/vendor/carbon-components-react/components/Slider/Slider';

import VolumeDown32 from '@carbon/icons-react/es/volume--down/32';
import VolumeMute32 from '@carbon/icons-react/es/volume--mute/32';
import VolumeUp32 from '@carbon/icons-react/es/volume--up/32';

const { prefix } = settings;

const AudioPlayerVolumeControl = ({
  kalturaDigitalPlayer,
  audioVolume,
  setAudioVolume,
  displayVolumeControl,
  setDisplayVolumeControl,
}) => {
  const handleAudioVolumeChange = (volume) => {
    volume = root.Number.parseFloat(volume.toString().substring(0, 3));
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

  const buttonClasses = cx({
    [`${prefix}--force-tooltip-hidden ${prefix}--menu--open`]:
      displayVolumeControl,
  });

  return (
    <div className={`${prefix}--audio-player__volume-control`}>
      <Button
        className={buttonClasses}
        renderIcon={renderVolumeButtonIcon()}
        iconDescription="Volume"
        hasIconOnly
        kind="ghost"
        onClick={() => setDisplayVolumeControl((prev) => !prev)}
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
   * The kaltura digital player (KDP) object
   * It starts as false and gets morphed into the html element
   *  of the target player id reference during the kaltura player
   *  embeding process as soon as the kaltura ready callback triggers
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * The state getter for the current volume of the player
   * 0 to 1, stepping by 0.1
   */
  audioVolume: PropTypes.number.isRequired,
  /**
   * The state setter for the current volume of the player
   * 0 to 1, stepping by 0.1
   */
  setAudioVolume: PropTypes.func.isRequired,
  /**
   * The state getter that show/hide the custom volume menu
   */
  displayVolumeControl: PropTypes.bool.isRequired,
  /**
   * The state setter that show/hide the custom volume menu
   */
  setDisplayVolumeControl: PropTypes.func.isRequired,
};

AudioPlayerVolumeControl.defaultProps = {
  kalturaDigitalPlayer: false,
  audioVolume: 1,
  displayVolumeControl: false,
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerVolumeControl;
