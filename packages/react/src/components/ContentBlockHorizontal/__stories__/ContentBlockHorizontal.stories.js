/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import ContentBlockHorizontal from '../ContentBlockHorizontal';
import items from './data/items.json';
import React from 'react';
import readme from '../README.stories.mdx';

const props = () => ({
  heading: text('Heading (heading):', 'Aliquam condimentum'),
  items: items.items,
  border: boolean('Has bottom border (border):', true),
});

export default {
  title: 'Components/Content block horizontal',
  parameters: {
    ...readme.parameters,
    percy: {
      name: 'Components|Content block horizontal: Default',
    },
    propsSet: {
      default: {
        ContentBlockHorizontal: {
          items: items.items,
        },
      },
    },
  },
};

export const Default = () => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <ContentBlockHorizontal {...props()} />
        </div>
      </div>
    </div>
  );
};
