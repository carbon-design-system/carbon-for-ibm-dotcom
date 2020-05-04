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
 * renders background image
 *
 * @param {object} props props object
 * @param {object} props.image image object
 * @param {string} props.heading image caption
 * @param {string} props.customClassName custom classname
 * @returns {*} picture element
 */
const ImageWithCaption = ({ image, heading, customClassName }) => {
  if (!image) {
    return null;
  }

  return (
    <div
      className={classnames(`${prefix}--image-with-caption`, customClassName)}
      data-autoid={`${stablePrefix}--image-with-caption`}>
      <Image {...image} />
      <p
        className={`${prefix}--image__caption`}
        data-autoid={`${stablePrefix}--image__caption`}>
        {heading}
      </p>
    </div>
  );
};

ImageWithCaption.propTypes = {
  image: PropTypes.shape(Image.propTypes).isRequired,
  heading: PropTypes.string.isRequired,
  customClassName: PropTypes.string,
};

export default ImageWithCaption;
