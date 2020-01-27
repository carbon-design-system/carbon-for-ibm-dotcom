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

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LightboxMediaViewer Component
 *
 * @param {object} modalProps props object
 * @param {string} modalProps.title LightboxMediaViewer media title
 * @param {string} modalProps.copy LightboxMediaViewer media short description
 * @param {string} modalProps.image LightboxMediaViewer responsive image object
 * @param {boolean} modalProps.open sets whether the modal is open/close
 * @returns {*} JSX Object
 */
const LightboxMediaViewer = ({ title, image, copy, ...modalProps }) => {
  return featureFlag(
    DDS_LIGHTBOX_MEDIA_VIEWER,
    <section
      data-autoid={`${stablePrefix}--lightbox-media-viewer`}
      className={`${prefix}--lightbox-media-viewer`}>
      <ExpressiveModal fullwidth={true} {...modalProps}>
        <ModalBody>
          <div className={`${prefix}--lightbox-media-viewer__container`}>
            <div className={`${prefix}--lightbox-media-viewer__row`}>
              <Image {...image} />
              <div className={`${prefix}--lightbox-media-viewer__content`}>
                {title && (
                  <div
                    data-autoid={`${stablePrefix}--lightbox-media-viewer__content__title`}
                    className={`${prefix}--lightbox-media-viewer__content__title`}>
                    {title}
                  </div>
                )}
                {copy && (
                  <div
                    data-autoid={`${stablePrefix}--lightbox-media-viewer__content__desc`}
                    className={`${prefix}--lightbox-media-viewer__content__desc`}>
                    {copy}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
      </ExpressiveModal>
    </section>
  );
};

LightboxMediaViewer.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  image: PropTypes.object.isRequired,
};
export default LightboxMediaViewer;
