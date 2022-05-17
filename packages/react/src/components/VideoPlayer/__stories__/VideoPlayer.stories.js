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

export default {
  title: 'Components|Video player',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = ({ parameters }) => {
  const {
    showCaption,
    aspectRatio,
    videoId,
    playingMode,
    caption,
    thumbnail,
    alt,
  } = parameters?.props?.VideoPlayer ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <VideoPlayer
            videoId={videoId}
            showCaption={showCaption}
            aspectRatio={aspectRatio}
            playingMode={playingMode}
            caption={caption}
            thumbnail={thumbnail}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: 'default',
        videoId: '1_9h94wo6b',
        playingMode: 'inline',
        caption: text('Custom caption (caption):', '', groupId),
        thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
        alt: text('Custom alt text (alt):', '', groupId),
      }),
    },
  },
};

export const aspectRatio1x1 = ({ parameters }) => (
  <Default parameters={parameters} />
);

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: '1x1',
        videoId: '1_9h94wo6b',
        playingMode: 'inline',
        caption: text('Custom caption (caption):', '', groupId),
        thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
        alt: text('Custom alt text (alt):', '', groupId),
      }),
    },
  },
};

export const aspectRatio4x3 = ({ parameters }) => (
  <Default parameters={parameters} />
);

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: '4x3',
        videoId: '1_9h94wo6b',
        playingMode: 'inline',
        caption: text('Custom caption (caption):', '', groupId),
        thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
        alt: text('Custom alt text (alt):', '', groupId),
      }),
    },
  },
};

export const withLightboxMediaViewer = ({ parameters }) => (
  <Default parameters={parameters} />
);

withLightboxMediaViewer.story = {
  name: 'With lightbox media viewer',
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        showCaption: boolean('Show caption (showCaption):', true, groupId),
        aspectRatio: 'default',
        videoId: '1_9h94wo6b',
        playingMode: 'lightbox',
        caption: text('Custom caption (caption):', '', groupId),
        thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
        alt: text('Custom alt text (alt):', '', groupId),
      }),
    },
  },
};
