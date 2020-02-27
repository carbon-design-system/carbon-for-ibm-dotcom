import './index.scss';
import { text, withKnobs } from '@storybook/addon-knobs';
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
      cta: {
        href: 'https://www.example.com',
      },
      style: 'card',
      type: 'external',
      heading: 'Lorem ipsum dolor sit amet',
      copy: 'Lorem ipsum dolor sit ametttt',
    };

    const image = {
      images: [
        {
          src: 'https://dummyimage.com/320x180/ee5396/fff&text=16x9',
          minWidth: 'sm',
        },
        {
          src: 'https://dummyimage.com/400x225/ee5396/fff&text=16x9',
          minWidth: 'md',
        },
        {
          src: 'https://dummyimage.com/672x378/ee5396/fff&text=16x9',
          minWidth: 'lg',
        },
      ],
      alt: 'CTA image',
      defaultImage: 'https://dummyimage.com/672x378/ee5396/fff&text=16x9',
    };

    const copy = `   Lorem    ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
      `;

    return (
      <div className={`${prefix}--grid`}>
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentBlockSimple
              copy={copy}
              heading={text(
                'Heading (required)',
                'Curabitur malesuada varius mi eu posuere'
              )}
              image={image}
              cta={ctaProps}
            />
          </div>
        </div>
      </div>
    );
  });
