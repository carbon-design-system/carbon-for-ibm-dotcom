/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import { withKnobs, boolean, array } from '@storybook/addon-knobs';
import { DataTableSkeleton } from 'carbon-components-react';

const props = () => ({
  headers: array(
    'Optional table headers (headers)',
    ['Name', 'Protocol', 'Port', 'Rule', 'Attached Groups'],
    ','
  ),
  zebra: boolean('Use zebra stripe (zebra)', false),
  compact: boolean('Compact variant (compact)', false),
});

export default {
  title: 'DataTableSkeleton',
  decorators: [withKnobs],
};

export const Default = () => (
  <div style={{ width: '800px' }}>
    <DataTableSkeleton {...props()} />
    <br />
  </div>
);

Default.story = {
  name: 'default',

  parameters: {
    info: {
      text: `
          Skeleton states are used as a progressive loading state while the user waits for content to load.
  
          This example shows a skeleton state for a data table.
        `,
    },
  },
};
