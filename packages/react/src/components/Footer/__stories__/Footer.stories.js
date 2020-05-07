import './index.scss';
import { boolean, object, select, withKnobs } from '@storybook/addon-knobs';
import { DDS_LANGUAGE_SELECTOR } from '../../../internal/FeatureFlags';
import { Footer } from '../';
import footerMenu from '../__data__/footer-menu.json';
import footerThin from '../__data__/footer-thin.json';
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

    let isCustom = boolean('show custom navigation (not a prop)', false);

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
        type={type}
        disableLocaleButton={disableLocaleButton}
        languageOnly={languageOnly}
        languageItems={languageOnly ? items : null}
        languageInitialItem={{ id: 'en', text: 'English' }}
        languageCallback={languageCallback}
      />
    );
  });
