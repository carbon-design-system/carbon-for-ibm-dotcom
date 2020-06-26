/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, object, text } from '@storybook/addon-knobs';
import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.stories.mdx';

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
  const { heading, cards, cta } = parameters?.props?.CardSectionSimple ?? {};
  const theme = document.documentElement.getAttribute('storybook-carbon-theme');
  return (
    <CardSectionSimple
      heading={heading}
      theme={theme}
      cards={cards}
      cta={cta}
    />
  );
};
