/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import {
  featureFlag,
  settings as ddsSettings,
} from '@carbon/ibmdotcom-utilities';
import { LEADSPACE_CENTERED } from '../../internal/FeatureFlags';
import LeadSpaceButtons from '../LeadSpace/LeadSpaceButtons';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the pattern classnames
 *
 * @param {string} image image url
 * @returns {string} classnames
 */
const className = image =>
  classnames(`${prefix}--leadspace--centered`, {
    [`${prefix}--leadspace--centered__image`]: image,
  });

/**
 * renders the pattern classnames
 *
 * @param {boolean} gradient determines whether to render gradient
 * @returns {string} classnames
 */
const overlayClassname = gradient =>
  classnames(`${prefix}--leadspace--centered__overlay`, {
    [`${prefix}--leadspace--centered--gradient`]: gradient,
  });

/**
 * Lead space component
 *
 * @param {object} props props object
 * @param {string} props.title lead space title
 * @param {string} props.copy lead space short copy to support the title
 * @param {boolean} props.gradient determines whether to render gradient overlay
 * @param {object} props.image image object with diff source for diff breakpoints
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @returns {*} Lead space component
 */
const LeadSpaceCentered = ({ title, copy, buttons, image, gradient }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 671;

  /**
   *  Sets the window width
   */
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const background =
    image && !isMobile
      ? { backgroundImage: `url(${image})` }
      : { backgroundImage: 'none' };

  return featureFlag(
    LEADSPACE_CENTERED,
    <section
      style={background}
      data-autoid={`${stablePrefix}--leadspace--centered`}
      className={className(image)}>
      <div className={overlayClassname(gradient)}>
        <div className={`${prefix}--leadspace--centered__content`}>
          <h1 className={`${prefix}--leadspace--centered__title`}>{title}</h1>
          <p className={`${prefix}--leadspace--centered__desc`}>{copy}</p>
          {buttons && buttons.length > 0 && (
            <LeadSpaceButtons
              classname={`${prefix}--leadspace--centered`}
              buttons={buttons}
            />
          )}
        </div>
      </div>
      {image && (
        <div className={`${prefix}--leadspace--centered--mobile__image`}>
          <img src={image} alt="" />
        </div>
      )}
    </section>
  );
};

LeadSpaceCentered.propTypes = {
  buttons: PropTypes.array,
  copy: PropTypes.string,
  image: PropTypes.shape({
    mobile: PropTypes.string,
    tablet: PropTypes.string,
    default: PropTypes.string,
    alt: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  gradient: PropTypes.bool,
};

export default LeadSpaceCentered;
