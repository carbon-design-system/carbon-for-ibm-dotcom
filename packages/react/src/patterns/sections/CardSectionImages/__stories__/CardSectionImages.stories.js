/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, select, text } from '@storybook/addon-knobs';
import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import CardSectionImages from '../CardSectionImages';
import React from 'react';
import readme from '../README.stories.mdx';

const themes = {
  white: '',
  g10: 'g10',
  g90: 'g90',
  g100: 'g100',
};

export default {
  title: 'Patterns (Sections)|CardSectionImages',

  parameters: {
    ...readme.parameters,
    knobs: {
      CardSectionImages: ({ groupId }) => ({
        heading: text(
          'Heading (required):',
          'Aliquam condimentum interdum',
          groupId
        ),
        theme: select('theme', themes, themes.white, groupId),
        cards: object('Data', cards.Images, groupId),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, theme, cards } = parameters?.props?.CardSectionImages ?? {};
  return <CardSectionImages heading={heading} theme={theme} cards={cards} />;
};
