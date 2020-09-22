/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Card } from '../../Card';
import cards from '../../CardGroup/__stories__/data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import { CTA } from '../../CTA';
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
  title: 'Components|CardSectionSimple',

  parameters: {
    ...readme.parameters,
  },
};

const cardElement = (
  <CTA
    heading="Nunc convallis lobortis"
    copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero."
    cta={{ href: 'https://www.example.com', copy: 'cta text here' }}></CTA>
);

const ctaElement = (
  <Card
    heading="Top level card link"
    cta={{ href: 'https://www.example.com' }}></Card>
);

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
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
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

export const SubComponents = ({ parameters }) => {
  const { heading, cards, cta } = parameters?.props?.CardSectionSimple ?? {};

  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return (
    <CardSectionSimple
      heading={heading}
      theme={theme}
      cards={cards}
      cta={cta}
    />
  );
};

SubComponents.story = {
  parameters: {
    knobs: {
      CardSectionSimple: ({ groupId }) => {
        const knobs = getBaseKnobs({ groupId });

        return {
          ...knobs,
          cards: Array.from({ length: 5 }).map(_ => cardElement),
          cta: ctaElement,
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
