/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { baseFontSize, breakpoints } from '@carbon/layout';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 *  sorts media query min-widths order to ensure the
 * browser returns the proper sources and the specified widths
 *
 * @param {Array} sources image sources and min-widths
 *
 * @returns {Array} sorted array of sources
 */
const sortSources = sources => {
  const images = sources.map(elem => {
    if (typeof elem.minWidth == 'number') {
      return elem;
    } else {
      return {
        minWidth: parseFloat(breakpoints[elem.minWidth].width) * baseFontSize,
        src: elem.src,
      };
    }
  });
  return images.sort((a, b) => (a.minWidth > b.minWidth ? -1 : 1));
};

/**
 * renders background image
 *
 * @param {object} props props object
 * @param {object} props.images array of images used for diff breakpoints
 * @param {string} props.defaultImage default image (usually image for largest breakpoint)
 * @param {string} props.alt alt of the image
 * @returns {*} picture element
 */
const Image = ({ images, defaultImage, alt }) => {
  const sortedImages = images ? sortSources(images) : [];

  return (
    <picture
      alt={alt}
      className={`${prefix}--image`}
      data-autoid={`${stablePrefix}--image`}>
      {sortedImages.map((imgSrc, key) => {
        return (
          <source
            media={`(min-width: ${imgSrc.minWidth}px )`}
            key={key}
            srcSet={imgSrc.src}
          />
        );
      })}
      <img className={`${prefix}--image__img`} src={defaultImage} alt={alt} />
    </picture>
  );
};

Image.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      minWidth: PropTypes.any,
    })
  ),
  defaultImage: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
