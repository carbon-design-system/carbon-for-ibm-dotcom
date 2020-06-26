/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, select, text } from '@storybook/addon-knobs';
import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import ContentBlockCards from '../ContentBlockCards';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|ContentBlockCards',

  parameters: {
    ...readme.parameters,
    knobs: {
      ContentBlockCards: ({ groupId }) => {
        const cardTypes = Object.keys(cards);
        const type = select('Card (type)', cardTypes, cardTypes[0], groupId);
        return {
          heading: text(
            'Heading (required):',
            'Aliquam condimentum interdum',
            groupId
          ),
          cards: object(`Data (${type})`, cards[type], groupId),
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, cards: data } = parameters?.props?.ContentBlockCards ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4 content-block-story">
          <ContentBlockCards heading={heading} cards={data} />
        </div>
      </div>
    </div>
  );
};
