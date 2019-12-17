import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, object } from '@storybook/addon-knobs';
import './index.scss';
import SimpleCards from '../SimpleCards';
import ImageCards from '../ImageCards';
import CardSection from '../CardSection';
import readme from '../README.md';
import { DDS_CARD_SECTION } from '../../../internal/FeatureFlags';

const cardsGroup = {
  simpleCards: [
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
  imageCards: [
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
      copy: 'Serving society ethically in the age of Artificial Intelligence.',
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
      copy: 'Serving society ethically in the age of Artificial Intelligence.',
      link: {
        href: 'https://www.example.com',
        text: 'Learn more',
        target: '_self',
      },
    },
  ],
};

if (DDS_CARD_SECTION) {
  storiesOf('CardSection', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })

    .add('default', () => {
      const cardTypes = {
        simpleCards: 'simpleCards',
        imageCards: 'imageCards',
      };
      const themes = {
        g10: 'g10',
        white: '',
      };

      const type = select('cardType', cardTypes, cardTypes.simpleCards);
      const dataObject = [];
      let title;

      if (type === 'simpleCards') {
        title = 'Aliquam condimentum interdum';
        dataObject.push(cardsGroup.simpleCards);
      }
      if (type === 'imageCards') {
        title = 'Read more about it';
        dataObject.push(cardsGroup.imageCards);
      }
      //  console.log('DATA OBJECT:', dataObject[0]);
      //  console.log('TYPE:', type);
      //  console.log('CARDTYPE OBJECT:',cardsGroup.simpleCards)

      return (
        <CardSection
          title={title}
          cards={dataObject[0]}
          Data={object('Data', dataObject[0])}
          theme={select('theme', themes, themes.g10)}
        />
      );
    })

    .add('SimpleCards', () => {
      const themes = {
        g10: 'g10',
        white: '',
      };

      return (
        <SimpleCards
          title="Aliquam condimentum interdum"
          cards={object('Data', cardsGroup.simpleCards)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    })

    .add('ImageCards', () => {
      const themes = {
        g10: 'g10',
        white: '',
      };

      return (
        <ImageCards
          title="Read more about it"
          cards={object('Data', cardsGroup.imageCards)}
          theme={select('theme', themes, themes.g10)}
        />
      );
    });
}
