/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import { DDS_SIMPLE_OVERVIEW } from '../../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.stories.mdx';
import SimpleOverview from '../SimpleOverview';

const targets = {
  self: '_self',
  blank: '_blank',
};

export default !DDS_SIMPLE_OVERVIEW
  ? undefined
  : {
      title: 'Patterns (Sections)|Simple Overview',

      parameters: {
        ...readme.parameters,
        knobs: {
          SimpleOverview: ({ groupId }) => {
            const linkActive = boolean('Link', false, groupId);
            return {
              label: text(
                'Label (required):',
                'Lorem ipsum dolor sit amet, consectetur',
                groupId
              ),
              heading: text(
                'Heading (required):',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                groupId
              ),
              copy: text(
                'Copy (required):',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                groupId
              ),
              link: !linkActive
                ? undefined
                : {
                    copy: text('Link copy:', 'Lorem Ipsum', groupId),
                    href: text(
                      'Link href:',
                      'https://www.example.com',
                      groupId
                    ),
                    target: select(
                      'Link target:',
                      targets,
                      targets.blank,
                      groupId
                    ),
                  },
            };
          },
        },
      },
    };

export const Default = ({ parameters }) => {
  const { label, heading, copy, link } =
    parameters?.props?.SimpleOverview ?? {};
  return (
    <SimpleOverview label={label} heading={heading} copy={copy} link={link} />
  );
};
