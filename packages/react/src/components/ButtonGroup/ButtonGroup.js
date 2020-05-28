/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useLayoutEffect, useRef } from 'react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Button group.
 */
const ButtonGroup = ({ buttons }) => {
  const orderedList = useRef(null);

  useLayoutEffect(() => {
    const { current } = orderedList;

    /**
     * Utility to give all the elements the same width, using the wilder one as reference for the others
     *
     * @param {Node} parentNode - the element
     */
    const sameWidth = parentNode => {
      const elements = Array.from(parentNode.childNodes);
      const elementsObserver = new ResizeObserver(entries => {
        const getWidths = entries.map(entry => entry.contentRect.width);
        const wilderButton = Math.max.apply(null, getWidths);
        elements.forEach(
          element => (element.style.width = `${wilderButton}px`)
        );
      });

      elements.map(element => elementsObserver.observe(element));
    };

    sameWidth(current);
  }, []);

  return (
    <ol
      className={`${prefix}--buttongroup`}
      data-autoid={`${stablePrefix}--button-group`}
      ref={orderedList}>
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
};

ButtonGroup.propTypes = {
  /**
   * Array of button objects to render.
   * Use the following for each items:
   *
   * | Name         | Data Type | Description                                                                                                                    |
   * | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
   * | `href`       | String    | URL for the button item                                                                                                        |
   * | `copy`       | String    | Button copy                                                                                                                    |
   * | `renderIcon` | Object    | Provide an optional icon for the CTA from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
   *
   * Visit the [Button documentation](http://react.carbondesignsystem.com/?path=/story/buttons--default)
   * from Carbon for a full list of available props.
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      copy: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      renderIcon: PropTypes.elementType,
    })
  ),
};

export default ButtonGroup;
