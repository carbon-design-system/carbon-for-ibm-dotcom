import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, object } from '@storybook/addon-knobs';
import './index.scss';
import CardsWithImages from '../CardsWithImages';
import CardsWithoutImages from '../CardsWithoutImages';
import CardSection from '../CardSection';
import readme from '../README.md';
import { DDS_CARDS_SECTION } from '../../../internal/FeatureFlags';

if (DDS_CARDS_SECTION) {
  storiesOf('CardSection', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const data = {
        imageCards: [
          {
            title: 'Read more about it',
            type: 'imageCards',
            groupCard: {
              href: 'https://www.example.com',
              target: '_self',
            },

            cards: [
              {
                imgSrc: 'http://picsum.photos/id/1003/1056/480',
                altText: 'cards with image',
                title: 'Topic',
                copy:
                  'Natural language processing Natural language processing.',
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
        ],
        simpleCards: [
          {
            title: 'Aliquam condimentum interdum',
            type: 'simpleCards',
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
            type: 'simpleCards',
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
        ],
      };

      const themes = {
        g10: 'g10',
        white: '',
      };

      const cardTypes = {
        simpleCards: 'simpleCards',
        imageCards: 'imageCards',
      };

      const type = select('cardType', cardTypes, cardTypes.simpleCards);

      return (
        <CardSection
          cardsGroup={data[type]}
          type={type}
          theme={select('theme', themes, themes.g10)}
        />
      );
    })
    .add('SimpleCards', () => {
      const cardsGroup = [
        {
          title: 'Aliquam condimentum interdum',
          type: 'simleCards',
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
          type: 'simleCards',
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
        white: '',
      };

      return (
        <CardsWithoutImages
          cardsGroup={object('cardsGroup', cardsGroup)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    })
    .add('ImageCards', () => {
      const cardsGroup = [
        {
          title: 'Read more about it',
          type: 'imageCards',
          groupCard: {
            href: 'https://www.example.com',
            target: '_self',
          },

          cards: [
            {
              imgSrc: 'http://picsum.photos/id/1003/1056/480',
              altText: 'cards with image',
              title: 'Topic',
              copy: 'Natural language processing Natural language processing.',
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
