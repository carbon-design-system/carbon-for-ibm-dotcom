/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ButtonGroup } from '../../components/ButtonGroup';
import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders main class name
 *
 * @param {string} type switches between centered or default
 * @param {object} image image object
 * @param {string} theme theme of the pattern
 * @returns {string} classnames
 */
const classNames = (type, image, theme) => {
  return classnames(`${prefix}--leadspace__section`, {
    [`${prefix}--leadspace--${theme}`]: theme,
    [`${prefix}--leadspace--centered`]: type === 'centered',
    [`${prefix}--leadspace--centered__image`]: image && type === 'centered',
    [`${prefix}--leadspace--productive`]: type === 'small',
  });
};

/**
 *
 * @param {string} type type
 * @param {object} image image
 * @returns {object} returns either image component or the centered image div
 */
function imageClassname(type, image) {
  if (type === 'centered') {
    return (
      <div
        data-autoid={`${stablePrefix}--leadspace--centered--mobile__image`}
        className={`${prefix}--leadspace--centered--mobile__image`}>
        <img src={image.defaultSrc} alt={image.alt} />
      </div>
    );
  } else return <Image {...image} />;
}

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
 * @param {string} props.type type of lead space
 * @returns {*} Lead space component
 */
const LeadSpace = ({ buttons, copy, gradient, image, theme, title, type }) => {
  const background = image && {
    backgroundImage: `url(${image.defaultSrc})`,
  };
  return (
    <div
      data-autoid={`${stablePrefix}--leadspace`}
      className={`${prefix}--leadspace`}>
      <section style={background} className={classNames(type, image, theme)}>
        <div className={`${prefix}--leadspace__container`}>
          <div
            className={classnames(`${prefix}--leadspace__overlay`, {
              [`${prefix}--leadspace--gradient`]: gradient,
            })}>
            <div className={`${prefix}--leadspace--content__container`}>
              <div className={`${prefix}--leadspace__row`}>
                <h1 className={`${prefix}--leadspace__title`}>{title}</h1>
              </div>
              <div className={`${prefix}--leadspace__content`}>
                {copy && (
                  <div className={`${prefix}--leadspace__row`}>
                    <p
                      data-autoid={`${stablePrefix}--leadspace__desc`}
                      className={`${prefix}--leadspace__desc`}>
                      {copy}
                    </p>
                  </div>
                )}
                {buttons && buttons.length > 0 && (
                  <ButtonGroup buttons={buttons} />
                )}
              </div>
            </div>
          </div>
          {image && imageClassname(type, image)}
        </div>
      </section>
    </div>
  );
};

LeadSpace.propTypes = {
  /**
   * Array of button objects to render (max 2).
   * See [`<ButtonGroup>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-buttongroup--default#button-item) for full usage details.
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      renderIcon: PropTypes.elementType,
    })
  ),

  /**
   * Short copy of LeadSpace.
   */
  copy: PropTypes.string,

  /**
   * `true` to render overlay gradient.
   */
  gradient: PropTypes.bool,

  /**
   * Object with different ratio options for corresponding breakpoints.
   * See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details.
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
  }),

  /**
   * Color theme of LeadSpace. Choose from:
   *
   * | Name    | Data Type | Description           |
   * | ------- | --------- | --------------------- |
   * | `white` | String    | Carbon White theme    |
   * | `g100`  | String    | Carbon Gray 100 theme |
   */
  theme: PropTypes.oneOf(['white', 'g100']),

  /**
   * Title of LeadSpace.
   */
  title: PropTypes.string.isRequired,

  /**
   * Sets the type of Leadspace layout. Choose from:
   *
   * | Name              | Data Type | Description                                       |
   * | ----------------- | --------- | ------------------------------------------------- |
   * | `small`/`default` | String    | Left-aligned - small style of the leadspace title |
   * | `left`            | String    | Left-aligned - large style of the leadspace title |
   * | `centered`        | String    | Centered type of the LeadSpace                    |
   */
  type: PropTypes.oneOf(['small', 'left', 'centered']),
};

export default LeadSpace;
