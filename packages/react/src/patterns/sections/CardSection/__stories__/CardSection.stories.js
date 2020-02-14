import './index.scss';
import { object, select, withKnobs } from '@storybook/addon-knobs';
import cards from './data/cards.json';
import CardSection from '../CardSection';
import React from 'react';
import readme from '../README.md';
import SimpleCards from '../SimpleCards';
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
      g100: 'g100',
    };
    const type = select('cardType', cardTypes, cardTypes[0]);
    const theme = select('theme', themes, themes.g10);

    const cardsTitle =
      type === 'CardSectionSimple'
        ? 'Aliquam condimentum interdum'
        : 'Read more about it';

    const data = object(`Data (${type})`, cards[type]);

    cards[type] = data;

    return (
      <CardSection
        heading={cardsTitle}
        cards={cards[type]}
        data={data}
        theme={theme}
      />
    );
  })

  .add('CardSectionSimple', () => {
    const themes = {
      white: '',
      g10: 'g10',
      g100: 'g100',
    };
    return (
      <SimpleCards
        heading="Aliquam condimentum interdum"
        cards={object('Data', cards.CardSectionSimple)}
        theme={select('theme', themes, themes.g10)}
      />
    );
  });
