/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text } from '@storybook/addon-knobs';
import LightboxMediaViewer from '../LightboxMediaViewer';
import React from 'react';
import readme from '../README.stories.mdx';

const images = {
  '512 x 512 (1:1)':
    'https://fpoimg.com/512x512?text=1:1&bg_color=ee5396&text_color=161616',
  '1024 x 512 (2:1)':
    'https://fpoimg.com/1024x512?text=2:1&bg_color=ee5396&text_color=161616',
  '1280 x 720 (16:9)':
    'https://fpoimg.com/1280x720?text=16:9&bg_color=ee5396&text_color=161616',
  '3000 x 1200 (16:9)':
    'https://fpoimg.com/3200x1200?text=16:9&bg_color=ee5396&text_color=161616',
  '200 x 750 (15:4)':
    'https://fpoimg.com/200x750?text=15:4&bg_color=ee5396&text_color=161616',
  '600 x 550 (12:11)':
    'https://fpoimg.com/600x550?text=12:11&bg_color=ee5396&text_color=161616',
};

export default {
  title: 'Components|LightboxMediaViewer',

  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = ({ parameters }) => {
  const { media, open } = parameters?.props?.LightboxMediaViewer ?? {};
  return <LightboxMediaViewer media={media} open={open} />;
};

Default.story = {
  parameters: {
    knobs: {
      LightboxMediaViewer: ({ groupId }) => ({
        open: boolean('open', true, groupId),
        media: {
          src: select('Image', images, images['1280 x 720 (16:9)'], groupId),
          alt: 'Image alt text',
          title: text(
            'title (required)',
            'Curabitur malesuada varius mi eu posuere',
            groupId
          ),
          description: text(
            'description (required)',
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`,
            groupId
          ),
          type: 'image',
        },
      }),
    },
    propsSet: {
      default: {
        LightboxMediaViewer: {
          media: {
            src:
              'https://fpoimg.com/1280x720?text=16:9&amp;bg_color=ee5396&amp;text_color=161616',
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

export const EmbeddedVideoPlayer = ({ parameters }) => (
  <Default parameters={parameters} />
);

EmbeddedVideoPlayer.story = {
  parameters: {
    knobs: {
      LightboxMediaViewer: ({ groupId }) => ({
        open: boolean('open', true, groupId),
        media: {
          src: '1_9h94wo6b',
          type: 'video',
          title: text(
            'title (optional)',
            'Curabitur malesuada varius mi eu posuere',
            groupId
          ),
          description: text(
            'description (optional)',
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:`,
            groupId
          ),
        },
      }),
    },
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
