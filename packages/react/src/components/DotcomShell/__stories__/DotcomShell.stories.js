/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Content from './data/content';
import DotcomShell from '../DotcomShell';
import { Default as footerStory } from '../../Footer/__stories__/Footer.stories.js';
import { Default as mastheadStory } from '../../Masthead/__stories__/Masthead.stories.js';
import React from 'react';
import readme from '../README.stories.mdx';
import { select } from '@storybook/addon-knobs';

const footerTypeOptions = {
  tall: undefined,
  short: 'short',
};

export default {
  title: 'Components|Dotcom Shell',

  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    knobs: {
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: select(
              'Footer (footerProps): sets the type of footer (type)',
              footerTypeOptions,
              footerTypeOptions.tall,
              'Footer'
            ),
          },
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { mastheadProps, footerProps } = parameters?.props?.DotcomShell ?? {};
  return (
    <DotcomShell mastheadProps={mastheadProps} footerProps={footerProps}>
      <main id="main-content">
        <div style={{ paddingTop: '6rem' }}>
          <Content />
        </div>
      </main>
    </DotcomShell>
  );
};

export const SearchOpenByDefault = ({ parameters }) => (
  <Default parameters={parameters} />
);

SearchOpenByDefault.story = {
  name: 'Search open',
  parameters: {
    knobs: {
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: {
            ...mastheadKnobs({ groupId: 'Masthead' }),
            searchOpenOnload: true,
          },
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
          },
        };
      },
    },
  },
};

export const WithPlatform = ({ parameters }) => (
  <Default parameters={parameters} />
);

WithPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: {
            ...mastheadKnobs({ groupId: 'Masthead' }),
            platform: {
              name: 'IBM Cloud',
              url: 'https://www.ibm.com/cloud',
            },
          },
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
          },
        };
      },
    },
  },
};
