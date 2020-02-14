import { object, select, withKnobs } from '@storybook/addon-knobs';
import cards from './data/cards.json';
import CardSectionImages from '../CardSectionImages';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|CardSection - Images', module)
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
      <CardSectionImages
        heading="Read more about it"
        cards={object('Data', cards.imageCards)}
        theme={select('theme', themes, themes.g10)}
      />
    );
  });
