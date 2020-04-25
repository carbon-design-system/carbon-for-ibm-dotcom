/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { altlangs, settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ArrowLeft20, EarthFilled20 } from '@carbon/icons-react';
import { ComposedModal, ModalBody, ModalHeader } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { LocaleAPI } from '@carbon/ibmdotcom-services';
import LocaleModalCountries from './LocaleModalCountries';
import LocaleModalRegions from './LocaleModalRegions';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModal component
 *
 * @param {object} props props object
 * @param {boolean} props.isOpen Opens modal
 * @param {Function} props.setIsOpen isOpen state of modal
 * @returns {*} LocaleModal component
 */
const LocaleModal = ({ isOpen, setIsOpen }) => {
  const [list, setList] = useState({});
  const [langDisplay, setLangDisplay] = useState();
  const [modalLabels, setModalLabels] = useState({});
  const [isFiltering, setIsFiltering] = useState(false);
  const [clearResults, setClearResults] = useState(false);
  const [currentRegion, setCurrentRegion] = useState();

  const filterClass = cx({
    [`${prefix}--locale-modal__filtering`]: isFiltering,
  });

  useEffect(() => {
    (async () => {
      const locale = await LocaleAPI.getLocale();
      const list = locale && (await LocaleAPI.getList(locale));
      const getLangDisplay = await LocaleAPI.getLangDisplay();
      setLangDisplay(getLangDisplay);
      setList(list);
      setModalLabels(list.localeModal);

      if (
        document.querySelector(`.${prefix}--modal-header__heading`) !== null
      ) {
        document
          .querySelector(`.${prefix}--modal-header__heading`)
          .setAttribute('tabindex', '1');
      }

      const localeModalContainer = document.querySelector(
        `.${prefix}--locale-modal-container .${prefix}--modal-container`
      );

      localeModalContainer.setAttribute('role', 'dialog');
      localeModalContainer.setAttribute('tabindex', '-1');
      localeModalContainer.setAttribute('aria-modal', 'true');
    })();

    // reset the country search results when clicking close icon or back to region button
    if (clearResults) {
      const localeItems = document.querySelectorAll(
        `.${prefix}--locale-modal__locales`
      );

      const localeHidden = `${prefix}--locale-modal__locales-hidden`;

      [...localeItems].map(item => {
        item.classList.remove(localeHidden);
      });
    }
  }, [clearResults]);

  /**
   *  New region/country list based lang attributes available on page
   *
   * @param {object} list country list
   *
   * @returns {object} list item
   */
  const sortList = list => {
    const pageLangs = altlangs();
    const filterList = [];

    list.regionList &&
      list.regionList.map((region, index) => {
        filterList.push({
          name: region.name,
          key: region.key,
          countries: [],
        });

        for (let [key, value] of Object.entries(pageLangs)) {
          region.countryList.map(country => {
            country.locale.map(loc => {
              if (loc[0].includes(key)) {
                filterList[index].countries.push({
                  region: region.key,
                  name: country.name,
                  locale: loc[0],
                  language: loc[1],
                  href: value,
                });
              }
            });
          });
        }

        filterList[index].countries.sort((a, b) => (a.name > b.name ? 1 : -1));
      });

    return filterList;
  };

  return (
    <ComposedModal
      open={isOpen}
      onClose={close}
      className={`${prefix}--locale-modal-container`}
      data-autoid={`${stablePrefix}--locale-modal`}
      selectorPrimaryFocus={`.${prefix}--modal-close`}>
      {isFiltering ? (
        <ModalHeader
          data-autoid={`${stablePrefix}--locale-modal__region-back`}
          label={[
            <ArrowLeft20
              className={`${prefix}--locale-modal__label-arrow`}
              key="arrow-left"
            />,
            modalLabels.headerTitle,
          ]}
          title={currentRegion}
          className={`${prefix}--locale-modal__back`}
        />
      ) : (
        <ModalHeader
          label={[
            langDisplay,
            <EarthFilled20
              key="earthfilled"
              className={`${prefix}--locale-modal__label-globe`}
            />,
          ]}
          title={modalLabels.headerTitle}
          iconDescription={modalLabels.modalClose}
        />
      )}
      <ModalBody className={`${prefix}--locale-modal ${filterClass}`}>
        <LocaleModalRegions
          regionList={sortList(list)}
          setCurrentRegion={setCurrentRegion}
          setIsFiltering={setIsFiltering}
          setClearResults={setClearResults}
          returnButtonLabel={modalLabels.headerTitle}
        />
        <LocaleModalCountries
          regionList={sortList(list)}
          setClearResults={setClearResults}
          {...modalLabels}
        />
      </ModalBody>
    </ComposedModal>
  );

  /**
   * Sets modal state to closed
   *
   * @private
   */
  function close() {
    setIsOpen(false);
    const footerBtn = document.querySelector(
      `.${prefix}--locale-btn__container .${prefix}--btn--secondary`
    );
    setTimeout(() => {
      footerBtn.focus();
    }, 100);
  }
};

/**
 * @property {object} propTypes LocaleModal propTypes
 * @description Defined property types for component
 * @type {{isOpen: boolean, setIsOpen: boolean, headerLabel: string, headerTitle: string}}
 */
LocaleModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default LocaleModal;
