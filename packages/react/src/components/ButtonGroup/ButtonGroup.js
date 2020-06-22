/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Button from '../../internal/vendor/carbon-components-react/components/Button/Button';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Button group.
 */
const ButtonGroup = ({ buttons, enableSizeByContent }) => {
  const groupRef = useRef(null);
  const observedPseudoButtonNodesRef = useRef(new Set());
  const shouldUseResizeObserver =
    enableSizeByContent && typeof ResizeObserver !== 'undefined';
  const resizeObserverButtonsRef = useRef(
    !shouldUseResizeObserver
      ? null
      : new ResizeObserver(entries => {
          const groups = entries.reduce((acc, entry) => {
            const group = entry.target.closest('.bx--buttongroup');
            if (group) {
              acc.add(group);
            }
            return acc;
          }, new Set());
          groups.forEach(group => {
            const width = Array.prototype.reduce.call(
              group.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn'),
              (acc, item) => Math.max(acc, item.offsetWidth),
              0
            );
            const height = Array.prototype.reduce.call(
              group.querySelectorAll('.bx--buttongroup-item--pseudo .bx--btn'),
              (acc, item) => Math.max(acc, item.offsetHeight),
              0
            );
            const hasWordWrap = height > 48;
            Array.prototype.forEach.call(
              group.querySelectorAll(
                '.bx--buttongroup-item:not(.bx--buttongroup-item--pseudo) .bx--btn'
              ),
              item => {
                item.style.width = `${width + 1}px`;
                item.classList.toggle(`${prefix}--btn--multiline`, hasWordWrap);
              }
            );
          });
        })
  );

  useLayoutEffect(() => {
    const { current: observedPseudoButtonNodes } = observedPseudoButtonNodesRef;
    const { current: resizeObserverButtons } = resizeObserverButtonsRef;

    if (shouldUseResizeObserver) {
      const { current: groupNode } = groupRef;

      observedPseudoButtonNodes.forEach(item => {
        if (!groupNode.contains(item)) {
          resizeObserverButtons.unobserve(item);
          observedPseudoButtonNodes.delete(item);
        }
      });

      const latestPseudoButtonNodes = groupNode.querySelectorAll(
        '.bx--buttongroup-item--pseudo .bx--btn'
      );
      Array.prototype.forEach.call(latestPseudoButtonNodes, item => {
        if (!observedPseudoButtonNodes.has(item)) {
          resizeObserverButtons.observe(item);
          observedPseudoButtonNodes.add(item);
        }
      });
    } else {
      observedPseudoButtonNodes.forEach(item => {
        resizeObserverButtons.unobserve(item);
        observedPseudoButtonNodes.delete(item);
      });
    }
  }, [buttons, shouldUseResizeObserver]);

  useEffect(() => {
    return () => {
      const { current: resizeObserverButtons } = resizeObserverButtonsRef;
      if (resizeObserverButtons) {
        resizeObserverButtons.disconnect();
      }
    };
  }, []);

  return (
    <ol
      className={`${prefix}--buttongroup`}
      data-autoid={`${stablePrefix}--button-group`}
      ref={groupRef}>
      {buttons.map((button, key) => {
        return (
          <>
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
            {!shouldUseResizeObserver ? (
              undefined
            ) : (
              <li
                key={`${key}-pseudo`}
                className={`${prefix}--buttongroup-item ${prefix}--buttongroup-item--pseudo`}>
                <Button
                  tabIndex={-1}
                  {...button}
                  type="button"
                  kind={key === 0 ? 'primary' : 'tertiary'}>
                  {button.copy}
                </Button>
              </li>
            )}
          </>
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
  ).isRequired,

  /**
   * `true` to make the buttons change their sizes by their contents.
   */
  enableSizeByContent: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  enableSizeByContent: true,
};

export default ButtonGroup;
