import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_CARDS_WITHOUT_IMAGES } from '../../../internal/FeatureFlags';
import { withKnobs, select, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/cards-without-images/index.scss';
import CardsWithoutImages from '../CardsWithoutImages';
import readme from '../README.md';

if (DDS_CARDS_WITHOUT_IMAGES) {
  storiesOf('Cards without images', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const cardsGroup = [
        {
          title: 'Aliquam condimentum interdum',
          groupCard: {
            href: 'https://www.example.com',
            text: 'Nunc convallis',
            target: '_self',
          },
          cards: [
            {
              title: 'Nunc convallis lobortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Fusce gravida eu arcu',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Interdum et malesuada',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Nunc convallis loborti',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Nunc convallis lbortis',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
          ],
        },
        {
          title: ' Vivamus intedum ligula',
          groupCard: {
            href: 'https://www.example.com',
            text: 'Consectetur adipiscing',
            target: '_self',
          },
          cards: [
            {
              title: 'Conectetur adipiscing elit',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis euat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Proin quis iaculis rsus',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies at libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Sed vitae ligua ut',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              title: 'Sd vitae ligula ut',
              copy:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
          ],
        },
      ];

      const themes = {
        g10: 'g10',
        'light (white)': '',
      };

      return (
        <CardsWithoutImages
          cardsGroup={object('cardsGroup', cardsGroup)}
          theme={select('theme', themes, themes['g10'])}
        />
      );
    });
}
