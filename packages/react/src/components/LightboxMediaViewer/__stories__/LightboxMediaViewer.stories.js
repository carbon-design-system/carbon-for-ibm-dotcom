import './index.scss';
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_LIGHTBOX_MEDIA_VIEWER } from '../../../internal/FeatureFlags';
import LightboxMediaViewer from '../LightboxMediaViewer';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_LIGHTBOX_MEDIA_VIEWER) {
  storiesOf('Components|LightboxMediaViewer', module)
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
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`
      );
      const image = {
        defaultSrc: 'https://via.placeholder.com/1024x512',
        alt: 'Placeholder Image',
      };

      return (
        <LightboxMediaViewer
          title={title}
          copy={copy}
          image={object('image', image)}
          open={boolean('open', true)}
        />
      );
    });
}
