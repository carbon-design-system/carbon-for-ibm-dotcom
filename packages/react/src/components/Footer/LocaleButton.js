import { FOOTER_LOCALE_BUTTON } from '../../internal/FeatureFlags.js';
import { featureFlag, ipcinfoCookie } from '@carbon/ibmdotcom-utilities';

import React, { useState } from 'react';
import {
  Button,
  ComposedModal,
  ModalHeader,
  ModalBody,
  ComboBox,
} from 'carbon-components-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { Globe20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * EXPERIMENTAL: Renders the locale button
 *
 * @private
 *
 * @returns {object} JSX object
 */
const LocaleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // retrieve list from local storage
  const list = JSON.parse(localStorage.getItem('countryList'));

  /**
   * method to handle when country/region has been selected from dropdown
   *
   * @param {object} item selected country/region
   */
  const selectItem = item => {
    const stringLocale = item.selectedItem.locale[0][0];
    const locale = stringLocale.split('-');
    const objectLocale = {
      cc: locale[1],
      lc: locale[0],
    };
    ipcinfoCookie.set(objectLocale);
  };

  /**
   *  method to sort list to be used by the dropdown
   *
   * @param {object} list country list
   *
   * @returns {object} list item
   */
  const sortList = list => {
    let countryList = [];
    list.regionList &&
      list.regionList.map(region => {
        countryList = countryList.concat(region.countryList);
      });
    return countryList;
  };

  return featureFlag(
    FOOTER_LOCALE_BUTTON,
    <div className={`${prefix}--locale-btn__container`}>
      <Button
        data-autoid={`${stablePrefix}--locale-btn`}
        className={`${prefix}--locale-btn`}
        kind="secondary"
        onClick={open}
        renderIcon={Globe20}>
        United States — English
      </Button>

      <ComposedModal
        open={isOpen}
        onClose={close}
        data-autoid={`${stablePrefix}--locale-modal`}>
        <ModalHeader
          label="United States — English"
          title="Select your region"
        />
        <ModalBody>
          <ComboBox
            id="id"
            type="default"
            itemToString={item =>
              item ? `${item.name}-${item.locale[0][1]}` : ''
            }
            onChange={selectItem}
            items={sortList(list)}
            placeholder="Select a country/region"
          />
        </ModalBody>
      </ComposedModal>
    </div>
  );

  /**
   * Sets modal state to open
   *
   * @private
   */
  function open() {
    setIsOpen(true);
  }

  /**
   * Sets modal state to closed
   *
   * @private
   */
  function close() {
    setIsOpen(false);
  }
};

export default LocaleButton;
