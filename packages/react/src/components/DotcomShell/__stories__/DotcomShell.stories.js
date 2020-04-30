import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import {
  DDS_MASTHEAD_L1,
  DDS_LANGUAGE_SELECTOR,
} from '../../../internal/FeatureFlags';
import content from './data/content';
import DotcomShell from '../DotcomShell';
import footerMenu from '../../Footer/__data__/footer-menu.json';
import footerThin from '../../Footer/__data__/footer-thin.json';
import languageItems from '../../Footer/__data__/language-items.json';
import mastheadKnobs from '../../Masthead/__stories__/data/Masthead.stories.knobs.js';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Dotcom Shell', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    let navigation = select(
      'Masthead: navigation data (navigation)',
      mastheadKnobs.navigation,
      mastheadKnobs.navigation.default
    );

    let platform = select(
      'Masthead: platform name (platform)',
      mastheadKnobs.platform,
      mastheadKnobs.platform.none
    );

    let hasProfile = boolean(
      'Masthead: show the profile functionality (hasProfile)',
      true
    );

    let hasSearch = boolean(
      'Masthead: show the search functionality (hasSearch)',
      true
    );

    let title = DDS_MASTHEAD_L1
      ? text('Masthead: L1 Title (title)', 'Stock Charts')
      : null;

    let eyebrowText = DDS_MASTHEAD_L1
      ? text('Masthead: L1 Eyebrow text (eyebrowText)', 'Eyebrow')
      : null;

    let eyebrowLink = DDS_MASTHEAD_L1
      ? text('Masthead: Eyebrow link (eyebrowLink)', '#')
      : null;

    const footerTypeOptions = {
      tall: '',
      short: 'short',
    };

    let type = select(
      'Footer: sets the type of footer (type)',
      footerTypeOptions,
      footerTypeOptions.tall
    );

    let isCustom = boolean(
      'Footer: show custom navigation (not a prop)',
      false
    );

    let footerNav = isCustom
      ? object('Footer: custom navigation data (navigation)', {
          footerMenu,
          footerThin,
        })
      : null;

    let disableLocaleButton = boolean(
      'Footer: hide the locale button (disableLocaleButton)',
      false
    );

    let languageOnly =
      DDS_LANGUAGE_SELECTOR &&
      boolean('Footer: switch to the language selector (languageOnly)', false);

    let items = languageOnly
      ? object('Footer: language dropdown items (languageItems)', languageItems)
      : null;

    /**
     * Language callback demo function
     *
     * @param {string} selectedItem Selected item
     */
    const languageCallback = selectedItem => {
      console.log('Selected Item:', selectedItem);
    };

    return (
      <DotcomShell
        mastheadProps={{
          navigation,
          platform,
          hasProfile,
          hasSearch,
          title,
          eyebrowText,
          eyebrowLink,
        }}
        footerProps={{
          navigation: isCustom && footerNav,
          type,
          disableLocaleButton,
          languageOnly,
          languageItems: items,
          languageInitialItem: { id: 'en', text: 'English' },
          languageCallback,
        }}>
        {content}
      </DotcomShell>
    );
  });
