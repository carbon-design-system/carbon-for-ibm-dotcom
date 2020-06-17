/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import content from './data/content';
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
      <div style={{ paddingTop: '6rem' }}>{content}</div>
    </DotcomShell>
  );
};
