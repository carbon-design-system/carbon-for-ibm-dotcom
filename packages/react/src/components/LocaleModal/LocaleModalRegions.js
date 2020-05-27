/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../Card';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import Error20 from '@carbon/icons-react/es/error/20';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModalRegions component
 *
 * @param {object} props props object
 * @param {object} props.regionList object of regions
 * @param {Function} props.setCurrentRegion sets state for region name
 * @param {boolean} props.setIsFiltering true when search filter is visible
 * @param {Function} props.setClearResults set flag to determine whether to reset the filtered results
 * @param {string} props.returnButtonLabel label for the return button
 * @returns {*} LocaleModalRegions component
 */
const LocaleModalRegions = ({
  regionList,
  setCurrentRegion,
  setIsFiltering,
  setClearResults,
  returnButtonLabel,
}) => {
  useEffect(() => {
    const regionLink = document.querySelectorAll(`.${prefix}--card`);
    const localeItems = document.querySelectorAll(
      `.${prefix}--locale-modal__locales`
    );

    [...regionLink].forEach(link => {
      link.setAttribute('tabindex', '1');
      link.addEventListener('click', () => {
        const searchInput = document.getElementById(
          `${prefix}--locale-modal__filter`
        );
        searchInput.focus();

        const region = link.dataset.region;
        setCurrentRegion(link.getElementsByTagName('h3')[0].innerHTML);

        [...localeItems].forEach(item => {
          if (item.dataset.region !== region) {
            item.classList.add(`${prefix}--locale-modal__locales-filtered`);
          } else {
            item.classList.remove(`${prefix}--locale-modal__locales-filtered`);
          }
        });
        setIsFiltering(true);

        /**
         * go back to region selection
         *
         */
        const localeBackBtn = document.querySelectorAll(
          `.${prefix}--locale-modal__back .${prefix}--modal-header__label,
          .${prefix}--locale-modal__back .${prefix}--modal-close`
        );

        /**
         * Removes tabindex and role as it goes back
         *
         * @param {*} btn btn element
         */
        const localeBackActive = btn => {
          setIsFiltering(false);
          setClearResults(true);
          document.getElementById(`${prefix}--locale-modal__filter`).value = '';
          btn.removeAttribute('tabindex');
          btn.removeAttribute('role');
          btn.removeAttribute('aria-label');
        };

        [...localeBackBtn].forEach(btn => {
          btn.setAttribute('tabindex', '1');
          btn.setAttribute('role', 'button');
          btn.setAttribute('aria-label', returnButtonLabel);

          btn.addEventListener('click', function click() {
            localeBackActive(btn);
            btn.removeEventListener('click', click);
          });
          btn.addEventListener('keyup', function keyup(e) {
            if (e.keyCode === 32 || e.keyCode === 13) {
              localeBackActive(btn);
              btn.removeEventListener('keyup', keyup);
            }
          });
        });
      });
    });
  });

  return (
    <div
      className={`${prefix}--grid ${prefix}--no-gutter ${prefix}--locale-modal__regions`}>
      <div className={`${prefix}--row`}>
        {regionList &&
          regionList.map(region => {
            const hasCountries = region.countries.length !== 0;

            return (
              <div
                key={`${region.name}`}
                className={`${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--col-xlg-8 ${prefix}--no-gutter`}>
                <Card
                  data-autoid={`${stablePrefix}--locale-modal__geo-btn-${region.key}`}
                  data-region={region.key}
                  key={region.key}
                  heading={region.name}
                  type="link"
                  handleClick={e => e.preventDefault()}
                  cta={{
                    href: hasCountries ? '#' : null,
                    icon: {
                      src: hasCountries ? ArrowRight20 : Error20,
                    },
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

/**
 * @property {object} propTypes LocaleModalRegions propTypes
 * @description Defined property types for component
 * @type {{}}
 */
LocaleModalRegions.propTypes = {
  regionList: PropTypes.array,
  setCurrentRegion: PropTypes.func,
  setIsFiltering: PropTypes.func,
  setClearResults: PropTypes.func,
  returnButtonLabel: PropTypes.string,
};

export default LocaleModalRegions;
