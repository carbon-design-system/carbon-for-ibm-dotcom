/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { ComboBox } from 'carbon-components-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer language selector component
 *
 * @param {object} props JSX props
 * @param {Array} props.items Array of items to pass into ComboBox
 * @param {object} props.initialSelectedItem initial selected item for the ComboBox
 * @param {Function} props.callback Callback function when an item is selected
 * @returns {*} JSX component
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
    callback(setSelectedItem);
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
      />
    </div>
  );
};

LanguageSelector.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  initialSelectedItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
  callback: PropTypes.func,
};

/**
 * @property {object} defaultProps default LanguageSelector props
 * @type {{groups: Array}}
 */
LanguageSelector.defaultProps = {
  items: null,
  initialSelectedItem: null,
  callback: () => {},
};

export default LanguageSelector;
