/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
import inPercy from '@percy-io/in-percy';
import languageItems from '../../Footer/__data__/language-items.json';
import mastheadKnobs from '../../Masthead/__stories__/data/Masthead.stories.knobs.js';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Components|Dotcom Shell',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  let navigation = select(
    'Masthead (mastheadProps): navigation data (navigation)',
    mastheadKnobs.navigation,
    inPercy()
      ? mastheadKnobs.navigation.custom
      : mastheadKnobs.navigation.default
  );

  let platform = select(
    'Masthead (mastheadProps): platform name (platform)',
    mastheadKnobs.platform,
    mastheadKnobs.platform.none
  );

  let hasProfile = boolean(
    'Masthead (mastheadProps): show the profile functionality (hasProfile)',
    true
  );

  let hasSearch = boolean(
    'Masthead (mastheadProps): show the search functionality (hasSearch)',
    true
  );

  let title = DDS_MASTHEAD_L1
    ? text('Masthead (mastheadProps): L1 Title (title)', 'Stock Charts')
    : null;

  let eyebrowText = DDS_MASTHEAD_L1
    ? text('Masthead (mastheadProps): L1 Eyebrow text (eyebrowText)', 'Eyebrow')
    : null;

  let eyebrowLink = DDS_MASTHEAD_L1
    ? text('Masthead (mastheadProps): Eyebrow link (eyebrowLink)', '#')
    : null;

  const footerTypeOptions = {
    tall: '',
    short: 'short',
  };

  let type = select(
    'Footer (footerProps): sets the type of footer (type)',
    footerTypeOptions,
    footerTypeOptions.tall
  );

  let isCustom = boolean(
    'Footer (footerProps): show custom navigation (not a prop)',
    inPercy()
  );

  let footerNav = isCustom
    ? object('Footer (footerProps): custom navigation data (navigation)', {
        footerMenu,
        footerThin,
      })
    : null;

  let disableLocaleButton = boolean(
    'Footer (footerProps): hide the locale button (disableLocaleButton)',
    false
  );

  let languageOnly =
    DDS_LANGUAGE_SELECTOR &&
    boolean(
      'Footer (footerProps): switch to the language selector (languageOnly)',
      false
    );

  let items = languageOnly
    ? object(
        'Footer (footerProps): language dropdown items (languageItems)',
        languageItems
      )
    : null;

  /**
   * Language callback demo function
   *
   * @param {string} selectedItem Selected item
   */
  const languageCallback = selectedItem => {
    console.log('footer (language selector) selected item:', selectedItem);
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
        navigation: isCustom ? footerNav : null,
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
};
