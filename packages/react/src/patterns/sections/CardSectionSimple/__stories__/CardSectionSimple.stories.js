/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cards from '../../../../components/CardGroup/__stories__/data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

/**
 * @param {object} options The options.
 * @param {string} options.groupId The knob group ID.
 * @returns {object} The knobs data.
 */
const getBaseKnobs = ({ groupId }) => {
  return {
    heading: text(
      'Heading (heading):',
      'Aliquam condimentum interdum',
      groupId
    ),
    cards: cards.Simple,
  };
};

export default {
  title: 'Patterns (Sections)|CardSectionSimple',

  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { heading, cards } = parameters?.props?.CardSectionSimple ?? {};
  const theme = document.documentElement.getAttribute('storybook-carbon-theme');
  return <CardSectionSimple heading={heading} theme={theme} cards={cards} />;
};

Default.story = {
  parameters: {
    knobs: {
      CardSectionSimple: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
        };
      },
    },
  },
};

export const WithCTA = ({ parameters }) => {
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

WithCTA.story = {
  parameters: {
    knobs: {
      CardSectionSimple: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cta: {
            heading: 'Top level card link',
            cta: {
              href: 'https://www.example.com',
            },
          },
        };
      },
    },
    propsSet: {
      default: {
        CardSectionSimple: {
          cta: {
            heading: 'Top level card link',
            cta: {
              href: 'https://www.example.com',
            },
          },
        },
      },
    },
  },
};
