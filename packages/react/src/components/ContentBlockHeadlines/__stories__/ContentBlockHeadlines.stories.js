/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlockHeadlines from '../ContentBlockHeadlines';
import { DDS_CONTENTBLOCK_HEADLINES } from '../../../internal/FeatureFlags';
import items from './data/items.json';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

const props = () => ({
  heading: text('Heading', 'Aliquam condimentum'),
  copy: text(
    'Copy',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.'
  ),
  items: items.items,
});

export default !DDS_CONTENTBLOCK_HEADLINES
  ? undefined
  : {
      title: 'Components/Content block headlines',
      parameters: {
        ...readme.parameters,
      },
    };

export const Default = !DDS_CONTENTBLOCK_HEADLINES
  ? undefined
  : () => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
              <ContentBlockHeadlines {...props()} />
            </div>
          </div>
        </div>
      );
    };
