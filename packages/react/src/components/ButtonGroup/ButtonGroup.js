/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Button group.
 */
const ButtonGroup = ({ buttons }) => {
  const groupRef = useRef(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.style.setProperty(
        `--${stablePrefix}--button-group--item-count`,
        String(buttons.length)
      );
    }
  }, [buttons]);

  return (
    <ol
      className={`${prefix}--buttongroup`}
      data-autoid={`${stablePrefix}--button-group`}
      ref={groupRef}>
      {buttons.map((button, key) => {
        return (
          <li key={key} className={`${prefix}--buttongroup-item`}>
            <Button
              data-autoid={`${stablePrefix}--button-group-${key}`}
              isExpressive
              {...button}
              type="button"
              kind={key === buttons.length - 1 ? 'primary' : 'tertiary'}>
              {button.copy}
            </Button>
          </li>
        );
      })}
    </ol>
  );
};

ButtonGroup.propTypes = {
  /**
   * Array of button objects to render.
   * Use the following for each items:
   *
   * | Name         | Data Type | Description                                                                                                                    |
   * | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
   * | `href`       | String    | URL for the button item                                                                                                        |
   * | `onClick`    | Function  | Function triggered on click of button                                                                                          |
   * | `copy`       | String    | Button copy                                                                                                                    |
   * | `renderIcon` | Object    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
   *
   * Visit the [Button documentation](http://react.carbondesignsystem.com/?path=/story/buttons--default)
   * from Carbon for a full list of available props.
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      renderIcon: PropTypes.elementType,
    })
  ).isRequired,
};

export default ButtonGroup;
