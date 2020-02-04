import './index.scss';

import { object, text, withKnobs } from '@storybook/addon-knobs';
import ContentItem from '../ContentItem';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|ContentItem', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const heading = text('Component title:', 'Lorem ipsum dolor sit amet.');
    const copy = text(
      'Component copy:',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.'
    );

    const image = {
      images: object('Image assets:', [
        { src: 'https://picsum.photos/id/2/288/144', minWidth: 'sm' },
        { src: 'https://picsum.photos/id/2/448/224', minWidth: 'md' },
        { src: 'https://picsum.photos/id/2/352/176', minWidth: 'lg' },
      ]),
      alt: text('alt', 'content item image'),
      defaultImage: text(
        'default image:',
        'https://picsum.photos/id/2/352/176'
      ),
    };
    return (
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            <ContentItem heading={heading} copy={copy} image={image} />
          </div>
        </div>
      </div>
    );
  });
