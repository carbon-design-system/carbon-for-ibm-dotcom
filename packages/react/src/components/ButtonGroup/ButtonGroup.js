/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';
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
 * @param {Array} props.buttons array of buttons
 * @returns {*} button components
 */
const ButtonGroup = ({ buttons }) => {
  const icons = {
    ArrowDown: ArrowDown20,
    ArrowRight: ArrowRight20,
    Pdf: Pdf20,
  };

  const buttonsRef = useRef(buttons.map(() => createRef()));

  return featureFlag(
    BUTTON_GROUP,
    <div
      className={`${prefix}--buttongroup`}
      data-autoid={`${stablePrefix}--buttongroup`}>
      {buttons.map((button, key) => {
        const renderIcon = button.renderArrow
          ? {
              renderIcon: ArrowRight20,
            }
          : {};
        return (
          <Button
            {...renderIcon}
            key={key}
            data-autoid={`${stablePrefix}--buttongroup-${key}`}
            renderIcon={icons[button.renderIcon]}
            href={button.link}
            ref={buttonsRef.current[key]}
            kind={key === 0 ? 'primary' : 'tertiary'}>
            {button.copy}
          </Button>
        );
      })}
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      renderIcon: PropTypes.string,
      renderArrow: PropTypes.bool,
    })
  ),
};

export default ButtonGroup;
