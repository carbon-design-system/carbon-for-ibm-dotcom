/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import { DDS_CUSTOM_PROFILE_LOGIN } from '../../../internal/FeatureFlags';
import inPercy from '@percy-io/in-percy';
import Masthead from '../Masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import React from 'react';
import readme from '../README.stories.mdx';
import TranslationAPI from '../../../internal/vendor/@carbon/ibmdotcom-services/services/Translation/Translation';

// For mocking in integration tests
// TODO: See if `TranslationAPI.getTranslation()` call can be avoided when we use mock data
const origGetTranslation = TranslationAPI.getTranslation;

const props = {
  default: () => {
    const useMockData = inPercy();

    // For mocking in integration tests
    // TODO: See if `TranslationAPI.getTranslation()` call can be avoided when we use mock data
    TranslationAPI.getTranslation = !useMockData
      ? origGetTranslation
      : () =>
          new Promise(resolve => {
            setTimeout(resolve, 300000);
          });

    const customProfileLogin = DDS_CUSTOM_PROFILE_LOGIN
      ? text(
          'custom profile login url (customProfileLogin)',
          'https://www.example.com/'
        )
      : null;

    return {
      navigation: useMockData
        ? mastheadKnobs.navigation.custom
        : mastheadKnobs.navigation.default,
      hasProfile: boolean('show the profile functionality (hasProfile)', true),
      customProfileLogin,
      hasSearch: boolean('show the search functionality (hasSearch)', true),
      placeHolderText: text(
        'search placeholder (placeHolderText)',
        'Search all of IBM'
      ),
      initialSearchTerm: text('initial search term (initialSearchTerm)', ''),
      selectedMenuItem: text(
        'selected menu item (selectedMenuItem)',
        'Consulting & Services'
      ),
    };
  },
  withCustomNavigation: () => {
    const customProfileLogin = DDS_CUSTOM_PROFILE_LOGIN
      ? text(
          'custom profile login url (customProfileLogin)',
          'https://www.example.com/'
        )
      : null;

    return {
      navigation: mastheadKnobs.navigation.custom,
      hasProfile: boolean('show the profile functionality (hasProfile)', true),
      customProfileLogin,
      hasSearch: boolean('show the search functionality (hasSearch)', true),
      placeHolderText: text(
        'search placeholder (placeHolderText)',
        inPercy() ? '' : 'Search all of IBM'
      ),
      selectedMenuItem: text(
        'selected menu item (selectedMenuItem)',
        'Lorem ipsum dolor sit amet'
      ),
    };
  },
  withPlatform: () => {
    const useMockData = inPercy();

    return {
      navigation: select(
        'navigation data (navigation)',
        mastheadKnobs.navigation,
        useMockData
          ? mastheadKnobs.navigation.custom
          : mastheadKnobs.navigation.default
      ),
      platform: mastheadKnobs.platform.platform,
      hasProfile: boolean('show the profile functionality (hasProfile)', true),
      hasSearch: boolean('show the search functionality (hasSearch)', true),
      placeHolderText: text(
        'search placeholder (placeHolderText)',
        'Search all of IBM'
      ),
      selectedMenuItem: text(
        'selected menu item (selectedMenuItem)',
        'Consulting & Services'
      ),
    };
  },
  withL1: () => ({
    platform: mastheadKnobs.l1Platform,
    hasProfile: boolean('show the profile functionality (hasProfile)', true),
    hasSearch: boolean('show the search functionality (hasSearch)', true),
    placeHolderText: text(
      'search placeholder (placeHolderText)',
      'Search all of IBM'
    ),
    mastheadL1Data: {
      navigationL1: mastheadKnobs.navigation.custom,
    },
    selectedMenuItem: text(
      'selected menu item (selectedMenuItem)',
      'Lorem ipsum dolor sit amet'
    ),
  }),
  withAlternateLogoAndTooltip: () => {
    const useMockData = inPercy();

    return {
      navigation: select(
        'navigation data (navigation)',
        mastheadKnobs.navigation,
        useMockData
          ? mastheadKnobs.navigation.custom
          : mastheadKnobs.navigation.default
      ),
      hasProfile: boolean('show the profile functionality (hasProfile)', true),
      hasSearch: boolean('show the search functionality (hasSearch)', true),
      placeHolderText: text(
        'search placeholder (placeHolderText)',
        'Search all of IBM'
      ),
      selectedMenuItem: text(
        'selected menu item (selectedMenuItem)',
        'Consulting & Services'
      ),
      mastheadLogo: select(
        'masthead logo data (mastheadLogo)',
        mastheadKnobs.mastheadLogo,
        mastheadKnobs.mastheadLogo.alternateWithTooltip
      ),
    };
  },
};

export default {
  title: 'Components/Masthead',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = args => (
  <Masthead {...(Object.keys(args).length > 0 ? args : props.default())} />
);

Default.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const WithCustomNavigation = () => (
  <Default {...props.withCustomNavigation()} />
);

WithCustomNavigation.story = {
  name: 'With custom navigation',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const SearchOpenOnload = () => (
  <Masthead {...props.default()} searchOpenOnload />
);

SearchOpenOnload.story = {
  name: 'Search open onload',
  parameters: {
    knobs: { escapeHTML: false },
  },
};

export const WithPlatform = () => <Default {...props.withPlatform()} />;

WithPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const WithL1 = () => <Default {...props.withL1()} />;

WithL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const WithAlternateLogoAndTooltip = () => (
  <Masthead {...props.withAlternateLogoAndTooltip()} />
);

WithAlternateLogoAndTooltip.story = {
  name: 'With alternate logo and tooltip',
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
