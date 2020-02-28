import './index.scss';
import { object, select, withKnobs } from '@storybook/addon-knobs';
import CardKnobs from './data/CardKnobs';
import CardSection from '../CardSection';
import { DDS_CARD_SECTION } from '../../../../internal/FeatureFlags';
import ImageCards from '../ImageCards';
import React from 'react';
import readme from '../README.md';
import SimpleCards from '../SimpleCards';
import { storiesOf } from '@storybook/react';

if (DDS_CARD_SECTION) {
  storiesOf('Patterns (Sections)|CardSection', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })

    .add('default', () => {
      const cardTypes = Object.keys(CardKnobs);
      const themes = {
        white: '',
        g10: 'g10',
      };
      const type = select('cardType', cardTypes, cardTypes[0]);
      const theme = select('theme', themes, themes.g10);

      const cardsTitle =
        type === 'simpleCards'
          ? 'Aliquam condimentum interdum'
          : 'Read more about it';

      const data = object(`Data (${type})`, CardKnobs[type]);

      CardKnobs[type] = data;

      return (
        <CardSection
          title={cardsTitle}
          cards={CardKnobs[type]}
          data={data}
          theme={theme}
        />
      );
    })

    .add('CardSectionSimple', () => {
      const themes = {
        g10: 'g10',
        white: '',
      };

      return (
        <SimpleCards
          title="Aliquam condimentum interdum"
          cards={object('Data', CardKnobs.simpleCards)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    })

    .add('CardSectionImages', () => {
      const themes = {
        g10: 'g10',
        white: '',
      };

      return (
        <ImageCards
          title="Read more about it"
          cards={object('Data', CardKnobs.imageCards)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    });
}
