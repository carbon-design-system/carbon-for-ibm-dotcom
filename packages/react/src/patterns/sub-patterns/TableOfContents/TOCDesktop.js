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
 * @param {boolean} props.menuRule optional rule
 * @param {*} props.children children JSX Object
 * @returns {*} JSX Object
 */
const TOCDesktop = ({ menuItems, selectedId, menuRule, children }) => {
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
            className={classNames({
              [`${prefix}--tableofcontents__desktop__item`]: true,
              [`${prefix}--tableofcontents__desktop__item--active`]: isActive,
            })}>
            <a
              {...(isActive ? { 'aria-current': 'location' } : {})}
              onClick={e => handleOnClick(e, item.id)}
              href={`#${item.id}`}>
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

  return (
    <div
      className={`${prefix}--tableofcontents__desktop`}
      data-autoid={`${stablePrefix}--tableofcontents__desktop`}>
      {children ? (
        <div className={`${prefix}--tableofcontents__desktop__children`}>
          {children}
        </div>
      ) : null}
      {menuRule ? (
        <hr className={`${prefix}--tableofcontents__desktop__rule`} />
      ) : null}
      <ul>{renderMenuItems(menuItems, selectedId)}</ul>
    </div>
  );
};

TOCDesktop.propTypes = {
  menuItems: PropTypes.array,
  selectedId: PropTypes.string,
  menuRule: PropTypes.bool,
  children: PropTypes.any,
};

export default TOCDesktop;
