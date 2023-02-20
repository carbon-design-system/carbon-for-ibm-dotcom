/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DDS_LEADSPACE_WITH_SEARCH } from '../../../internal/FeatureFlags';
import LeadspaceWithSearch from '../LeadspaceWithSearch';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default !DDS_LEADSPACE_WITH_SEARCH
  ? undefined
  : {
      title: 'Components|Lead space with search',
      parameters: {
        ...readme.parameters,
        knobs: {
          LeadspaceWithSearch: ({ groupId }) => ({
            heading: text('Heading (heading):', 'Find a product', groupId),
            copy: text(
              'Copy (copy):',
              'Duis aute irure dolor in reprehen deritirure',
              groupId
            ),
            searchProps: {
              placeholder: {
                mobile: text(
                  'Mobile placeholder (searchProps.placeHolder.mobile):',
                  'Search keywords',
                  groupId
                ),
                desktop: text(
                  'Desktop placeholder (searchProps.placeHolder.desktop)',
                  'Search known issues, documentation and support forums',
                  groupId
                ),
              },
              labelText: 'Search keywords',
              onChange: () => {},
              onKeyDown: () => {},
            },
          }),
        },
      },
    };

export const Default = !DDS_LEADSPACE_WITH_SEARCH
  ? undefined
  : ({ parameters }) => {
      const { heading, copy, searchProps } =
        parameters?.props?.LeadspaceWithSearch ?? {};

      return (
        <LeadspaceWithSearch
          heading={heading}
          copy={copy}
          searchProps={searchProps}
        />
      );
    };
