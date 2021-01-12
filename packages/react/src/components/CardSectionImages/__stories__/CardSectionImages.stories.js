/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CardSectionImages from '../CardSectionImages';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgXlg1x1 from '../../../../../storybook-images/assets/1312/fpo--1x1--1312x1312--001.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--003.jpg';
import imgXlg3x2 from '../../../../../storybook-images/assets/1312/fpo--3x2--874--004.jpg';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--002.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

const cards = [
  {
    image: {
      defaultSrc: imgXlg1x1,
      alt: 'Image alt text',
    },
    eyebrow: 'Topic',
    heading: 'Natural language processing.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultSrc: imgXlg4x3,
      alt: 'Image alt text',
    },
    eyebrow: 'Blog',
    heading: 'Natural language processing.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultSrc: imgXlg2x1,
      alt: 'Image alt text',
    },
    eyebrow: 'Topic',
    heading: 'Natural language processing.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultSrc: imgXlg3x2,
      alt: 'Image alt text',
    },
    eyebrow: 'Blog',
    heading: 'Serving society ethically in the age of Artificial Intelligence.',
    cta: {
      href: 'https://www.example.com',
    },
  },
  {
    image: {
      defaultSrc: imgXlg16x9,
      alt: 'Image alt text',
    },
    eyebrow: 'Topic',
    heading: 'Serving society ethically in the age of Artificial Intelligence.',
    cta: {
      href: 'https://www.example.com',
    },
  },
];

export default {
  title: 'Components|CardSectionImages',

  parameters: {
    ...readme.parameters,
    knobs: {
      CardSectionImages: ({ groupId }) => ({
        heading: text(
          'Heading (heading):',
          'Aliquam condimentum interdum',
          groupId
        ),
        cards: cards,
      }),
    },
    propsSet: {
      default: {
        CardSectionImages: {
          cards: cards,
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
