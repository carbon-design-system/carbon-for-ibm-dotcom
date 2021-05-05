/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
// const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const AudioPlayerCaptionText = ({ captions, audioTime }) => {
  const captionText = (captions || [])
    .filter(caption => {
      return audioTime >= caption.start && audioTime <= caption.end;
    })
    .map(caption => {
      return caption.content;
    })
    .join('<br />');

  return (
    captions && (
      <div className={`${prefix}--audio-player__audio-container-captions`}>
        <p
          className={`${prefix}--audio-player__audio-container-captions-text`}
          dangerouslySetInnerHTML={{
            __html: captionText,
          }}></p>
      </div>
    )
  );
};

AudioPlayerCaptionText.propTypes = {
  /**
   * An array containing all the captions for a selected language
   */
  captions: PropTypes.array.isRequired,
  /**
   * The current time of the audio
   */
  audioTime: PropTypes.number.isRequired,
};

AudioPlayerCaptionText.defaultProps = {
  captions: [],
  audioTime: 0,
};

export default AudioPlayerCaptionText;
