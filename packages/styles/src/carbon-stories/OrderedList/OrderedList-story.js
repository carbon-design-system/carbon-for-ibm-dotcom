/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OrderedList, ListItem } from 'carbon-components-react';

export default {
  title: 'OrderedList',
};

export const Default = () => (
  <OrderedList>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
  </OrderedList>
);

Default.story = {
  name: 'default',

  parameters: {
    info: {
      text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
    },
  },
};

export const Nested = () => (
  <OrderedList>
    <ListItem>
      Ordered List level 1
      <OrderedList nested>
        <ListItem>Ordered List level 2</ListItem>
        <ListItem>
          Ordered List level 2
          <OrderedList nested>
            <ListItem>Ordered List level 2</ListItem>
            <ListItem>Ordered List level 2</ListItem>
          </OrderedList>
        </ListItem>
      </OrderedList>
    </ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
  </OrderedList>
);

Nested.story = {
  name: 'nested',

  parameters: {
    info: {
      text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
    },
  },
};
