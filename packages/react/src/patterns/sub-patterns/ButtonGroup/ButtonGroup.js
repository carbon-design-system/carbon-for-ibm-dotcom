/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button from '../../../internal/vendor/carbon-components-react/components/Button/Button';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the buttons
 *
 * @param {object} props props object
 * @param {Array.<{copy: string}>} props.buttons array of buttons
 * @param {string} props.buttons[].copy Button copy
 * @param {string} props.buttons[].href URL for the button item
 * @param {object} props.buttons[].renderIcon Optional icon type
 * @returns {*} button components
 */
const ButtonGroup = ({ buttons }) => (
  <ol
    className={`${prefix}--buttongroup`}
    data-autoid={`${stablePrefix}--button-group`}>
    {buttons.map((button, key) => {
      return (
        <li key={key} className={`${prefix}--buttongroup-item`}>
          <Button
            tabIndex={key === 0 ? 2 : 1}
            data-autoid={`${stablePrefix}--button-group-${key}`}
            {...button}
            type="button"
            kind={key === 0 ? 'primary' : 'tertiary'}>
            {button.copy}
          </Button>
        </li>
      );
    })}
  </ol>
);

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      renderIcon: PropTypes.object,
    })
  ),
};

export default ButtonGroup;
