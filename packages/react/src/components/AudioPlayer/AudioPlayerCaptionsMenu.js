/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import AudioPlayerDisabledButton from './AudioPlayerDisabledButton';
import ClosedCaptionFilled32 from '@carbon/icons-react/es/closed-caption--filled/20';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// const { stablePrefix } = ddsSettings;

import OverflowMenu from '../../internal/vendor/carbon-components-react/components/OverflowMenu';
import OverflowMenuItem from '../../internal/vendor/carbon-components-react/components/OverflowMenuItem';

import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const AudioPlayerCaptionsMenu = ({
  kalturaDigitalPlayer,
  handleDisplayVolume,
  availableCaptions,
  audioCaption,
  setAudioCaption,
}) => {
  const hasCaptions = () => {
    return Object.keys(availableCaptions).length > 0;
  };

  const handleAudioCaptions = (caption = '') => {
    setAudioCaption(caption);
  };

  return (
    <>
      {!kalturaDigitalPlayer || !hasCaptions() ? (
        <AudioPlayerDisabledButton icon={ClosedCaptionFilled32} />
      ) : (
        <div className={`${prefix}--audio-player__overflow-menu-container`}>
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
                    onClick={() => handleAudioCaptions(captionLabel.toString())}
                    disabled={!kalturaDigitalPlayer || !hasCaptions()}
                  />
                );
              }
            )}
          </OverflowMenu>
        </div>
      )}
    </>
  );
};

AudioPlayerCaptionsMenu.propTypes = {
  /**
   * The kaltura digital player (KDP) object
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * An object containing all captions withing an array
   * inside an object where each key is the caption language
   */
  availableCaptions: PropTypes.object.isRequired,
  /**
   * The function that show/hide the custom volume menu
   */
  handleDisplayVolume: PropTypes.func.isRequired,
  /**
   * The current selected caption language
   */
  audioCaption: PropTypes.string.isRequired,
  /**
   * The state setter for the current caption selected
   */
  setAudioCaption: PropTypes.func.isRequired,
};

AudioPlayerCaptionsMenu.defaultProps = {
  kalturaDigitalPlayer: false,
};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayerCaptionsMenu;
