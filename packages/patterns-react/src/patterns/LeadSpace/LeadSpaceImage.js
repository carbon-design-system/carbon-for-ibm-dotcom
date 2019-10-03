/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

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
  return sources.sort((a, b) => (a.minWidth > b.minWidth ? -1 : 1));
};

/**
 * renders background image
 *
 * @param {object} props props object
 * @param {object} props.image array of images used for diff breakpoints
 * @returns {*} picture element
 */
const Image = ({ image }) => {
  const images = sortSources(image.sources);

  return (
    <picture data-autoid={`${stablePrefix}--leadspace__image`}>
      {images.map((imgSrc, key) => {
        return (
          <source
            key={key}
            media={`(min-width: ${imgSrc.minWidth}px)`}
            srcSet={imgSrc.url}
          />
        );
      })}
      <img
        className={`${prefix}--leadspace__image`}
        src={image.default}
        alt={image.alt}
      />
    </picture>
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        minWidth: PropTypes.number,
        url: PropTypes.string,
      })
    ),
    default: PropTypes.string,
    alt: PropTypes.string,
  }),
};

export default Image;
