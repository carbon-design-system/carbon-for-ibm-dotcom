/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, withKnobs } from '@storybook/addon-knobs';
import { DDS_LANGUAGE_SELECTOR } from '../../../internal/FeatureFlags';
import { Footer } from '../';
import footerMenu from '../__data__/footer-menu.json';
import footerThin from '../__data__/footer-thin.json';
import inPercy from '@percy-io/in-percy';
import languageItems from '../__data__/language-items.json';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Components|Footer',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

/**
 * Footer (default configuration)
 *
 * @returns {*} CSF story
 */
export const Default = () => {
  let isCustom = boolean('show custom navigation (not a prop)', inPercy());

  let navigation = isCustom
    ? object('custom navigation data (navigation)', {
        footerMenu,
        footerThin,
      })
    : null;

  let disableLocaleButton = boolean(
    'hide the locale button (disableLocaleButton)',
    false
  );

  let languageOnly =
    DDS_LANGUAGE_SELECTOR &&
    boolean('switch to the language selector (languageOnly)', false);

  let items =
    languageOnly &&
    object('language dropdown items (languageItems)', languageItems);

  /**
   * Language callback demo function
   *
   * @param {string} selectedItem Selected item
   */
  const languageCallback = selectedItem => {
    console.log('footer (language selector) selected item:', selectedItem);
  };

  return (
    <Footer
      navigation={isCustom ? navigation : null}
      disableLocaleButton={disableLocaleButton}
      langCode={inPercy() ? { lc: 'en', cc: 'us' } : null}
      languageOnly={languageOnly}
      languageItems={languageOnly ? items : null}
      languageInitialItem={{ id: 'en', text: 'English' }}
      languageCallback={languageCallback}
    />
  );
};

/**
 * Footer (short)
 *
 * @returns {*} CSF story
 */
export const Short = () => {
  let isCustom = boolean('show custom navigation (not a prop)', inPercy());

  let navigation = isCustom
    ? object('custom navigation data (navigation)', {
        footerMenu,
        footerThin,
      })
    : null;

  let disableLocaleButton = boolean(
    'hide the locale button (disableLocaleButton)',
    false
  );

  return (
    <Footer
      navigation={isCustom ? navigation : null}
      type="short"
      disableLocaleButton={disableLocaleButton}
      langCode={inPercy() ? { lc: 'en', cc: 'us' } : null}
    />
  );
};
