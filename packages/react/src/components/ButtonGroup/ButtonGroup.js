/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { BUTTON_GROUP } from '../../internal/FeatureFlags';
import {
  featureFlag,
  settings as ddsSettings,
} from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the buttons
 *
 * @param {object} props props object
 * @param {Array.<{copy: string}>} props.buttons array of buttons
 * @param {string} props.buttons[].copy Button copy
 * @param {string} props.buttons[].link URL for the button item
 * @param {object} props.buttons[].renderIcon Optional icon type
 * @returns {*} button components
 */
const ButtonGroup = ({ buttons }) => {
  return featureFlag(
    BUTTON_GROUP,
    <ol
      className={`${prefix}--buttongroup`}
      data-autoid={`${stablePrefix}--button-group`}>
      {buttons.map((button, key) => {
        return (
          <li className={`${prefix}--buttongroup-item`}>
            <Button
              key={key}
              data-autoid={`${stablePrefix}--button-group-${key}`}
              {...button}
              renderIcon={button.renderIcon || null}
              kind={key === 0 ? 'primary' : 'tertiary'}>
              {button.copy}
            </Button>
          </li>
        );
      })}
    </ol>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      renderIcon: PropTypes.element,
    })
  ),
};

export default ButtonGroup;
