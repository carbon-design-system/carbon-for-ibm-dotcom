/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { ArrowRight20 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';

const { prefix } = settings;

/**
 * renders the buttons (max 2 buttons)
 *
 * @param {Array} buttons array of buttons
 * @returns {*} button components
 */
function renderButtons(buttons) {
  return buttons.map((button, key) => {
    if (key > 1) return;
    return (
      <Button
        data-autoid={`leadspace__cta-${key}`}
        renderIcon={button.renderArrow && ArrowRight20}
        href={button.link}
        kind={key === 0 ? 'primary' : 'tertiary'}>
        {button.copy}
      </Button>
    );
  });
}

/**
 * Lead space component
 *
 * @param {object} props props object
 * @param {string} props.variation variation of the lead space (expressive (default) or productive)
 * @param {string} props.title lead space title
 * @param {string} props.copy lead space short copy to support the title
 * @param {object} props.image image object with diff source for diff breakpoints
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @returns {*} Lead space component
 */
const LeadSpace = ({ variation, title, copy, buttons, image }) => (
  <section
    data-autoid="leadspace"
    className={classnames(`${prefix}--leadspace`, {
      [`${prefix}--leadspace--productive`]: variation === 'productive',
    })}>
    <div className={`${prefix}--leadspace__container`}>
      <picture>
        <source media="(min-width: 1056px)" srcset={image.default} />
        <source media="(min-width: 672px)" srcset={image.tablet} />
        <source media="(min-width: 0px)" srcset={image.mobile} />
        <img
          className={`${prefix}--leadspace__image`}
          src={image.default}
          alt={image.alt}
        />
      </picture>
      <div className={`${prefix}--leadspace__overlay`}>
        <h1>{title}</h1>
        <div className={`${prefix}--leadspace__content`}>
          <p>{copy}</p>
          <div className={`${prefix}--leadspace__ctas`}>
            {renderButtons(buttons)}
          </div>
        </div>
      </div>
    </div>
  </section>
);

LeadSpace.propTypes = {
  buttons: PropTypes.array,
  copy: PropTypes.string,
  image: PropTypes.shape({
    mobile: PropTypes.string,
    tablet: PropTypes.string,
    default: PropTypes.string,
    alt: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  variation: PropTypes.string,
};

export default LeadSpace;
