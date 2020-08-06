/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import {
  DDS_MASTHEAD_L1,
  DDS_USE_WEB_COMPONENTS_REACT,
} from '../../../internal/FeatureFlags';
import inPercy from '@percy-io/in-percy';
import Masthead from '../Masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import React from 'react';
import readme from '../README.stories.mdx';
import reducers from '@carbon/ibmdotcom-web-components/es/globals/services-store/reducers';
import store from '@carbon/ibmdotcom-web-components/es/globals/services-store/store';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';

store.replaceReducer(reducers);

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

export const Default = ({ parameters }) => {
  const props = parameters?.props?.Masthead ?? {};
  const { navigation } = props;
  return DDS_USE_WEB_COMPONENTS_REACT ? (
    <Masthead navLinks={navigation} />
  ) : (
    <Masthead {...props} />
  );
};

Default.story = {
  parameters: {
    knobs: {
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

        const mastheadL1Data = DDS_MASTHEAD_L1 && {
          title: text(
            'L1 title (title) (experimental)',
            'Stock Charts',
            groupId
          ),
          titleLink: text(
            'L1 title link (titleLink) (experimental)',
            'https://example.com/',
            groupId
          ),
          navigationL1: mastheadKnobs.navigation.custom,
        };

        const standardProps = {
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
          mastheadL1Data,
        };
        return {
          ...standardProps,
        };
      },
    },
  },
};

export const SearchOpenByDefault = ({ parameters }) => {
  const props = parameters?.props?.Masthead ?? {};
  const { navigation } = props;
  return DDS_USE_WEB_COMPONENTS_REACT ? (
    <Masthead navLinks={navigation} openSearch={true} />
  ) : (
    <Masthead
      {...(parameters?.props?.Masthead ?? {})}
      searchOpenOnload={true}
    />
  );
};

SearchOpenByDefault.story = {
  name: 'Search open by default',
  parameters: {
    knobs: Default.story.parameters.knobs,
  },
};

export const WithPlatform = ({ parameters }) => (
  <Default parameters={parameters} />
);

WithPlatform.story = {
  parameters: {
    knobs: {
      Masthead: ({ groupId }) => {
        const useMockData = boolean('Use mock data', inPercy());

        const standardProps = {
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
        };
        const mastheadL1Props = DDS_MASTHEAD_L1 && {
          title: text(
            'L1 title (title) (experimental)',
            'Stock Charts',
            groupId
          ),
          eyebrowText: text(
            'L1 eyebrow text (eyebrowText) (experimental)',
            'Eyebrow',
            groupId
          ),
          eyebrowLink: text(
            'L1 eyebrow link (eyebrowLink) (experimental)',
            '#',
            groupId
          ),
        };
        return {
          ...standardProps,
          ...mastheadL1Props,
        };
      },
    },
  },
};
