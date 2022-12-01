/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import smoothScroll from '@carbon/ibmdotcom-utilities/es/utilities/smoothScroll/smoothScroll';
import TableOfContents20 from '@carbon/icons-react/es/table-of-contents/20';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Mobile Component.
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
  const handleChange = (e) => {
    const id = e.target.value;
    const filteredItems = menuItems.filter((menu) => {
      return menu.id === id;
    });
    const title = filteredItems[0].title;
    updateState(id, title);
    const selector = `a[name="${id}"]`;
    smoothScroll(null, selector, 50);
    triggerFocus(selector);
  };

  /**
   * Trigger the focus on screen readers, so they can read the target paragraph
   *
   * @param {*} elem Selector to find the item
   */
  function triggerFocus(elem) {
    const element = document.querySelector(elem);

    if (element) {
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
  }

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
          aria-label={menuLabel}
          className={`${prefix}--tableofcontents__mobile__select`}
          onBlur={handleOnBlur}
          value={selectedOption}
          onChange={(e) => handleChange(e)}>
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
  options.findIndex((x) => x.id === labelObj.id) === -1
    ? options.unshift(labelObj)
    : null;
  return options.map((option, index) => {
    if (option) {
      return (
        <option
          className={`${prefix}--tableofcontents__mobile__select__option`}
          data-autoid={`${stablePrefix}--tableofcontents__mobile__select__option-${option.id}`}
          key={index}
          value={option.id}
          defaultValue={index === 0}
          disabled={index === 0}
          hidden={index === 0}>
          {option.title}
        </option>
      );
    }
  });
};

TOCMobile.propTypes = {
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

  /**
   * Menu label for mobile menu.
   */
  menuLabel: PropTypes.string,

  /**
   * Function to update parent state.
   */
  updateState: PropTypes.func,
};

export default TOCMobile;
