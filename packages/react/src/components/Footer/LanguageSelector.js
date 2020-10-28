/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import Select from '../../internal/vendor/carbon-components-react/components/Select/Select';
import SelectItem from '../../internal/vendor/carbon-components-react/components/SelectItem/SelectItem';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer language selector component.
 */
const LanguageSelector = ({ items, initialSelectedItem, callback }) => {
  const [selectedItem, setSelectedItem] = useState(
    initialSelectedItem || items[0]
  );

  /**
   * Sets the selected item and then runs the callback function
   *
   * @param {object} selectedItem Selected item object
   * @private
   */
  function _setSelectedItem(selectedItem) {
    setSelectedItem(selectedItem);
    callback(selectedItem);
  }

  return (
    <div className={`${prefix}--language-selector__container`}>
      <Select
        defaultValue={selectedItem.id}
        data-autoid={`${stablePrefix}--language-selector`}
        className={`${prefix}--language-selector`}
        onChange={evt => _setSelectedItem(evt)}
        text={selectedItem.text}
        hideLabel>
        {renderSelectItems(items)}
      </Select>
    </div>
  );
};

/**
 * Iterate through and render a list of select items
 *
 * @param {Array} items A list of items to be rendered
 * @returns {object} JSX object
 */

function renderSelectItems(items) {
  const selectItems = [];
  items.map(item => {
    selectItems.push(<SelectItem value={item.id} text={item.text} />);
  });
  return selectItems;
}

LanguageSelector.propTypes = {
  /**
   * Array of items to pass into ComboBox.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),

  /**
   * Initial selected item for the ComboBox.
   */
  initialSelectedItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),

  /**
   * Callback function when an item is selected.
   */
  callback: PropTypes.func,
};

LanguageSelector.defaultProps = {
  items: null,
  initialSelectedItem: null,
  callback: () => {},
};

export default LanguageSelector;
