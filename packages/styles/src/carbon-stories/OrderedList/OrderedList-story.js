/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { OrderedList, ListItem } from 'carbon-components-react';

storiesOf('OrderedList', module)
  .add(
    'default',
    () => (
      <OrderedList>
        <ListItem>Ordered List level 1</ListItem>
        <ListItem>Ordered List level 1</ListItem>
        <ListItem>Ordered List level 1</ListItem>
      </OrderedList>
    ),
    {
      info: {
        text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
      },
    }
  )
  .add(
    'nested',
    () => (
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
    ),
    {
      info: {
        text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
      },
    }
  );
