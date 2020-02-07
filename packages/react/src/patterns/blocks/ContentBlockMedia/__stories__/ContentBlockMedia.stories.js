import './index.scss';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import ContentBlockMedia from '../ContentBlockMedia';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Blocks)|ContentBlockMedia', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text(
      'heading (required)',
      'Curabitur malesuada varius mi eu posuere'
    );

    const copy = text(
      'copy (required)',
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
        Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
        nulla quis, consequat libero. Here are
        some common categories:
      `
    );

    const mediaGroup = [
      {
        title: 'Aliquam condimentum interdum',
        image: {
          uri: {
            sm: 'https://via.placeholder.com/640x320',
            md: 'https://via.placeholder.com/768x384',
            lg: 'https://via.placeholder.com/1024x512',
          },
          alt: 'Place Holder Image',
        },
        lists: [
          {
            title: 'Nunc convallis lobortis',
            copy:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          },
          {
            title: 'Interdum et malesuada',
            copy:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          },
        ],
        link: {
          href: 'https://www.example.com',
          title: 'Vivamus interdum ligula',
          target: '_self',
        },
      },
      {
        title: ' Vivamus interdum ligula',
        image: {
          uri: {
            sm: 'https://via.placeholder.com/640x320',
            md: 'https://via.placeholder.com/768x384',
            lg: 'https://via.placeholder.com/1024x512',
          },
          alt: 'Place Holder Image',
        },
        lists: [
          {
            title: 'Consectetur adipiscing elit',
            copy:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          },
          {
            title: 'Proin quis iaculis risus',
            copy:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          },
        ],
        link: {
          href: 'https://www.example.com',
          title: 'Lorem ipsum dolor sit',
          target: '_self',
        },
      },
      {
        title: 'Vivamus scelerisque orci at',
        image: {
          uri: {
            sm: 'https://via.placeholder.com/640x320',
            md: 'https://via.placeholder.com/768x384',
            lg: 'https://via.placeholder.com/1024x512',
          },
          alt: 'Place Holder Image',
        },
        lists: [
          {
            title: 'Convallis pretium molestie',
            copy:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
          },
          {
            title: 'Aliquam tincidunt diam sit',
            copy:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.',
            link: {
              href: 'https://www.example.com',
              title: 'Learn more',
              target: '_self',
            },
          },
        ],
        link: {
          href: 'https://www.example.com',
          title: 'Aliquam condimentum interdum',
          target: '_self',
        },
      },
    ];

    const featuredLink = object('FeaturedLink object', {
      heading: 'Card heading',
      card: {
        title: 'Featured Link title',
        href: 'https://ibm.com',
        image: {
          defaultImage: 'https://picsum.photos/id/2/672/672',
          alt: 'featured link image',
        },
      },
    });

    const themes = {
      g100: 'g100',
      white: '',
    };

    const withBorder = boolean('with border', true);

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlockMedia
          border={withBorder}
          copy={copy}
          theme={select('theme', themes, themes.white)}
          heading={heading}
          mediaGroup={object('mediaGroup', mediaGroup)}
          featuredLink={featuredLink}
        />
      </div>
    );
  });
