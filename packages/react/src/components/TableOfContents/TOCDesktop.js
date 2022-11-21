/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import smoothScroll from '@carbon/ibmdotcom-utilities/es/utilities/smoothScroll/smoothScroll';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * DesktopMenu Component.
 */
const TOCDesktop = ({ menuItems, selectedId }) => {
  /**
   * Render menu items
   *
   * @param {Array} items menu items array
   * @param {string} activeId selected item id
   * @returns {*} JSX Object
   */
  const renderMenuItems = (items, activeId) => {
    return items.map((item, index) => {
      if (item?.id !== 'menuLabel') {
        const isActive = activeId === item.id;
        return (
          <li
            key={index}
            data-autoid={`${stablePrefix}--tableofcontents__desktop__item-${item.id}`}
            className={classNames(`${prefix}--tableofcontents__desktop__item`, {
              [`${prefix}--tableofcontents__desktop__item--active`]: isActive,
            })}
          >
            <a
              {...(isActive ? { 'aria-current': 'location' } : {})}
              onClick={(e) => handleOnClick(e, item.id)}
              href={`#${item.id}`}
            >
              {item.title}
            </a>
          </li>
        );
      }
    });
  };

  /**
   * Handle OnClick
   *
   * @param {*} e event object
   * @param {*} id menu item id
   */
  const handleOnClick = (e, id) => {
    e.preventDefault();
    const selector = `a[name="${id}"]`;
    const masthead = e.target.ownerDocument.querySelector(
      `.${prefix}--masthead`
    );
    smoothScroll(null, selector, masthead?.offsetHeight);
    triggerFocus(selector);
  };

  /**
   * Trigger the focus on screen readers, so they can read the target paragraph
   *
   * @param {*} elem Selector to find the item
   */
  function triggerFocus(elem) {
    const element = document.querySelector(elem);

    const handleFocusOut = (event) => {
      const focusoutTarget = event.target;
      focusoutTarget.removeAttribute('tabindex');
    };

    element.setAttribute('tabindex', '0');
    element.focus({ preventScroll: true });
    element.addEventListener('focusout', handleFocusOut, {
      once: true,
    });
  }

  return (
    <div
      className={`${prefix}--tableofcontents__desktop`}
      data-autoid={`${stablePrefix}--tableofcontents__desktop`}
    >
      <ul>{renderMenuItems(menuItems, selectedId)}</ul>
    </div>
  );
};

TOCDesktop.propTypes = {
  /**
   * Array of menu item objects to render within the side nav.
   * Each items has the following structure:
   *
   * | Properties Name | Data Type | Description     |
   * | --------------- | --------- | --------------- |
   * | title           | String    | Menu title text |
   * | id              | String    | Menu id         |
   */
  menuItems: PropTypes.array,

  /**
   * Id of a menu item.
   */
  selectedId: PropTypes.string,
};

export default TOCDesktop;
