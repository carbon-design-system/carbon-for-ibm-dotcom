/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useRef } from 'react';
import { DDS_AUDIO_PLAYER } from '../../internal/FeatureFlags';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services/es/services';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

const AudioPlayerThumbnail = ({ audioId }) => {
  const inputRef = useRef(null);

  const thumbnailUrl = KalturaPlayerAPI.getThumbnailUrl({
    mediaId: audioId,
    width: '48',
    height: '48',
  });

  return (
    <>
      <div
        className={`${prefix}--audio-player__thumbnail-container`}
        ref={inputRef}>
        <div
          className={`${prefix}--audio-player__thumbnail`}
          style={{ backgroundImage: `url('${thumbnailUrl}')` }}></div>
      </div>
    </>
  );
};

AudioPlayerThumbnail.propTypes = {
  /**
   * The Media ID from Kaltura media platform.
   */
  audioId: PropTypes.string.isRequired,
};

AudioPlayerThumbnail.defaultProps = {};

export default !DDS_AUDIO_PLAYER ? undefined : AudioPlayerThumbnail;
