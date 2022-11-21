/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import CTALogic from '../CTA/CTALogic';
import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import ZoomIn20 from '@carbon/icons-react/es/zoom--in/20';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Picture element.
 */
const ImageWithCaption = ({
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
  const classnames = cx(`${prefix}--image-with-caption`, customClassName);

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
      data-autoid={`${stablePrefix}--image-with-caption`}
    >
      {CTALogic.launchLightBox(renderLightBox, openLightBox, media)}
      {lightbox ? (
        <button
          aria-label="launch light box media viewer"
          className={`${prefix}--image-with-caption__image`}
          onClick={(e) => CTALogic.setLightBox(e, openLightBox)}
        >
          <Image {...image} />
          <div className={`${prefix}--image-with-caption__zoom-button`}>
            <ZoomIn20 aria-label="Zoom In Icon" />
          </div>
        </button>
      ) : (
        <Image {...image} />
      )}
      <p
        className={`${prefix}--image__caption`}
        data-autoid={`${stablePrefix}--image__caption`}
      >
        {heading}
      </p>
    </div>
  );
};

ImageWithCaption.propTypes = {
  /**
   * Image object needed for ImageWithCaption component.
   * Visit the [Image storybook](https://www.ibm.com/standards/carbon/react/?path=/story/components-image--default)
   * for more details on the Image component.
   */
  image: PropTypes.shape({
    classname: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
    defaultSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    longDescription: PropTypes.string,
  }).isRequired,

  /**
   * `true` to enable lightbox functionality, allowing user to see enlarged image.
   */
  lightbox: PropTypes.bool,

  /**
   * Caption text.
   */
  heading: PropTypes.string,

  /**
   * More detailed description of the image.
   */
  copy: PropTypes.string,

  /**
   * The CSS class name to apply.
   */
  customClassName: PropTypes.string,
};

ImageWithCaption.defaultProps = {
  copy: '',
  lightbox: false,
};

export default ImageWithCaption;
