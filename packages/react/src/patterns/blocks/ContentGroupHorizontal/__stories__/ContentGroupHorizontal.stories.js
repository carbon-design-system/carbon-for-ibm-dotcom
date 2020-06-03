/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text } from '@storybook/addon-knobs';
import ContentGroupHorizontal from '../ContentGroupHorizontal';
import items from './data/items.json';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|ContentGroupHorizontal',

  parameters: {
    ...readme.parameters,
    knobs: {
      ContentGroupHorizontal: ({ groupId }) => ({
        heading: text('Heading', 'Aliquam condimentum', groupId),
        items: object('Items', items.items, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, items } = parameters?.props?.ContentGroupHorizontal ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <ContentGroupHorizontal heading={heading} items={items} />
        </div>
      </div>
    </div>
  );
};
