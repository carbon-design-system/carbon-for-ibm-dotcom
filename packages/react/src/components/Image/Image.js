/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { baseFontSize, breakpoints } from '@carbon/layout';
import classnames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/uniqueid/uniqueid';

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
    }
    return {
      breakpoint: parseFloat(breakpoints[elem.breakpoint].width) * baseFontSize,
      src: elem.src,
    };
  });
  return images.sort((a, b) => (a.breakpoint > b.breakpoint ? -1 : 1));
};

/**
 * Picture element.
 */
const Image = ({
  classname,
  sources,
  defaultSrc,
  alt,
  longDescription,
  icon: Icon,
  border,
  refImage,
}) => {
  if (!defaultSrc || !alt) {
    return null;
  }

  const sortedImages = sources ? sortSources(sources) : [];
  const id = uniqueid(`${prefix}--image-`);
  const imageClasses = classnames(`${prefix}--image__img`, classname, {
    [`${prefix}--image__img--border`]: border,
  });
  return (
    <div
      className={`${prefix}--image`}
      data-autoid={`${stablePrefix}--image__longdescription`}>
      <picture ref={refImage}>
        {sortedImages.map((imgSrc, key) => {
          return (
            <source
              media={`(min-width: ${imgSrc.breakpoint}px)`}
              key={key}
              srcSet={imgSrc.src}
            />
          );
        })}
        <img
          className={imageClasses}
          src={defaultSrc}
          alt={alt}
          aria-describedby={longDescription ? `${id}` : undefined}
        />
      </picture>
      {longDescription ? (
        <div id={id} className={`${prefix}--image__longdescription`}>
          {longDescription}
        </div>
      ) : null}
      {Icon && <Icon className={`${prefix}--image__icon`} />}
    </div>
  );
};

Image.propTypes = {
  /**
   * The CSS class names.
   */
  classname: PropTypes.string,

  /**
   * Array of image objects. Use below object structure for each items:
   *
   * | Name         | Data Type     | Description                                  |
   * | ------------ | ------------- | -------------------------------------------- |
   * | `src`        | String        | Url of Image.                                |
   * | `breakpoint` | Num OR String | min-width breakpoint to render the image src |
   */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),

  /**
   * Default image (usually image for largest breakpoint).
   */
  defaultSrc: PropTypes.string.isRequired,

  /**
   * Alternate text for image component.
   */
  alt: PropTypes.string.isRequired,

  /**
   * Visible to screen readers, hidden from users.
   */
  longDescription: PropTypes.string,

  /**
   * Icon that overlays the image
   */
  icon: PropTypes.func,

  /**
   * Option to apply a solid border around the image
   */
  border: PropTypes.bool,

  /**
   * Callback ref to get proper thumbnail sizing on Kaltura videos
   */
  refImage: PropTypes.func,
};

export default Image;
