/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import CardSectionImages from '../CardSectionImages';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Patterns (Sections)|CardSectionImages',

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
