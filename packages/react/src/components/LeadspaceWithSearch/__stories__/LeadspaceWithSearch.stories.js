/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DDS_LEADSPACE_WITH_SEARCH } from '../../../internal/FeatureFlags';
import LeadspaceWithSearch from '../LeadspaceWithSearch';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

const props = () => ({
  heading: text('Heading (heading):', 'Find a product'),
  copy: text('Copy (copy):', 'Duis aute irure dolor in reprehen deritirure'),
  searchProps: {
    placeholder: {
      mobile: text(
        'Mobile placeholder (searchProps.placeHolder.mobile):',
        'Search keywords'
      ),
      desktop: text(
        'Desktop placeholder (searchProps.placeHolder.desktop)',
        'Search known issues, documentation and support forums'
      ),
    },
    labelText: 'Search keywords',
    onChange: () => {},
    onKeyDown: () => {},
  },
});

export default !DDS_LEADSPACE_WITH_SEARCH
  ? undefined
  : {
      title: 'Components/Lead space with search',
      parameters: {
        ...readme.parameters,
        percy: {
          skip: true,
        },
      },
    };

export const Default = !DDS_LEADSPACE_WITH_SEARCH
  ? undefined
  : () => {
      return <LeadspaceWithSearch {...props()} />;
    };
