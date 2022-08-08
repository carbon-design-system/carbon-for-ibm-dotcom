/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ButtonGroup } from '../../components/ButtonGroup';
import classnames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate.js';
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
 * @param {string} theme theme of the pattern
 * @returns {string} classnames
 */
const classNames = (type, theme) => {
  return classnames(`${prefix}--leadspace__section`, {
    [`${prefix}--leadspace--${theme}`]: theme,
    [`${prefix}--leadspace--centered`]: type === 'centered',
    [`${prefix}--leadspace--productive`]: type === 'small',
  });
};

/**
 *
 * @param {object} image image
 * @returns {object} returns either image component or the centered image div
 */
function imageClassname(image) {
  return <Image {...image} />;
}

/**
 * Lead space component (left-aligned)
 *
 * @param {object} props props object
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @param {string} props.copy lead space short copy to support the title
 * @param {object} props.image image object with diff source for diff breakpoints
 * @param {string} props.theme theme of the pattern (g100 or white (default))
 * @param {string} props.title lead space title
 * @param {string} props.type type of lead space
 * @returns {*} Lead space component
 */

const LeadSpace = ({
  buttons,
  copy,
  image,
  theme,
  title,
  type,
  size = 'tall',
}) => {
  return (
    <div
      data-autoid={`${stablePrefix}--leadspace`}
      className={classnames(`${prefix}--leadspace`, {
        [`${prefix}--leadspace--medium`]: size === 'medium',
        [`${prefix}--leadspace--tall`]: size === 'tall',
        [`${prefix}--leadspace--super`]: size === 'super',
      })}>
      <section className={classNames(type, theme)}>
        <div className={`${prefix}--leadspace__container`}>
          <div
            className={classnames(`${prefix}--leadspace__overlay`, {
              [`${prefix}--leadspace--gradient`]: image && image.defaultSrc,
            })}>
            {image && image.defaultSrc === true ? (
              undefined
            ) : (
              <svg
                className={`${prefix}--leadspace__gradient`}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                  <linearGradient
                    id="stops"
                    className={`${prefix}--leadspace__gradient__stops`}
                    gradientTransform={type === 'centered' ? 'rotate(90)' : ''}>
                    {type === 'centered' ? (
                      <>
                        <stop offset="0%" />
                        <stop offset="54%" />
                        <stop offset="77%" />
                        <stop offset="100%" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" />
                        <stop offset="25%" />
                        <stop offset="50%" />
                        <stop offset="75%" />
                      </>
                    )}
                  </linearGradient>
                </defs>
                <rect
                  className={`${prefix}--leadspace__gradient__rect`}
                  width="100"
                  height="100"
                />
              </svg>
            )}
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
          {image && imageClassname(image)}
        </div>
      </section>
    </div>
  );
};

LeadSpace.propTypes = {
  /**
   * Array of button objects to render (max 2).
   * See [`<ButtonGroup>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-buttongroup--default#button-item) for full usage details.
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
   * Object with different ratio options for corresponding breakpoints.
   * See [`<Image>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-image--default#props) for full usage details.
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
   * | `g10`   | String    | Carbon Gray 10 theme  |
   * | `g90`   | String    | Carbon Gray 90 theme  |
   * | `g100`  | String    | Carbon Gray 100 theme |
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Title of LeadSpace.
   */
  title: PropTypes.string.isRequired,

  /**
   * Sets the type of Leadspace layout. Choose from:
   *
   * | Name              | Data Type | Description                                         |
   * | ----------------- | --------- | --------------------------------------------------- |
   * | `default`         | String    | Left-aligned - default style of the leadspace title |
   * | `left`            | String    | Left-aligned - large style of the leadspace title   |
   * | `centered`        | String    | Centered type of the LeadSpace                      |
   */
  type: PropTypes.oneOf(['default', 'left', 'centered']),
  /**
   * | Name         | Data Type | Description                           |
   * |--------------|-----------|---------------------------------------|
   * | `tall`/empty | String/-- | Default - tall size of the leadspace  |
   * | `medium`     | String    | Medium - medium size of the leadspace |
   * | `super`      | String    | Super - super size of the leadspace   |
   */
  size: PropTypes.oneOf(['tall', 'medium', 'super']),
};

export default deprecate(
  LeadSpace,
  `
  The Leadspace Small and Leadspace Small With Image variations are now deprecated.
  Please refer to the Carbon for IBM.com documentation for further details.
  https://www.ibm.com/standards/carbon/components/leadspace
`
);
