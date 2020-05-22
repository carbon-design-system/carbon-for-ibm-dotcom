/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import CTALogic from '../CTA/CTALogic';
import cx from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import ZoomIn20 from '@carbon/icons-react/es/zoom--in/20';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders background image
 *
 * @param {boolean} props props object
 * @param {boolean} props.inverse inverse
 * @param {object} props.image image object
 * @param {string} props.lightbox launch lightbox on click
 * @param {string} props.heading image caption
 * @param {string} props.copy more detailed description of image
 * @param {string} props.customClassName custom classname
 * @returns {*} picture element
 */
const ImageWithCaption = ({
  inverse,
  image,
  lightbox,
  heading,
  copy,
  customClassName,
}) => {
  const [renderLightBox, openLightBox] = useState(false);

  if (!image) {
    return null;
  }
  const classnames = cx(
    `${prefix}--image-with-caption`,
    { [`${prefix}--image-with-caption--inverse`]: inverse },
    customClassName
  );

  const media = {
    type: 'image',
    src: image.defaultSrc,
    title: heading,
    alt: image.alt,
    description: copy,
  };

  return (
    <div
      className={classnames}
      data-autoid={`${stablePrefix}--image-with-caption`}>
      {CTALogic.launchLightBox(renderLightBox, openLightBox, media)}
      {lightbox ? (
        <button
          aria-label="launch light box media viewer"
          className={`${prefix}--image-with-caption__image`}
          onClick={e => CTALogic.setLightBox(e, openLightBox)}>
          <Image {...image} />
          <div className={`${prefix}--image-with-caption__zoom-button`}>
            <ZoomIn20 aria-label="Zoom In Icon" />
          </div>
        </button>
      ) : (
        <Image {...image} />
      )}
      <p
        className={`${prefix}--image__caption--inverse`}
        data-autoid={`${stablePrefix}--image__caption`}>
        {heading}
      </p>
    </div>
  );
};

ImageWithCaption.propTypes = {
  inverse: PropTypes.bool,
  image: PropTypes.shape(Image.propTypes).isRequired,
  lightbox: PropTypes.bool,
  heading: PropTypes.string,
  copy: PropTypes.string,
  customClassName: PropTypes.string,
};

ImageWithCaption.defaultProps = {
  inverse: false,
  copy: '',
  lightbox: false,
};

export default ImageWithCaption;
