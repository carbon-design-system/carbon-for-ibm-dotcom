/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ExpressiveModal } from '../ExpressiveModal';
import { ModalBody } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { DDS_LIGHTBOX_MEDIA_VIEWER } from '../../internal/FeatureFlags';
import {
  featureFlag,
  settings as ddsSettings,
} from '@carbon/ibmdotcom-utilities';
const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LightboxMediaViewer Component
 *
 * @param {object} props props object
 * @param {string} props.title LightboxMediaViewer media title
 * @param {string} props.copy LightboxMediaViewer media short description
 * @param {string} props.image LightboxMediaViewer responsive image object
 * @param {boolean} props.open sets whether the modal is open/close
 * @param {Function} props.onClose do something on close in addition, return false to completely replace
 * @returns {*} JSX Object
 */
const LightboxMediaViewer = ({ title, copy, image, open, onClose }) => {
  /**
   * Set default image
   *
   * @param {*} image responsive image object
   * @returns {string} default image url
   */
  const defaultImage = image => {
    return image.uri.md
      ? image.uri.md
      : image.uri.lg
      ? image.uri.lg
      : image.uri.sm;
  };

  if (!image.uri.lg) {
    return null;
  }
  return featureFlag(
    DDS_LIGHTBOX_MEDIA_VIEWER,
    <section
      data-autoid={`${stablePrefix}--lightbox-media-viewer`}
      className={`${prefix}--lightbox-media-viewer`}>
      <ExpressiveModal open={open} fullwidth={true} onClose={onClose}>
        <ModalBody>
          <div className={`${prefix}--lightbox-media-viewer__container`}>
            <div className={`${prefix}--lightbox-media-viewer__row`}>
              <div
                data-autoid={`${stablePrefix}--lightbox-media-viewer__image`}
                className={`${prefix}--lightbox-media-viewer__image`}>
                <picture>
                  {image.uri.lg && (
                    <source
                      media="(min-width: 672px)"
                      srcSet={`${image.uri.lg}`}
                    />
                  )}
                  {image.uri.md && (
                    <source
                      media="(min-width: 320px)"
                      srcSet={`${image.uri.md}`}
                    />
                  )}
                  {image.uri.sm && (
                    <source
                      media="(max-width: 320px)"
                      srcSet={`${image.uri.sm}`}
                    />
                  )}
                  <img src={defaultImage(image)} alt={image.alt}></img>
                </picture>
              </div>
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

LightboxMediaViewer.PropTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  image: PropTypes.shape({
    uri: PropTypes.shape({
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string.isRequired,
    }),
    alt: PropTypes.string,
  }),
};
export default LightboxMediaViewer;
