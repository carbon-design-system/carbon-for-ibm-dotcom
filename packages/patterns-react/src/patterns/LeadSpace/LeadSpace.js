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
    console.log('Button', <Button />);
    return (
      <Button
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
 * @param {string} props.imageUrl lead space image
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @returns {*} Lead space component
 */
const LeadSpace = ({ variation, title, copy, buttons, imageUrl }) => (
  <div
    className={classnames(`${prefix}--leadspace`, {
      [`${prefix}--leadspace--productive`]: variation === 'productive',
    })}>
    <img className={`${prefix}--leadspace__image`} src={imageUrl} alt="" />
    <div className={`${prefix}--leadspace__content-container`}>
      <h1>{title}</h1>
      <div className={`${prefix}--leadspace__content`}>
        <p>{copy}</p>
        <div>{renderButtons(buttons)}</div>
      </div>
    </div>
  </div>
);

LeadSpace.propTypes = {
  buttons: PropTypes.array,
  copy: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  variation: PropTypes.string,
};

export default LeadSpace;
