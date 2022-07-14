/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cards from '../../CardGroup/__stories__/data/cards.js';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

const props = {
  default: () => ({
    heading: text('Heading (heading):', 'Aliquam condimentum interdum'),
    cards: cards.Simple,
  }),
  withCTA: () => ({
    ...props.default(),
    cta: {
      heading: 'Top level card link',
      cta: {
        href: 'https://www.example.com',
      },
    },
  }),
};

export default {
  title: 'Components/Card section simple',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = () => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return <CardSectionSimple {...props.default()} theme={theme} />;
};

export const WithCTA = () => {
  const theme =
    document.documentElement.getAttribute('storybook-carbon-theme') || 'white';
  return <CardSectionSimple {...props.withCTA()} theme={theme} />;
};

WithCTA.story = {
  parameters: {
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
