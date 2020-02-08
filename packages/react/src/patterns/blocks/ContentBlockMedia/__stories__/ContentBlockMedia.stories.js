import './index.scss';
import { object, select, withKnobs, text } from '@storybook/addon-knobs';
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
    const copy = {
      'single paragraph': `Lorem    ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, consequat libero. Here are
      some common categories:`,
      'multiple paragraphs': `   Lorem    ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, consequat libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
      'multiple paragraphs (styled)': `   __Lorem__    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. __Phasellus__ at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
      none: null,
    };

    const contentGroup = [
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

    const ctaProps = {
      type: 'local',
      heading: 'Lorem ipsum dolor sit amet',
      card: {
        href: 'https://ibm.com',
        title: 'Consectetur adipisicing elit',
        image: {
          defaultImage: 'https://picsum.photos/id/672/672',
          alt: 'featured card image',
        },
      },
    };

    const cta = {
      cta: ctaProps,
      none: null,
    };

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlockMedia
          copy={select('Copy (optional)', copy, copy['single paragraph'])}
          heading={text(
            'Heading (required)',
            'Curabitur malesuada varius mi eu posuere'
          )}
          contentGroup={object('contentGroup', contentGroup)}
          cta={select('Feature Link (optional)', cta, cta.cta)}
        />
      </div>
    );
  });
