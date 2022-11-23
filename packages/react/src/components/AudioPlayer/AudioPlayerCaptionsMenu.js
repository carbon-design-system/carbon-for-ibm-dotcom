/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import AudioPlayerDisabledButton from './AudioPlayerDisabledButton';
import ClosedCaptionFilled32 from '@carbon/icons-react/es/closed-caption--filled/20';
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';

import OverflowMenu from '../../internal/vendor/carbon-components-react/components/OverflowMenu';
import OverflowMenuItem from '../../internal/vendor/carbon-components-react/components/OverflowMenuItem';

import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const AudioPlayerCaptionsMenu = ({
  kalturaDigitalPlayer,
  availableCaptions,
  audioCaption,
  setAudioCaption,
  setDisplayVolumeControl,
  closedCaptionsHelperText,
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
            iconDescription={closedCaptionsHelperText}
            selectorPrimaryFocus={`.${prefix}--audio-player__button-for-closed-caption-${audioCaption.toLowerCase()}`}
            onOpen={() => setDisplayVolumeControl(false)}
          >
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
   * It starts as false and gets morphed into the html element
   *  of the target player id reference during the kaltura player
   *  embeding process as soon as the kaltura ready callback triggers
   */
  kalturaDigitalPlayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  /**
   * An object containing all captions.
   * Each key of the object is the caption language label
   *  and contain an array of entries.
   * Each entry of this array is an object containing:
   *  start -> Number - The first second of the audio where
   *          the caption should be displayed
   *  end -> Number - The last second of the audio where
   *          the caption should be displayed
   *  content -> String - The html content of the caption
   */
  availableCaptions: PropTypes.object.isRequired,
  /**
   * The state getter for the current selected caption language
   */
  audioCaption: PropTypes.string.isRequired,
  /**
   * The helper text label for the closed captions button
   */
  closedCaptionsHelperText: PropTypes.string,
  /**
   * The state setter for the current selected caption language
   */
  setAudioCaption: PropTypes.func.isRequired,
  /**
   * The state setter that show/hide the custom volume menu
   */
  setDisplayVolumeControl: PropTypes.func.isRequired,
};

AudioPlayerCaptionsMenu.defaultProps = {
  kalturaDigitalPlayer: false,
  availableCaptions: [],
  audioCaption: '',
  closedCaptionsHelperText: 'Closed captions',
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerCaptionsMenu;
