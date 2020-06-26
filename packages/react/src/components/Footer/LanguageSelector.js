/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ComboBox from '../../internal/vendor/carbon-components-react/components/ComboBox/ComboBox';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
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
      <ComboBox
        id="dds-language-selector"
        data-autoid={`${stablePrefix}--language-selector`}
        className={`${prefix}--language-selector`}
        onChange={({ selectedItem }) => _setSelectedItem(selectedItem)}
        items={items}
        itemToString={item => (item ? item.text : '')}
        initialSelectedItem={initialSelectedItem}
        selectedItem={selectedItem}
        direction="top"
        placeholder=""
      />
    </div>
  );
};

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
