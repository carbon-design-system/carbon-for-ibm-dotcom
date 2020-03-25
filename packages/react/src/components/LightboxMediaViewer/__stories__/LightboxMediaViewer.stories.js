import './index.scss';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
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
      const media = {
        src: 'https://dummyimage.com/1024x512/ee5396/161616&text=2:1',
        alt: 'Image alt text',
        title: text(
          'title (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        description: text(
          'description (required)',
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`
        ),
        type: 'image',
        active: false,
        srcThumb: 'https://dummyimage.com/1024x512/ee5396/161616&text=2:1',
      };

      return <LightboxMediaViewer media={media} open={boolean('open', true)} />;
    })
    .add('Embedded Video Player', () => {
      const media = {
        src: '0_uka1msg4',
        alt: 'Image alt text',
        title: text(
          'title (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        description: text(
          'description (required)',
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`
        ),
        type: 'video',
        active: false,
        srcThumb: '',
      };

      return <LightboxMediaViewer media={media} open={boolean('open', true)} />;
    });
}
