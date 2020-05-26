/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ButtonGroup } from '../../sub-patterns/ButtonGroup';
import classnames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the pattern classnames
 *
 * @param {string} theme theme of the pattern
 * @param {string} type switches between centered or default
 * @param {object} image object
 * @returns {string} classnames
 */
const className = (theme, type, image) => {
  const mainClassName = `${prefix}--leadspace${
    type === 'centered' ? '--centered' : ''
  }`;
  return classnames(
    mainClassName,
    theme && `${mainClassName}--${theme}`,
    {
      [`${prefix}--leadspace--productive`]: type === 'small',
    },
    {
      [`${prefix}--leadspace--centered__image`]: image && type === 'centered',
    }
  );
};

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
 *
 * @param {string} type returns centered or default
 * @param {string} gradient gradient
 * @returns {object} gradient
 */
function newoverlayClassname(type, gradient) {
  if (type === 'centered') {
    return classnames(`${prefix}--leadspace--centered__overlay`, {
      [`${prefix}--leadspace--centered__gradient`]: gradient,
    });
  } else
    return classnames(`${prefix}--leadspace__overlay`, {
      [`${prefix}--leadspace--gradient`]: gradient,
    });
}
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
    <section
      style={background}
      data-autoid={`${stablePrefix}--leadspace`}
      className={className(theme, type, image)}>
      <div className={centeredClassname(type, 'container')}>
        <div className={newoverlayClassname(type, gradient)}>
          <div
            className={
              type !== 'centered'
                ? `${prefix}--leadspace--content__container`
                : `${prefix}--leadspace--centered--content__container`
            }>
            <div className={centeredClassname(type, 'row')}>
              <h1 className={centeredClassname(type, 'title')}>{title}</h1>
            </div>
            <div className={`${prefix}--leadspace__content`}>
              {copy && (
                <div className={centeredClassname(type, 'row')}>
                  {copy && (
                    <p
                      data-autoid={`${stablePrefix}--leadspace__desc`}
                      className={centeredClassname(type, 'desc')}>
                      {copy}
                    </p>
                  )}
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
  );
};

LeadSpace.propTypes = {
  /**
   * Array of button objects to render (max 2).
   * See [`<ButtonGroup>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterns-buttongroup--default#button-item) for full usage details.
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
  image: PropTypes.shape(
    PropTypes.shape({
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
    })
  ),

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
