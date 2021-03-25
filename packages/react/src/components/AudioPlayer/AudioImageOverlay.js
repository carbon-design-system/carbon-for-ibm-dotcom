/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import AudioPlayerAPI from '@carbon/ibmdotcom-services/es/services/AudioPlayer/AudioPlayer';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import React from 'react';
// import settings from 'carbon-components/es/globals/js/settings';

// const { stablePrefix } = ddsSettings;
// const { prefix } = settings;

/**
 * VideoPlayer Image Overlay component
 */
const AudioImageOverlay = ({ src, styleOfComponent }) => {
  return (
    <div className={styleOfComponent}>
      <Image defaultSrc={src} alt="Audio" />
    </div>
  );
};

AudioImageOverlay.propTypes = {
  /**
   * Audio ID from Kaltura video platform.
   */
  src: PropTypes.string.isRequired,

  /**
   * Class to style image.
   */
  styleOfComponent: PropTypes.string.isRequired,

  /**
   * Object containing audioData such as name, description, duration, etc.
   */
  // audioData: PropTypes.object,

  /**
   * Func to set state to trigger embedding of video
   */
  // embedVideo: PropTypes.func,
};

export default AudioImageOverlay;
