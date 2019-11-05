import { FOOTER_LOCALE_BUTTON } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';

import React, { useState, useEffect } from 'react';
import {
  Button,
  ComposedModal,
  ModalHeader,
  ModalBody,
  ComboBox,
} from 'carbon-components-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { LocaleAPI } from '@carbon/ibmdotcom-services';
import { settings } from 'carbon-components';
import { Globe20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * EXPERIMENTAL: Renders the locale button
 *
 * @private
 *
 * @param {Function} selectItem method to handle selected item
 *
 * @returns {object} JSX object
 */
const LocaleButton = ({ selectItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState({});

  useEffect(() => {
    (async () => {
      const locale = await LocaleAPI.getLocale();
      const list = locale && (await LocaleAPI.getList(locale));
      setList(list);
    })();
  }, []);

  /**
   *  method to merge list and sort alphabetically by country
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
    countryList.sort((a, b) => (a.name > b.name ? 1 : -1));
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
            items={list ? sortList(list) : []}
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
