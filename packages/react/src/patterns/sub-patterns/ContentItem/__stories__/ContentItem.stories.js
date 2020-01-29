import './index.scss';

import { object, text, withKnobs } from '@storybook/addon-knobs';
import ContentItem from '../ContentItem';
import { DDS_CONTENT_ITEM } from '../../../../internal/FeatureFlags';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_CONTENT_ITEM) {
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
      return <ContentItem heading={heading} copy={copy} image={image} />;
    });
}
