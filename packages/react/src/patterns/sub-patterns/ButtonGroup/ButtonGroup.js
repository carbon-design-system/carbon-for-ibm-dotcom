/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints, baseFontSize } from '@carbon/layout';
import React, { useRef, useLayoutEffect } from 'react';
import Button from '../../../internal/vendor/carbon-components-react/components/Button/Button';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import root from 'window-or-global';
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
     * Sets the same width to all the elements inside an specific node passed as parameter
     *
     * @param {Node} parentNode the container of the elements to set the same width
     */
    const setSameWidth = parentNode => {
      const elements = Array.from(parentNode.childNodes);
      const getAllWidths = elements.map(element => element.offsetWidth);
      const biggestElement = Math.max.apply(null, getAllWidths);

      const smBreakpoint = parseFloat(breakpoints.sm.width) * baseFontSize;

      if (root.window.innerWidth <= smBreakpoint) {
        elements.forEach(element => (element.style.width = '100%'));
      }

      if (root.window.innerWidth > smBreakpoint) {
        elements.forEach(
          element => (element.style.width = `${biggestElement}px`)
        );
      }
    };

    /**
     * Sets the container direction between `row-reverse` and `column-reverse` depending on the child elements size
     *
     * @param {Node} parentNode the element to choose between `row-reverse` or `column-reverse`
     */
    const _stackElementsVertically = parentNode => {
      const containerWidth = parentNode.offsetWidth;
      const elements = Array.from(parentNode.childNodes);
      const getAllWidths = elements.map(element => {
        const marginRight = parseFloat(
          root.window.getComputedStyle(element)['margin-right']
        );
        return element.offsetWidth + marginRight;
      });
      const sumElementsWidth = getAllWidths.reduce(
        (prevEl, nextEl) => prevEl + nextEl
      );
      if (sumElementsWidth === containerWidth) {
        parentNode.style.flexDirection = 'column-reverse';
      }
      if (sumElementsWidth < containerWidth) {
        parentNode.style.flexDirection = 'row-reverse';
      }
    };

    setSameWidth(current);
    _stackElementsVertically(current);

    root.window.addEventListener(
      'resize',
      () => {
        root.window.requestAnimationFrame(() => {
          _stackElementsVertically(current);
          setSameWidth(current);
        });
      },
      true
    );

    return () =>
      root.window.removeEventListener('resize', () => {
        _stackElementsVertically(current);
        setSameWidth(current);
      });
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
