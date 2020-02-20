import { select, text, withKnobs } from '@storybook/addon-knobs';
import ContentBlockSegmented from '../ContentBlockSegmented';
// import ContentGroupSimpleKnobs from '../../ContentGroupSimple/__stories__/data/ContentGroupSimple.knobs';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Blocks)|ContentBlockSegmented', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('Heading', 'Lorem ipsum dolor sit amet.');

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
    };

    const items = [
      {
        heading: 'Lorem ipsum dolor sit amet.',
        mediaData: {
          images: [
            { src: 'https://picsum.photos/id/2/320/160', minWidth: 320 },
            { src: 'https://picsum.photos/id/2/400/400', minWidth: 400 },
            { src: 'https://picsum.photos/id/2/672/672', minWidth: 672 },
          ],
          alt: 'lead space image',
          defaultImage: 'https://picsum.photos/id/2/672/672',
        },
        mediaType: 'image',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
        cta: {
          title: 'Lorem ipsum dolor',
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
        cta: {
          title: 'Lorem ipsum dolor',
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        mediaData: {
          images: [
            { src: 'https://picsum.photos/id/2/320/160', minWidth: 320 },
            { src: 'https://picsum.photos/id/2/400/400', minWidth: 400 },
            { src: 'https://picsum.photos/id/2/672/672', minWidth: 672 },
          ],
          alt: 'lead space image',
          defaultImage: 'https://picsum.photos/id/2/672/672',
        },
        mediaType: 'image',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
        cta: {
          title: 'Lorem ipsum dolor',
          href: 'https://www.example.com',
        },
      },
      {
        heading: 'Lorem ipsum dolor sit amet.',
        content: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.',
        },
      },
    ];

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlockSegmented
          copy={select('Copy (required)', copy, copy['single paragraph'])}
          heading={heading}
          items={items}
        />
      </div>
    );
  });
