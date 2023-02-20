/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgMax16x9 from '../../../../../storybook-images/assets/1584/fpo--16x9--1312x738--002.jpg';
import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';
import LightboxMediaViewer from '../LightboxMediaViewer';
import React from 'react';
import readme from '../README.stories.mdx';

const images = {
  '720 x 720 (1:1)': imgLg1x1,
  '1312 x 656 (2:1)': imgXlg2x1,
  '1312 x 738 (16:9)': imgXlg16x9,
  '1584 x 738 (16:9)': imgMax16x9,
};

const props = {
  default: () => ({
    open: boolean('open', true),
    media: {
      src: select('Image', images, images['1312 x 738 (16:9)']),
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
    },
  }),
  embeddedVideoPlayer: () => ({
    open: boolean('open', true),
    media: {
      src: '1_9h94wo6b',
      type: 'video',
      title: text(
        'title (optional)',
        'Curabitur malesuada varius mi eu posuere'
      ),
      description: text(
        'description (optional)',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`
      ),
    },
  }),
};

export default {
  title: 'Components/Lightbox media viewer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = (args) => {
  return (
    <LightboxMediaViewer
      {...(Object.keys(args).length > 0 ? args : props.default())}
    />
  );
};

Default.story = {
  parameters: {
    propsSet: {
      default: {
        LightboxMediaViewer: {
          media: {
            src: imgXlg16x9,
            alt: 'Image alt text',
            title: 'Curabitur malesuada varius mi eu posuere',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:',
            type: 'image',
          },
        },
      },
    },
  },
};

export const EmbeddedVideoPlayer = () => (
  <Default {...props.embeddedVideoPlayer()} />
);

EmbeddedVideoPlayer.story = {
  name: 'Embedded video player',
  parameters: {
    propsSet: {
      default: {
        LightboxMediaViewer: {
          media: {
            src: '1_9h94wo6b',
            type: 'video',
            title: 'Curabitur malesuada varius mi eu posuere',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`,
          },
        },
      },
    },
  },
};
