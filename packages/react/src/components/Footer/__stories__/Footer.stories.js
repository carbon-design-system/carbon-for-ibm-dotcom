/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { DDS_LANGUAGE_SELECTOR } from '../../../internal/FeatureFlags';
import { Footer } from '../';
import footerMenu from '../__data__/footer-menu.json';
import footerThin from '../__data__/footer-thin.json';
import inPercy from '@percy-io/in-percy';
import languageItems from '../__data__/language-items.json';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Footer', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const footerTypeOptions = {
      tall: '',
      short: 'short',
    };

    let type = select(
      'sets the type of footer (type)',
      footerTypeOptions,
      footerTypeOptions.tall
    );

    let isCustom = boolean('show custom navigation (not a prop)', inPercy());

    let navigation =
      isCustom &&
      object('custom navigation data (navigation)', {
        footerMenu,
        footerThin,
      });

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
        navigation={isCustom && navigation}
        type={type}
        disableLocaleButton={disableLocaleButton}
        langCode={inPercy() ? { lc: 'en', cc: 'us' } : null}
        languageOnly={languageOnly}
        languageItems={items}
        languageInitialItem={{ id: 'en', text: 'English' }}
        languageCallback={languageCallback}
      />
    );
  });
