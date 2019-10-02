/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useLayoutEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import root from 'window-or-global';
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
  const icons = {
    ArrowDown: ArrowDown20,
    ArrowRight: ArrowRight20,
    Pdf: Pdf20,
  };

  const buttonsRef = useRef(buttons.map(() => createRef()));

  /**
   * ensure buttons have equal width, based off the
   * largest width of the two
   */
  function adjustWidths() {
    const button1 = buttonsRef.current[0];
    const button2 = buttonsRef.current[1];

    button1.current.offsetWidth > button2.current.offsetWidth
      ? (button2.current.style.width = `${button1.current.offsetWidth}px`)
      : (button1.current.style.width = `${button2.current.offsetWidth}px`);
  }

  useLayoutEffect(() => {
    if (buttonsRef.current.length > 1) {
      console.log('innerWidth', root.innerWidth);
      root.addEventListener('load', adjustWidths);
      root.addEventListener('resize', adjustWidths);
    }
    return () => {
      root.removeEventListener('load', adjustWidths);
      root.removeEventListener('resize', adjustWidths);
    };
  }, []);

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
              renderIcon={icons[button.renderIcon]}
              href={button.link}
              ref={buttonsRef.current[key]}
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
