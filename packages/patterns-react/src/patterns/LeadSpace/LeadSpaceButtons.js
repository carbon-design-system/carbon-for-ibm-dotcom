/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import { settings } from 'carbon-components';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders the buttons (max 2 buttons)
 *
 * @param {object} props props object
 * @param {Array} props.buttons array of buttons for lead space (max 2 buttons)
 * @returns {*} button components
 */
const ButtonGroup = ({ buttons }) => {
  const iconMap = new Map([
    ['ArrowRight', ArrowRight20],
    ['ArrowDown', ArrowDown20],
    ['Pdf', Pdf20],
  ]);
  return (
    <div className={`${prefix}--leadspace__row`}>
      <div className={`${prefix}--leadspace__ctas`}>
        {buttons.map((button, key) => {
          if (key > 1) return;
          const renderIcon = button.renderArrow
            ? {
                renderIcon: ArrowRight20,
              }
            : {};
          return (
            <Button
              {...renderIcon}
              key={key}
              data-autoid={`${stablePrefix}--leadspace__cta-${key}`}
              renderIcon={iconMap.get(button.renderIcon)}
              href={button.link}
              kind={key === 0 ? 'primary' : 'tertiary'}>
              {button.copy}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.array,
};

export default ButtonGroup;
