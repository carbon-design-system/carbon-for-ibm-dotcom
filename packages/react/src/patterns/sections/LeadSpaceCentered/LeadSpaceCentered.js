/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  settings as ddsSettings,
  featureFlag,
} from '@carbon/ibmdotcom-utilities';
import React, { useEffect, useState } from 'react';
import { ButtonGroup } from '../../sub-patterns/ButtonGroup';
import classnames from 'classnames';
import { DDS_LEADSPACE_CENTERED } from '../../../internal/FeatureFlags';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the pattern classnames
 *
 * @param {string} image image url
 * @param {string} theme theme of the pattern
 * @returns {string} classnames
 */
const className = (image, theme) =>
  classnames(
    `${prefix}--leadspace--centered`,
    theme && `${prefix}--leadspace--centered--${theme}`,
    {
      [`${prefix}--leadspace--centered__image`]: image,
    }
  );

/**
 * renders the pattern classnames
 *
 * @param {boolean} gradient determines whether to render gradient
 * @returns {string} classnames
 */
const overlayClassname = gradient =>
  classnames(`${prefix}--leadspace--centered__overlay`, {
    [`${prefix}--leadspace--centered__gradient`]: gradient,
  });

/**
 * Lead space component
 *
 * @param {object} props props object
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @param {string} props.copy lead space short copy to support the title
 * @param {boolean} props.gradient determines whether to render gradient overlay
 * @param {object} props.image image object with diff source for diff breakpoints
 * @param {string} props.theme theme of the pattern
 * @param {string} props.title lead space title
 * @returns {*} Lead space component
 */
const LeadSpaceCentered = ({
  buttons,
  copy,
  gradient,
  image,
  theme,
  title,
}) => {
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
      ? { backgroundImage: `url(${image.url})` }
      : { backgroundImage: 'none' };

  return featureFlag(
    DDS_LEADSPACE_CENTERED,
    <section
      style={background}
      data-autoid={`${stablePrefix}--leadspace--centered`}
      className={className(image, theme)}>
      <div className={overlayClassname(gradient)}>
        <div className={`${prefix}--leadspace--centered__content`}>
          <h1 className={`${prefix}--leadspace--centered__title`}>{title}</h1>
          <p
            data-autoid={`${stablePrefix}--leadspace--centered__desc`}
            className={`${prefix}--leadspace--centered__desc`}>
            {copy}
          </p>
          {buttons && buttons.length > 0 && <ButtonGroup buttons={buttons} />}
        </div>
      </div>
      {image && (
        <div
          data-autoid={`${stablePrefix}--leadspace--centered--mobile__image`}
          className={`${prefix}--leadspace--centered--mobile__image`}>
          <img src={image.url} alt={image.alt} />
        </div>
      )}
    </section>
  );
};

LeadSpaceCentered.propTypes = {
  buttons: PropTypes.array,
  copy: PropTypes.string,
  gradient: PropTypes.bool,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default LeadSpaceCentered;
