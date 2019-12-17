import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs';
import '@carbon/grid/scss/grid.scss';
import '../../../../../styles/scss/components/lightbox/_lightbox.scss';
import readme from '../README.md';
import { DDS_LIGHTBOX } from '../../../internal/FeatureFlags';

import Lightbox from '../Lightbox';

if (DDS_LIGHTBOX) {
  storiesOf('Lightbox', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const title = text(
        'title (required)',
        'Curabitur malesuada varius mi eu posuere'
      );

      const copy = text(
        'copy (required)',
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. 
        Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales 
        nulla quis, consequat libero. Here are 
        some common categories:
        `
      );
      const image = {
        uri: {
          sm: 'https://via.placeholder.com/640x320',
          md: 'https://via.placeholder.com/768x384',
          lg: 'https://via.placeholder.com/1024x512',
        },
        alt: 'Placeholder Image',
      };
      return (
        <Lightbox
          title={title}
          copy={copy}
          image={object('image', image)}
          open={boolean('open', true)}
          onClose={() => alert('<<< model closed >>>')}
        />
      );
    });
}
