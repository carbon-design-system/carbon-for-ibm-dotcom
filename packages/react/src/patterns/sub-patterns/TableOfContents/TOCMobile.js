/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import { smoothScroll } from '@carbon/ibmdotcom-utilities';
import TableOfContents20 from '@carbon/icons-react/es/table-of-contents/20';

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
  const [selectedOption, setSelectedOption] = useState('menuLabel');

  useEffect(() => {
    setSelectedOption(selectedId);
  }, [selectedId]);

  /**
   * Handle onChange event of select
   *
   * @param {*} e event object
   */
  const handleChange = e => {
    const id = e.target.value;
    const filteredItems = menuItems.filter(menu => {
      return menu.id === id;
    });
    const title = filteredItems[0].title;
    updateState(id, title);
    const selector = `a[name="${id}"]`;
    smoothScroll(null, selector, 50);
  };

  /**
   * Handle OnBlur event
   *
   * @returns {null} Returns null for blur events
   */
  const handleOnBlur = () => {
    return null;
  };

  return (
    <div
      className={`${prefix}--tableofcontents__mobile`}
      data-autoid={`${stablePrefix}--tableofcontents__mobile`}>
      <div className={`${prefix}--tableofcontents__mobile__select__wrapper`}>
        <select
          className={`${prefix}--tableofcontents__mobile__select`}
          onBlur={handleOnBlur}
          value={selectedOption}
          onChange={e => handleChange(e)}>
          {renderOptions(menuItems, menuLabel)}
        </select>
        <TableOfContents20
          className={`${prefix}--tableofcontents__mobile__select__icon`}
          aria-label="menu icon">
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
 * @param {Array} label menu label
 * @returns {*} JSX Object
 */
const renderOptions = (options, label) => {
  const labelObj = {
    title: `${label} ...`,
    id: 'menuLabel',
  };
  options.findIndex(x => x.id === labelObj.id) === -1
    ? options.unshift(labelObj)
    : null;
  return options.map((option, index) => {
    if (option) {
      return (
        <option
          className={`${prefix}--tableofcontents__mobile__select__option`}
          data-autoid={`${stablePrefix}}--tableofcontents__mobile__select__option-${option.id}`}
          key={index}
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
