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
import { DDS_LIGHTBOX } from '../../internal/FeatureFlags';
import {
  featureFlag,
  settings as ddsSettings,
} from '@carbon/ibmdotcom-utilities';
const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Lightbox Component
 *
 * @param {object} props props object
 * @param {string} props.title LightBox media title
 * @param {string} props.copy Lightbox media short description
 * @param {string} props.image Lightbox responsive image object
 * @param {boolean} props.open sets whether the modal is open/close
 * @param {Function} props.onClose do something on close in addition, return false to completely replace
 * @returns {*} JSX Object
 */
const Lightbox = ({ title, copy, image, open, onClose }) => {
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

  if (!title || !copy || !image) {
    return null;
  }
  return featureFlag(
    DDS_LIGHTBOX,
    <section
      data-autoid={`${stablePrefix}--lightbox`}
      className={`${prefix}--lightbox`}>
      <ExpressiveModal open={open} fullwidth={true} onClose={onClose}>
        <ModalBody>
          <div className={`${prefix}--lightbox__container`}>
            <div className={`${prefix}--lightbox__row`}>
              <div
                data-autoid={`${stablePrefix}--lightbox__image`}
                className={`${prefix}--lightbox__image`}>
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
              <div className={`${prefix}--lightbox__content`}>
                {title && (
                  <div
                    data-autoid={`${stablePrefix}--lightbox__content__title`}
                    className={`${prefix}--lightbox__content__title`}>
                    {title}
                  </div>
                )}
                {copy && (
                  <div
                    data-autoid={`${stablePrefix}--lightbox__content__desc`}
                    className={`${prefix}--lightbox__content__desc`}>
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

Lightbox.PropTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  image: PropTypes.shape({
    uri: PropTypes.shape,
    alt: PropTypes.string,
  }),
};
export default Lightbox;
