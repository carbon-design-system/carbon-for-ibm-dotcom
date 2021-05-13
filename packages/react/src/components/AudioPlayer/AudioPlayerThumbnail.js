/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect, useRef } from 'react';
import { DDS_FLAGS_ALL } from '../../internal/FeatureFlags';
// import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';

import { Image } from '../Image';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services/es/services';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

// const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const AudioPlayerThumbnail = ({ audioId }) => {
  const inputRef = useRef(null);

  const [audioHasThumbnail, setAudioHasThumbnail] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    const thumbnailUrlFromAPI = KalturaPlayerAPI.getThumbnailUrl({
      mediaId: audioId,
      width: '48',
      height: '48',
    });

    fetch(thumbnailUrlFromAPI)
      .then(() => {
        setAudioHasThumbnail(true);
        setThumbnailUrl(thumbnailUrlFromAPI);
      })
      .catch(() => setAudioHasThumbnail(false));
  }, [audioId]);

  return (
    <>
      {audioHasThumbnail && (
        <div
          className={`${prefix}--audio-player__thumbnail-container`}
          ref={inputRef}>
          <div className={`${prefix}--audio-player__thumbnail`}>
            <Image defaultSrc={thumbnailUrl} alt="Audio" />
          </div>
        </div>
      )}
    </>
  );
};

AudioPlayerThumbnail.propTypes = {
  /**
   * The Media ID from Kaltura video platform.
   */
  audioId: PropTypes.string.isRequired,
};

AudioPlayerThumbnail.defaultProps = {};

export default !DDS_FLAGS_ALL ? undefined : AudioPlayerThumbnail;
