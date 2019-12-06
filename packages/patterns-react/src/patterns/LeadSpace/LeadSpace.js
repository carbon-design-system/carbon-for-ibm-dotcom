/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import {
  featureFlag,
  settings as ddsSettings,
} from '@carbon/ibmdotcom-utilities';
import { DDS_LEADSPACE } from '../../internal/FeatureFlags';
import LeadSpaceButtons from './LeadSpaceButtons';
import LeadSpaceImage from './LeadSpaceImage';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the pattern classnames
 *
 * @param {string} variation variation of the pattern
 * @param {string} theme theme of the pattern
 * @returns {string} classnames
 */
const className = (variation, theme) =>
  classnames(
    `${prefix}--leadspace`,
    theme && `${prefix}--leadspace--${theme}`,
    {
      [`${prefix}--leadspace--productive`]: variation === 'productive',
    }
  );

/**
 * renders the pattern classnames
 *
 * @param {boolean} gradient determines whether to render gradient
 * @returns {string} classnames
 */
const overlayClassname = gradient =>
  classnames(`${prefix}--leadspace__overlay`, {
    [`${prefix}--leadspace--gradient`]: gradient,
  });

/**
 * sorts images by breakpoints for the LeadSpaceImage component
 *
 * @param {object} images object with all the image srcs for diff breakpoints
 * @returns {Array} images sorted
 */
const sortImages = images => {
  return [
    {
      minWidth: 1056,
      url: images.default,
    },
    {
      minWidth: 672,
      url: images.tablet,
    },
    {
      minWidth: 0,
      url: images.mobile,
    },
  ];
};

/**
 * Lead space component (left-aligned)
 *
 * @param {object} props props object
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @param {string} props.copy lead space short copy to support the title
 * @param {boolean} props.gradient determines whether to render gradient overlay
 * @param {object} props.image image object with diff source for diff breakpoints
 * @param {string} props.theme theme of the pattern (g100 or white (default))
 * @param {string} props.title lead space title
 * @param {string} props.variation variation of the lead space (expressive (default) | productive)
 * @returns {*} Lead space component
 */
const LeadSpace = ({
  buttons,
  copy,
  gradient,
  image,
  theme,
  title,
  variation,
}) =>
  featureFlag(
    DDS_LEADSPACE,
    <section
      data-autoid={`${stablePrefix}--leadspace`}
      className={className(variation, theme)}>
      <div className={`${prefix}--leadspace__container`}>
        <div className={overlayClassname(gradient)}>
          <div className={`${prefix}--leadspace__row`}>
            <h1 className={`${prefix}--leadspace__title`}>{title}</h1>
          </div>
          <div className={`${prefix}--leadspace__content`}>
            {copy && (
              <div className={`${prefix}--leadspace__row`}>
                <p className={`${prefix}--leadspace__desc`}>{copy}</p>
              </div>
            )}
            {buttons && buttons.length > 0 && (
              <LeadSpaceButtons buttons={buttons} />
            )}
          </div>
        </div>
        {image && (
          <LeadSpaceImage
            images={sortImages(image)}
            defaultImage={image.default}
            alt={image.alt}
          />
        )}
      </div>
    </section>
  );

LeadSpace.propTypes = {
  buttons: PropTypes.array,
  copy: PropTypes.string,
  gradient: PropTypes.bool,
  image: PropTypes.shape({
    mobile: PropTypes.string,
    tablet: PropTypes.string,
    default: PropTypes.string,
    alt: PropTypes.string,
  }),
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  variation: PropTypes.string,
};

export default LeadSpace;
