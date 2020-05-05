/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import cards from './data/cards.json';
import CardSection from '../CardSection';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|CardSection', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })

  .add('default', () => {
    const cardTypes = Object.keys(cards);
    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };
    const type = select('cardType', cardTypes, cardTypes[0]);
    const theme = select('theme', themes, themes.white);

    const cardsTitle =
      type === 'CardSectionSimple'
        ? 'Aliquam condimentum interdum'
        : 'Read more about it';

    const heading = text('Heading (required)', cardsTitle);
    const data = object(`Data (${type})`, cards[type]);

    cards[type] = data;

    const toggleCTA = boolean('cta', true);
    const cta = {
      heading: 'Top level card link',
      cta: {
        href: 'https://www.example.com',
      },
    };

    return (
      <CardSection
        heading={heading}
        theme={theme}
        cards={data}
        cta={toggleCTA && cta}
      />
    );
  });
