/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ButtonGroup } from '../../sub-patterns/ButtonGroup';
import LeadSpaceImage from './LeadSpaceImage';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the pattern classnames
 *
 * @param {string} variation variation of the pattern
 * @param {string} theme theme of the pattern
 * @param {string} type switches between centered or default
 * @returns {string} classnames
 */
const className = (variation, theme, type) =>
  classnames(
    `${prefix}--leadspace`,
    theme && `${prefix}--leadspace--${theme}`,
    {
      [`${prefix}--leadspace--productive`]: variation === 'productive',
    },
    {
      [`${prefix}--leadspace--centered${theme && '--g100'}`]:
        type === 'centered',
    }
  );

/**
 * @param {string} type returns centered or default
 * @param {string} element returns element name
 * @returns {string} classnames
 */
function centeredClassname(type, element) {
  if (type === 'centered') {
    return `${prefix}--leadspace--centered__${element}`;
  } else return `${prefix}--leadspace__${element}`;
}

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
  type,
  variation,
}) => (
  <section
    data-autoid={`${stablePrefix}--leadspace`}
    className={className(variation, theme, type)}>
    <div className={`${prefix}--leadspace__container`}>
      <div className={overlayClassname(gradient)}>
        <div className={`${prefix}--leadspace__row`}>
          <h1 className={centeredClassname(type, 'title')}>{title}</h1>
        </div>
        <div className={centeredClassname(type, 'content')}>
          {copy && (
            <div className={`${prefix}--leadspace__row`}>
              {copy && (
                <p
                  data-autoid={`${stablePrefix}--leadspace__desc`}
                  className={centeredClassname(type, 'desc')}>
                  {copy}
                </p>
              )}
            </div>
          )}
          {buttons && buttons.length > 0 && <ButtonGroup buttons={buttons} />}
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
  type: PropTypes.string,
  variation: PropTypes.string,
};

export default LeadSpace;
