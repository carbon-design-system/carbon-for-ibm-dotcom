/**
 * Copyright IBM Corp. 2016, 2020
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
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';

// For mocking in integration tests
// TODO: See if `TranslationAPI.getTranslation()` call can be avoided when we use mock data
const origGetTranslation = TranslationAPI.getTranslation;

export default {
  title: 'Components|Masthead',

  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
  },
};

export const Default = ({ parameters }) => (
  <Masthead {...(parameters?.props?.Masthead ?? {})} />
);

Default.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
      Masthead: ({ groupId }) => {
        const useMockData = boolean('Use mock data', inPercy());

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
              'https://www.example.com/',
              groupId
            )
          : null;

        return {
          navigation: select(
            'navigation data (navigation)',
            mastheadKnobs.navigation,
            useMockData
              ? mastheadKnobs.navigation.custom
              : mastheadKnobs.navigation.default,
            groupId
          ),
          platform: select(
            'platform name (platform)',
            mastheadKnobs.platform,
            mastheadKnobs.platform.none,
            groupId
          ),
          hasProfile: boolean(
            'show the profile functionality (hasProfile)',
            true,
            groupId
          ),
          customProfileLogin,
          hasSearch: boolean(
            'show the search functionality (hasSearch)',
            true,
            groupId
          ),
          placeHolderText: text(
            'search placeholder (placeHolderText)',
            'Search all of IBM',
            groupId
          ),
          selectedMenuItem: text(
            'selected menu item (selectedMenuItem)',
            'Services & Consulting',
            groupId
          ),
        };
      },
    },
  },
};

export const SearchOpenByDefault = ({ parameters }) => (
  <Masthead {...(parameters?.props?.Masthead ?? {})} searchOpenOnload={true} />
);

SearchOpenByDefault.story = {
  name: 'Search open by default',
  parameters: {
    knobs: { escapeHTML: false, ...Default.story.parameters.knobs },
  },
};

export const WithPlatform = ({ parameters }) => (
  <Default parameters={parameters} />
);

WithPlatform.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
      Masthead: ({ groupId }) => {
        const useMockData = boolean('Use mock data', inPercy());

        return {
          navigation: select(
            'navigation data (navigation)',
            mastheadKnobs.navigation,
            useMockData
              ? mastheadKnobs.navigation.custom
              : mastheadKnobs.navigation.default,
            groupId
          ),
          platform: mastheadKnobs.platform.platform,
          hasProfile: boolean(
            'show the profile functionality (hasProfile)',
            true,
            groupId
          ),
          hasSearch: boolean(
            'show the search functionality (hasSearch)',
            true,
            groupId
          ),
          placeHolderText: text(
            'search placeholder (placeHolderText)',
            'Search all of IBM',
            groupId
          ),
          selectedMenuItem: text(
            'selected menu item (selectedMenuItem)',
            'Services & Consulting',
            groupId
          ),
        };
      },
    },
  },
};

export const WithL1 = ({ parameters }) => <Default parameters={parameters} />;

WithL1.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
      Masthead: ({ groupId }) => ({
        ...Default.story.parameters.knobs.Masthead({ groupId }),
        mastheadL1Data: {
          title: text('L1 title (title)', 'Stock Charts', groupId),
          titleLink: text(
            'L1 title link (titleLink)',
            'https://example.com/',
            groupId
          ),
          navigationL1: mastheadKnobs.navigation.custom,
        },
      }),
    },
  },
};
