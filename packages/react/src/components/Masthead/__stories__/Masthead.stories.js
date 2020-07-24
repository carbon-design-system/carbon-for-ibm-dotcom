/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import { DDS_MASTHEAD_L1 } from '../../../internal/FeatureFlags';
import inPercy from '@percy-io/in-percy';
import Masthead from '../Masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import React from 'react';
import readme from '../README.stories.mdx';

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
      Masthead: ({ groupId }) => {
        const standardProps = {
          navigation: select(
            'navigation data (navigation)',
            mastheadKnobs.navigation,
            inPercy()
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
        };
        return {
          ...standardProps,
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
        const standardProps = {
          navigation: select(
            'navigation data (navigation)',
            mastheadKnobs.navigation,
            inPercy()
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
        return {
          ...standardProps,
        };
      },
    },
  },
};

export const WithL1 = !DDS_MASTHEAD_L1
  ? undefined
  : ({ parameters }) => <Default parameters={parameters} />;

if (WithL1) {
  WithL1.story = {
    parameters: {
      knobs: {
        Masthead: ({ groupId }) => {
          const standardProps = {
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
          const mastheadL1Props = {
            mastheadL1Data: {
              title: text(
                'L1 title (mastheadL1Data.title) (experimental)',
                'Stock Charts',
                groupId
              ),
              titleLink: text(
                'L1 title link(mastheadL1Data.titleLink) (experimental)',
                'https://www.example.com',
                groupId
              ),
              eyebrowText: text(
                'L1 eyebrow text (mastheadL1Data.eyebrowText) (experimental)',
                'Eyebrow',
                groupId
              ),
              eyebrowLink: text(
                'L1 eyebrow link (mastheadL1Data.eyebrowLink) (experimental)',
                '#',
                groupId
              ),
              navigationL1: mastheadKnobs.navigation.custom,
            },
          };
          return {
            ...standardProps,
            ...mastheadL1Props,
          };
        },
      },
    },
  };
}
