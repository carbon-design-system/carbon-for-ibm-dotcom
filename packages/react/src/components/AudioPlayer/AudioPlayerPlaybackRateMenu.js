/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import AudioPlayerDisabledButton from './AudioPlayerDisabledButton';
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';

import OverflowMenu from '../../internal/vendor/carbon-components-react/components/OverflowMenu';
import OverflowMenuItem from '../../internal/vendor/carbon-components-react/components/OverflowMenuItem';

import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import Time32 from '@carbon/icons-react/es/time/32';

const { prefix } = settings;

const AudioPlayerPlaybackRateMenu = ({
  kalturaDigitalPlayer,
  availablePlaybackRates,
  audioPlaybackRate,
  setAudioPlaybackRate,
  setDisplayVolumeControl,
}) => {
  const handleAudioPlaybackRate = velocity => {
    if (kalturaDigitalPlayer) {
      setAudioPlaybackRate(velocity);

      kalturaDigitalPlayer.sendNotification(
        'playbackRateChangeSpeed',
        velocity.toString()
      );
    }
  };

  return (
    <>
      {!kalturaDigitalPlayer ? (
        <AudioPlayerDisabledButton icon={Time32} />
      ) : (
        <div className={`${prefix}--audio-player__overflow-menu-container`}>
          <OverflowMenu
            renderIcon={Time32}
            direction="top"
            flipped={true}
            iconDescription="Playback Rate Speed"
            selectorPrimaryFocus={`.${prefix}--audio-player__button-for-playback-rate-${audioPlaybackRate
              .toString()
              .split('.')
              .join('-')}x`}
            onOpen={() => setDisplayVolumeControl(false)}>
            {availablePlaybackRates
              .sort((a, b) => {
                return a - b;
              })
              .map((playbackRateValue, playbackRateIndex) => {
                return (
                  <OverflowMenuItem
                    className={`${prefix}--audio-player__button-for-playback-rate-${playbackRateValue
                      .toString()
                      .split('.')
                      .join('-')}x`}
                    key={playbackRateIndex}
                    itemText={playbackRateValue.toString() + 'x'}
                    hasDivider
                    onClick={() => handleAudioPlaybackRate(playbackRateValue)}
                    disabled={!kalturaDigitalPlayer}
                  />
                );
              })}
          </OverflowMenu>
        </div>
      )}
    </>
  );
};

AudioPlayerPlaybackRateMenu.propTypes = {
  /**
   * The kaltura digital player (KDP) object
   * It starts as false and gets morphed into the html element
   *  of the target player id reference during the kaltura player
   *  embeding process as soon as the kaltura ready callback triggers
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * An array containing the available velocities/rates of the playback
   * Decimal - Ideally the decimals should be multiples of 0.25
   * Example & Default Values (inherited from parent):
   *  [1, 1.5, 2]
   */
  availablePlaybackRates: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The state getter for the current playback rate
   */
  audioPlaybackRate: PropTypes.number.isRequired,
  /**
   * The state setter for the current playback rate
   */
  setAudioPlaybackRate: PropTypes.func.isRequired,
  /**
   * The state setter that show/hide the custom volume menu
   */
  setDisplayVolumeControl: PropTypes.func.isRequired,
};

AudioPlayerPlaybackRateMenu.defaultProps = {
  kalturaDigitalPlayer: false,
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerPlaybackRateMenu;
