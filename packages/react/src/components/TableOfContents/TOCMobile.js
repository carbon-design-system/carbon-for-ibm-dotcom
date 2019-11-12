/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { TableOfContents20 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import root from 'window-or-global';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Mobile Component
 *
 * @param {object} props props object
 * @param {object} props.menuItems menu items object
 * @param {string} props.selectedId id of a menu item
 * @param {string} props.menuLabel menu label for mobile menu
 * @param {*} props.updateState function to update parent state.
 * @returns {*} JSX Object
 */
const TOCMobile = ({ menuItems, selectedId, menuLabel, updateState }) => {
  /**
   * Handle onChange event of select
   *
   * @param {*} e event object
   */
  const handleChange = e => {
    const id = e.target.value;
    const filteredItems = menuItems.filter(menu => {
      return menu.id == id;
    });
    const title = filteredItems[0].title;
    updateState(id, title);
    document.querySelector(`a[name="${id}"]`).scrollIntoView(true);
    const scrolledY = root.scrollY;
    if (scrolledY) {
      root.scroll({
        top: scrolledY - 48,
        behavior: 'smooth',
      });
    }
  };

  /**
   * Handle OnBlur event
   *
   * @returns null
   */
  const handleOnBlur = () => {
    return null;
  };

  return (
    <div
      className={`${prefix}--tableofcontents__mobile`}
      data-autoid={`${stablePrefix}}--tableofcontents__mobile`}>
      <div className={`${prefix}--tableofcontents__mobile__select__wrapper`}>
        <select
          className={`${prefix}--tableofcontents__mobile__select`}
          value={selectedId}
          onBlur={handleOnBlur}
          onChange={e => handleChange(e)}>
          <option value={menuLabel}> {menuLabel}... </option>
          {renderOptions(menuItems)}
        </select>
        <TableOfContents20 aria-label="menu icon">
          <title>menu icon</title>
        </TableOfContents20>
      </div>
    </div>
  );
};

/**
 * Render options for select
 *
 * @param {Array} options menu item arrray
 * @returns {*} JSX Object
 */
const renderOptions = options => {
  return options.map(option => {
    if (option) {
      return (
        <option
          className={`${prefix}--tableofcontents__mobile__select__option`}
          data-autoid={`${stablePrefix}}--tableofcontents__mobile__select__option-${option.id}`}
          key={option.id}
          value={option.id}>
          {option.title}
        </option>
      );
    }
  });
};

TOCMobile.propTypes = {
  menuItems: PropTypes.array,
  selectedId: PropTypes.string,
  menuLabel: PropTypes.string,
  updateState: PropTypes.func,
};

export default TOCMobile;
