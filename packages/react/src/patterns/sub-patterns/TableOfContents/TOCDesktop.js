/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { smoothScroll } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * DesktopMenu Component
 *
 * @param {object} props props object
 * @param {Array} props.menuItems menu items object
 * @param {string} props.selectedId id of a menu item
 * @param {*} props.updateState function to update parent state.
 * @returns {*} JSX Object
 */
const TOCDesktop = ({ menuItems, selectedId, updateState }) => {
  /**
   * Render menu items
   *
   * @param {Array} items menu items array
   * @param {string} activeId selected item id
   * @returns {*} JSX Object
   */
  const renderMenuItems = (items, activeId) => {
    return items.map((item, index) => {
      if (item && item.id !== 'menuLabel') {
        return (
          <li
            key={index}
            data-autoid={`${stablePrefix}--tableofcontents__desktop__item-${item.id}`}
            className={classNames(
              `${prefix}--tableofcontents__desktop__item`,
              setActiveClass(activeId, item.id)
            )}>
            <a onClick={e => handleOnClick(e, item.id)} href={`#${item.id}`}>
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
    const filteredItems = menuItems.filter(menu => {
      return menu.id === id;
    });
    const title = filteredItems[0].title;
    updateState(id, title);
    const selector = `a[name="${id}"]`;
    smoothScroll(null, selector);
    triggerFocus(selector);
  };

  /**
   * Trigger the focus on screen readers, so they can read the target paragraph
   *
   * @param {*} elem Selector to find the item
   */
  function triggerFocus(elem) {
    const element = document.querySelector(elem);
    element.setAttribute('tabindex', '0');
    element.focus({ preventScroll: true });
    element.removeAttribute('tabindex');
  }

  /**
   * Set class name for active menu item
   *
   * @param {string} activeId selected menu item id
   * @param {string} menuId menu item id
   * @returns {string} css class name for active menu item
   */
  const setActiveClass = (activeId, menuId) => {
    let active;
    active =
      activeId === menuId
        ? `${prefix}--tableofcontents__desktop__item--active`
        : '';
    return active;
  };

  return (
    <div
      className={`${prefix}--tableofcontents__desktop`}
      data-autoid={`${stablePrefix}--tableofcontents__desktop`}>
      <ul>{renderMenuItems(menuItems, selectedId)}</ul>
    </div>
  );
};

TOCDesktop.propTypes = {
  menuItems: PropTypes.array,
  selectedId: PropTypes.string,
  updateState: PropTypes.func,
};

export default TOCDesktop;
