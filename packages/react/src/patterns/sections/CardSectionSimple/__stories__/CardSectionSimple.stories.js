/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import cards from '../../../sub-patterns/CardGroup/__stories__/data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.md';

export default {
  title: 'Patterns (Sections)|CardSectionSimple',
  decorators: [withKnobs],

  parameters: {
    readme: {
      sidebar: readme,
    },
  },
};

export const Default = () => {
  const themes = {
    white: '',
    g10: 'g10',
    g90: 'g90',
    g100: 'g100',
  };
  const toggleCTA = boolean('cta', true);
  const cta = {
    heading: 'Top level card link',
    cta: {
      href: 'https://www.example.com',
    },
  };

  return (
    <CardSectionSimple
      heading={text('Heading (required):', 'Aliquam condimentum interdum')}
      theme={select('theme', themes, themes.white)}
      cards={object('Data', cards.Simple)}
      cta={toggleCTA && cta}
    />
  );
};
