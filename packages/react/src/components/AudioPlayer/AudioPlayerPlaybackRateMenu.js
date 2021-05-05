/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import AudioPlayerDisabledButton from './AudioPlayerDisabledButton';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// const { stablePrefix } = ddsSettings;

import OverflowMenu from '../../internal/vendor/carbon-components-react/components/OverflowMenu';
import OverflowMenuItem from '../../internal/vendor/carbon-components-react/components/OverflowMenuItem';

import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import Time32 from '@carbon/icons-react/es/time/32';

const { prefix } = settings;

const AudioPlayerPlaybackRateMenu = ({
  kalturaDigitalPlayer,
  playbackRates,
  handleDisplayVolume,
}) => {
  const handleAudioPlaybackRate = velocity => {
    if (kalturaDigitalPlayer) {
      kalturaDigitalPlayer.sendNotification(
        'playbackRateChangeSpeed',
        velocity
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
            selectorPrimaryFocus=""
            onOpen={() => handleDisplayVolume(false)}>
            {playbackRates
              .sort((a, b) => {
                return a - b;
              })
              .map((playbackRateValue, playbackRateIndex) => {
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
    </>
  );
};

AudioPlayerPlaybackRateMenu.propTypes = {
  /**
   * The kdp object
   */
  kalturaDigitalPlayer: PropTypes.object.isRequired,
  /**
   * The available speed multiplier for playback rate
   * example: [1, 1.5, 2]
   */
  playbackRates: PropTypes.array.isRequired,
  /**
   * The function that show/hide the custom volume menu
   */
  handleDisplayVolume: PropTypes.func.isRequired,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayerPlaybackRateMenu;
