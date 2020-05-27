/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import cards from '../../../sub-patterns/CardGroup/__stories__/data/cards.json';
import ContentBlockCards from '../ContentBlockCards';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|ContentBlockCards',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const Default = () => {
  const cardTypes = Object.keys(cards);
  const type = select('Card (type)', cardTypes, cardTypes[0]);
  const data = object(`Data (${type})`, cards[type]);

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2 content-block-story">
          <ContentBlockCards
            heading={text(
              'Heading (required):',
              'Aliquam condimentum interdum'
            )}
            cards={data}
          />
        </div>
      </div>
    </div>
  );
};
