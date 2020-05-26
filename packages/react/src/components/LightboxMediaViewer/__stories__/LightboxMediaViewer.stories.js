/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import LightboxMediaViewer from '../LightboxMediaViewer';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Components|LightboxMediaViewer',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = () => {
  const images = {
    '512 x 512 (1:1)': 'https://dummyimage.com/512x512/ee5396/161616&text=1:1',
    '1024 x 512 (2:1)':
      'https://dummyimage.com/1024x512/ee5396/161616&text=2:1',
    '1280 x 720 (16:9)':
      'https://dummyimage.com/1280x720/ee5396/161616&text=16:9',
    '3000 x 1200 (16:9)':
      'https://dummyimage.com/3000x1200/ee5396/161616&text=16:9',
    '200 x 750 (15:4)':
      'https://dummyimage.com/200x750/ee5396/161616&text=15:4',
    '600 x 550 (12:11)':
      'https://dummyimage.com/600x550/ee5396/161616&text=12:11',
  };

  const media = {
    src: select('Image', images, images['1280 x 720 (16:9)']),
    alt: 'Image alt text',
    title: text('title (required)', 'Curabitur malesuada varius mi eu posuere'),
    description: text(
      'description (required)',
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`
    ),
    type: 'image',
  };

  return <LightboxMediaViewer media={media} open={boolean('open', true)} />;
};

export const EmbeddedVideoPlayer = () => {
  const media = {
    src: '0_uka1msg4',
    type: 'video',
  };

  return <LightboxMediaViewer media={media} open={boolean('open', true)} />;
};
