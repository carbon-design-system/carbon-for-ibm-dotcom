/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cards from '../../CardGroup/__stories__/data/cards';
import CardSectionImages from '../CardSectionImages';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Card section images',
  parameters: {
    ...readme.parameters,
    knobs: {
      CardSectionImages: ({ groupId }) => ({
        heading: text(
          'Heading (heading):',
          'Aliquam condimentum interdum',
          groupId
        ),
        cards: cards.Images,
      }),
    },
    propsSet: {
      default: {
        CardSectionImages: {
          cards: cards.Images,
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionImages ?? {};
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return <CardSectionImages heading={heading} theme={theme} cards={cards} />;
};
