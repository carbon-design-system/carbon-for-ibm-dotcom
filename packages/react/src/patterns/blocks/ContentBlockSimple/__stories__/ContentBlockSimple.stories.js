import './index.scss';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import ContentBlockSimple from '../ContentBlockSimple';
import React from 'react';
import readme from '../README.md';
import { settings } from 'carbon-components';
import { storiesOf } from '@storybook/react';

const { prefix } = settings;

storiesOf('Patterns (Blocks)|ContentBlockSimple', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const ctaProps = {
      style: 'card',
      type: 'external',
      title: 'Lorem ipsum dolor sit amet',
      href: 'https://www.ibm.com',
      copy: 'Lorem ipsum dolor sit ametttt',
    };

    const cta = {
      cta: ctaProps,
      none: null,
    };

    const image = {
      images: [
        {
          src: 'http://fpoimg.com/320x160?bg_color=0f62fe&text_color=ffffff',
          minWidth: 320,
        },
        {
          src: 'http://fpoimg.com/400x400?bg_color=0f62fe&text_color=ffffff',
          minWidth: 400,
        },
        {
          src: 'http://fpoimg.com/672x672?bg_color=0f62fe&text_color=ffffff',
          minWidth: 672,
        },
      ],
      alt: 'lead space image',
      defaultImage: 'https://picsum.photos/id/2/672/672',
    };

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
      'multiple paragraphs (styled)': `   Lorem    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `,
    };

    return (
      <div className={`${prefix}--grid`}>
        <ContentBlockSimple
          copy={select('Copy (required)', copy, copy['single paragraph'])}
          heading={text(
            'Heading (required)',
            'Curabitur malesuada varius mi eu posuere'
          )}
          image={image}
          cta={select('CTA (optional)', cta, cta.cta)}
        />
      </div>
    );
  });
