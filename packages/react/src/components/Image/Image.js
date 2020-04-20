/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { baseFontSize, breakpoints } from '@carbon/layout';
import classnames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { uniqueid } from '@carbon/ibmdotcom-utilities';

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
    if (typeof elem.breakpoint == 'number') {
      return elem;
    } else {
      return {
        breakpoint:
          parseFloat(breakpoints[elem.breakpoint].width) * baseFontSize,
        src: elem.src,
      };
    }
  });
  return images.sort((a, b) => (a.breakpoint > b.breakpoint ? -1 : 1));
};

/**
 * renders background image
 *
 * @param {object} props props object
 * @param {object} props.classname classname
 * @param {Array} props.sources array of images used for diff breakpoints
 * @param {string} props.defaultSrc default image (usually image for largest breakpoint)
 * @param {string} props.alt alt of the image
 * @param {string} props.longDescription optional long description for infographics.
 * @returns {*} picture element
 */
const Image = ({ classname, sources, defaultSrc, alt, longDescription }) => {
  if (!defaultSrc || !alt) {
    return null;
  }

  const sortedImages = sources ? sortSources(sources) : [];
  const id = uniqueid(`${prefix}--image-`);
  return (
    <>
      <picture
        className={`${prefix}--image`}
        data-autoid={`${stablePrefix}--image__longdescription-`}>
        {sortedImages.map((imgSrc, key) => {
          return (
            <source
              media={`(min-width: ${imgSrc.breakpoint}px )`}
              key={key}
              srcSet={imgSrc.src}
            />
          );
        })}
        <img
          className={classnames(`${prefix}--image__img`, classname)}
          src={defaultSrc}
          alt={alt}
          aria-describedby={longDescription ? `${id}` : ''}
        />
      </picture>
      {longDescription ? (
        <div id={id} className={`${prefix}--image__longdescription`}>
          {longDescription}
        </div>
      ) : null}
    </>
  );
};

Image.propTypes = {
  classname: PropTypes.string,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      breakpoint: PropTypes.any,
    })
  ),
  defaultSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  longDescription: PropTypes.string,
};

export default Image;
