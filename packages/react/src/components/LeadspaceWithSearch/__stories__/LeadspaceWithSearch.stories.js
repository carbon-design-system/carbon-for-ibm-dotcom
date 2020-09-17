/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FolderAdd from '@carbon/icons-react/lib/folder--add/20';
import LeadspaceWithSearch from '../LeadspaceWithSearch';
import React from 'react';
import { text } from '@storybook/addon-knobs';
import View from '@carbon/icons-react/lib/view/20';

export default {
  title: 'Components|LeadspaceWithSearch',
  parameters: {
    knobs: {
      LeadspaceWithSearch: ({ groupId }) => ({
        heading: text('Heading (heading):', 'Lets troubleshoot', groupId),
        searchProps: {
          placeHolderText: text(
            'Placeholder (searchProps.placeHolderText):',
            'Search keywords',
            groupId
          ),
        },
        buttonsProps: [
          {
            renderIcon: View,
            kind: 'tertiary',
            children: 'View your cases',
          },
          {
            children: 'Open a case',
            renderIcon: FolderAdd,
          },
        ],
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, searchProps, buttonsProps } =
    parameters?.props?.LeadspaceWithSearch ?? {};

  return (
    <LeadspaceWithSearch
      heading={heading}
      searchProps={searchProps}
      buttonsProps={buttonsProps}
    />
  );
};
