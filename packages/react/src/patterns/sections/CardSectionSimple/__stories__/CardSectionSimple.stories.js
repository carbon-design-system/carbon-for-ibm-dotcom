/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, select, text } from '@storybook/addon-knobs';
import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.stories.mdx';

const themes = {
  white: '',
  g10: 'g10',
  g90: 'g90',
  g100: 'g100',
};

export default {
  title: 'Patterns (Sections)|CardSectionSimple',

  parameters: {
    ...readme.parameters,
    knobs: {
      CardSectionSimple: ({ groupId }) => {
        return {
          heading: text(
            'Heading (required):',
            'Aliquam condimentum interdum',
            groupId
          ),
          theme: select('theme', themes, themes.white, groupId),
          cards: object('Data', cards.Simple, groupId),
          cta: boolean('cta', true, groupId) && {
            heading: 'Top level card link',
            cta: {
              href: 'https://www.example.com',
            },
          },
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, theme, cards, cta } =
    parameters?.props?.CardSectionSimple ?? {};
  return (
    <CardSectionSimple
      heading={heading}
      theme={theme}
      cards={cards}
      cta={cta}
    />
  );
};
