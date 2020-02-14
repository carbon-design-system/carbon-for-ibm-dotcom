import { object, select, withKnobs } from '@storybook/addon-knobs';
import cards from './data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|CardSection - Simple', module)
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
      g100: 'g100',
    };

    return (
      <CardSectionSimple
        heading="Aliquam condimentum interdum"
        cards={object('Data', cards.CardSectionSimple)}
        theme={select('theme', themes, themes.g10)}
      />
    );
  });
