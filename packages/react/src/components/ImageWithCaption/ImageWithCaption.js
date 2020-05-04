/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classnames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 *
 * @param {string} type returns inverse or default
 * @returns {string} theme classname
 */
function textClassname(type) {
  if (type === 'inverse') {
    return `${prefix}--image__caption-inverse`;
  } else return `${prefix}--image__caption`;
}

/**
 *
 * @param {string} type returns inverse or default
 * @returns {string} theme classname
 */
function themeClassname(type) {
  if (type === 'inverse') {
    return `${prefix}--image-with-caption-inverse`;
  } else return `${prefix}--image-with-caption`;
}

/**
 * renders background image
 *
 * @param {object} props props object
 * @param {object} props.image image object
 * @param {string} props.heading image caption
 * @param {string} props.customClassName custom classname
 * @returns {*} picture element
 */
const ImageWithCaption = ({ type, image, heading, customClassName }) => {
  if (!image) {
    return null;
  }

  return (
    <div
      className={classnames(themeClassname(type), customClassName)}
      data-autoid={`${stablePrefix}--image-with-caption`}>
      <Image {...image} />
      <p
        className={textClassname(type)}
        data-autoid={`${stablePrefix}--image__caption`}>
        {heading}
      </p>
    </div>
  );
};

ImageWithCaption.propTypes = {
  type: PropTypes.oneOf(['inverse', '']),
  image: PropTypes.shape(Image.propTypes).isRequired,
  heading: PropTypes.string.isRequired,
  customClassName: PropTypes.string,
};

export default ImageWithCaption;
