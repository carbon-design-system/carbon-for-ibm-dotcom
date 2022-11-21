/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import readme from '../README.stories.mdx';
import VideoPlayer from '../VideoPlayer';

const props = {
  default: () => ({
    showCaption: boolean('Show caption (showCaption):', true),
    aspectRatio: 'default',
    videoId: '1_9h94wo6b',
    playingMode: 'inline',
    caption: text('Custom caption (caption):', ''),
    thumbnail: text('Custom thumbnail (thumbnail):', ''),
    alt: text('Custom alt text (alt):', ''),
  }),
  aspectRatio1x1: () => ({
    showCaption: boolean('Show caption (showCaption):', true),
    aspectRatio: '1x1',
    videoId: '1_9h94wo6b',
    playingMode: 'inline',
    caption: text('Custom caption (caption):', ''),
    thumbnail: text('Custom thumbnail (thumbnail):', ''),
    alt: text('Custom alt text (alt):', ''),
  }),
  aspectRatio4x3: () => ({
    showCaption: boolean('Show caption (showCaption):', true),
    aspectRatio: '4x3',
    videoId: '1_9h94wo6b',
    playingMode: 'inline',
    caption: text('Custom caption (caption):', ''),
    thumbnail: text('Custom thumbnail (thumbnail):', ''),
    alt: text('Custom alt text (alt):', ''),
  }),
  withLightboxMediaViewer: () => ({
    showCaption: boolean('Show caption (showCaption):', true),
    aspectRatio: 'default',
    videoId: '1_9h94wo6b',
    playingMode: 'lightbox',
    caption: text('Custom caption (caption):', ''),
    thumbnail: text('Custom thumbnail (thumbnail):', ''),
    alt: text('Custom alt text (alt):', ''),
  }),
};

export default {
  title: 'Components/Video player',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = (args) => {
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <VideoPlayer
            {...(Object.keys(args).length > 0 ? args : props.default())}
          />
        </div>
      </div>
    </div>
  );
};

export const aspectRatio1x1 = () => <Default {...props.aspectRatio1x1()} />;

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
};

export const aspectRatio4x3 = () => <Default {...props.aspectRatio4x3()} />;

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
};

export const withLightboxMediaViewer = () => (
  <Default {...props.withLightboxMediaViewer()} />
);

withLightboxMediaViewer.story = {
  name: 'With lightbox media viewer',
};
