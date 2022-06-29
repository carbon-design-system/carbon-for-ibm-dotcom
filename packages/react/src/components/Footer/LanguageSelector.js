/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect, useRef } from 'react';
import ComboBox from '../../internal/vendor/carbon-components-react/components/ComboBox/ComboBox';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import Select from '../../internal/vendor/carbon-components-react/components/Select/Select';
import SelectItem from '../../internal/vendor/carbon-components-react/components/SelectItem/SelectItem';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer language selector component.
 */
const LanguageSelector = ({
  items,
  initialSelectedItem,
  callback,
  labelText,
}) => {
  const { ref } = useClickOutside();

  const [selectedItem, setSelectedItem] = useState(
    initialSelectedItem || items[0]
  );

  const [lastSelectedItem, setLastSelectedItem] = useState(
    initialSelectedItem || items[0]
  );

  /**
   * Sets the selected item and then runs the callback function
   *
   * @param {object} selectedItem Selected item object
   * @private
   */
  function _setSelectedItem(selectedItem) {
    const item = selectedItem !== null ? selectedItem : '';
    setSelectedItem(item);
    callback(item);

    if (selectedItem !== null) {
      setLastSelectedItem(selectedItem);
    }
  }

  /**
   * Identifies the click outisde the language selector and resets its value to the previously selected
   */
  function useClickOutside() {
    const ref = useRef(null);

    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedItem(lastSelectedItem);
      }
    };

    useEffect(() => {
      root.document.addEventListener('click', handleClickOutside, true);
      return () => {
        root.document.removeEventListener('click', handleClickOutside, true);
      };
    });

    return { ref };
  }

  return (
    <div className={`${prefix}--language-selector__container`} ref={ref}>
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
        placeholder={labelText}
        titleText={labelText}
        size="xl"
      />
      <Select
        defaultValue={selectedItem.id}
        data-autoid={`${stablePrefix}--language-selector__select`}
        id={`${prefix}--language-selector`}
        className={`${prefix}--language-selector`}
        onChange={evt => _setSelectedItem(evt)}
        text={selectedItem.text}
        labelText={labelText}
        aria-label={labelText}>
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
  items.map((item, index) => {
    selectItems.push(
      <SelectItem value={item.id} text={item.text} key={index} />
    );
  });
  return selectItems;
}

LanguageSelector.propTypes = {
  /**
   * Array of items to pass into Select.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),

  /**
   * Initial selected item for the Select.
   */
  initialSelectedItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),

  /**
   * Callback function when an item is selected.
   */
  callback: PropTypes.func,

  /**
   * Label text
   */
  labelText: PropTypes.string,
};

LanguageSelector.defaultProps = {
  items: null,
  initialSelectedItem: null,
  callback: () => {},
  labelText: 'Choose a language',
};

export default LanguageSelector;
