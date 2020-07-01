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
  '512 x 512 (1:1)': 'https://dummyimage.com/512x512/ee5396/161616&text=1:1',
  '1024 x 512 (2:1)': 'https://dummyimage.com/1024x512/ee5396/161616&text=2:1',
  '1280 x 720 (16:9)':
    'https://dummyimage.com/1280x720/ee5396/161616&text=16:9',
  '3000 x 1200 (16:9)':
    'https://dummyimage.com/3000x1200/ee5396/161616&text=16:9',
  '200 x 750 (15:4)': 'https://dummyimage.com/200x750/ee5396/161616&text=15:4',
  '600 x 550 (12:11)':
    'https://dummyimage.com/600x550/ee5396/161616&text=12:11',
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
    props: {
      LightboxMediaViewer: {
        media: {
          src: 'https://dummyimage.com/1280x720/ee5396/161616&text=16:9',
          alt: 'Image alt text',
          title: 'Curabitur malesuada varius mi eu posuere',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Here are some common categories:',
          type: 'image',
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
          src: '0_uka1msg4',
          type: 'video',
        },
      }),
    },
    props: {
      LightboxMediaViewer: {
        media: {
          src: '0_uka1msg4',
          type: 'video',
        },
      },
    },
  },
};
