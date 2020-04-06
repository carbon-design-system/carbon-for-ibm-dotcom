/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  settings as ddsSettings,
  featureFlag,
} from '@carbon/ibmdotcom-utilities';
import { DDS_LIGHTBOX_MEDIA_VIEWER } from '../../internal/FeatureFlags';
import { ExpressiveModal } from '../ExpressiveModal';
import { Image } from '../Image';
import { ModalBody } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { VideoPlayer } from '../VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LightboxMediaViewer Component
 *
 * @param {object} modalProps props object
 * @param {object} modalProps.media LightboxMediaViewer media object
 * @param {boolean} modalProps.open sets whether the modal is open/close
 * @returns {*} JSX Object
 */
const LightboxMediaViewer = ({ media, ...modalProps }) => {
  return featureFlag(
    DDS_LIGHTBOX_MEDIA_VIEWER,
    <section
      data-autoid={`${stablePrefix}--lightbox-media-viewer`}
      className={`${prefix}--lightbox-media-viewer`}>
      <ExpressiveModal fullwidth={true} {...modalProps}>
        <ModalBody>
          <div className={`${prefix}--lightbox-media-viewer__container`}>
            <div className={`${prefix}--lightbox-media-viewer__row`}>
              <div
                className={`${prefix}--lightbox-media-viewer__media ${prefix}--no-gutter`}>
                {media.type === 'video' ? (
                  <VideoPlayer videoId={media.src} />
                ) : (
                  <Image defaultSrc={media.src} alt={media.alt} />
                )}
              </div>
              <div
                className={`${prefix}--lightbox-media-viewer__media-description ${prefix}--no-gutter`}>
                <div className={`${prefix}--lightbox-media-viewer__content`}>
                  {media.title && (
                    <div
                      data-autoid={`${stablePrefix}--lightbox-media-viewer__content__title`}
                      className={`${prefix}--lightbox-media-viewer__content__title`}>
                      {media.title}
                    </div>
                  )}
                  {media.description && (
                    <div
                      data-autoid={`${stablePrefix}--lightbox-media-viewer__content__desc`}
                      className={`${prefix}--lightbox-media-viewer__content__desc`}>
                      {media.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ExpressiveModal>
    </section>
  );
};

LightboxMediaViewer.propTypes = {
  media: PropTypes.object.isRequired,
};
export default LightboxMediaViewer;
