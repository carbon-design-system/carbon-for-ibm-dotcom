/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, select, text, withKnobs } from '@storybook/addon-knobs';
import cards from '../../../sub-patterns/CardGroup/__stories__/data/cards.json';
import CardSectionImages from '../CardSectionImages';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|CardSectionImages', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })

  .add('Default', () => {
    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };

    return (
      <CardSectionImages
        heading={text('Heading (required):', 'Aliquam condimentum interdum')}
        theme={select('theme', themes, themes.white)}
        cards={object('Data', cards.Images)}
      />
    );
  });
