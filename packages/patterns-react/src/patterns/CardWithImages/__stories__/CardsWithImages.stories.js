import React from 'react';
import { storiesOf } from '@storybook/react';
import { DDS_CARDS_WITH_IMAGES } from '../../../internal/FeatureFlags';
import { withKnobs, select, object } from '@storybook/addon-knobs';
import '../../../../../styles/scss/patterns/cards-with-images/index.scss';
import CardsWithImages from '../CardsWithImages';
import readme from '../README.md';

if (DDS_CARDS_WITH_IMAGES) {
  storiesOf('Cards with images', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const cardsGroup = [
        {
          title: 'Read more about it',
          groupCard: {
            href: 'https://www.example.com',
            // text: 'Nunc convallis',
            target: '_self',
          },

          cards: [
            {
              imgSrc: 'http://picsum.photos/id/1003/1056/480',
              altText: 'cards with image',
              title: 'Topic',
              copy: 'Natural language processing.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              imgSrc: 'https://picsum.photos/id/1018/1056/480',
              altText: 'cards with image',
              title: 'Blog',
              copy: 'Natural language processing.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              imgSrc: 'https://picsum.photos/id/1076/1056/480',
              altText: 'cards with image',
              title: 'Topic',
              copy: 'Natural language processing.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              imgSrc: 'https://picsum.photos/id/102/1056/480',
              altText: 'cards with image',
              title: 'Blog',
              copy:
                'Serving society ethically in the age of Artificial Intelligence.',
              link: {
                href: 'https://www.example.com',
                text: 'Learn more',
                target: '_self',
              },
            },
            {
              imgSrc: 'https://picsum.photos/id/1032/1056/480',
              altText: 'cards with image',
              title: 'Topic',
              copy:
                'Serving society ethically in the age of Artificial Intelligence.',
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
        white: '',
      };

      return (
        <CardsWithImages
          cardsGroup={object('cardsGroup', cardsGroup)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    });
}
