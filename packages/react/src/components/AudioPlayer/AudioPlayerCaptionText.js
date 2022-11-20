/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';

import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

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
      <div className={`${prefix}--audio-player__captions`}>
        <p
          className={`${prefix}--audio-player__captions-text`}
          dangerouslySetInnerHTML={{
            __html: captionText,
          }}></p>
      </div>
    )
  );
};

AudioPlayerCaptionText.propTypes = {
  /**
   * An array containing all the captions for the current
   *  selected language.
   * Each entry of this array is an object containing:
   *  start -> Number - The first second of the audio where
   *          the caption should be displayed
   *  end -> Number - The last second of the audio where
   *          the caption should be displayed
   *  content -> String - The html content of the caption
   */
  captions: PropTypes.array.isRequired,
  /**
   * The state getter for the current audio time (in seconds)
   */
  audioTime: PropTypes.number.isRequired,
};

AudioPlayerCaptionText.defaultProps = {
  captions: [],
  audioTime: 0,
};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerCaptionText;
