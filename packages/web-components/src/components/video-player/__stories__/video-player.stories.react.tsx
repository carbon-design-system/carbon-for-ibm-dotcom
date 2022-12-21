/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
// eslint-disable-next-line max-len
import DDSLightboxVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-video-player-container';
import readme from './README.stories.react.mdx';

export const Default = ({ caption, hideCaption, thumbnail, videoId }) => {
  return (
    <DDSVideoPlayerContainer
      playing-mode="inline"
      caption={caption}
      hideCaption={hideCaption}
      thumbnail={thumbnail}
      videoId={videoId}
    />
  );
};

export const aspectRatio1x1 = ({
  aspectRatio,
  caption,
  hideCaption,
  thumbnail,
  videoId,
}) => {
  return (
    <DDSVideoPlayerContainer
      aspectRatio={aspectRatio}
      caption={caption}
      hideCaption={hideCaption}
      thumbnail={thumbnail}
      videoId={videoId}
    />
  );
};

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  argTypes: {
    aspectRatio: {
      defaultValue: '1x1',
      table: {
        disable: true,
      },
    },
  },
};

export const aspectRatio4x3 = ({
  aspectRatio,
  caption,
  hideCaption,
  thumbnail,
  videoId,
}) => {
  return (
    <DDSVideoPlayerContainer
      aspectRatio={aspectRatio}
      caption={caption}
      hideCaption={hideCaption}
      thumbnail={thumbnail}
      videoId={videoId}
    />
  );
};

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  argTypes: {
    aspectRatio: {
      defaultValue: '4x3',
      table: {
        disable: true,
      },
    },
  },
};

export const withLightboxMediaViewer = ({
  aspectRatio,
  caption,
  hideCaption,
  thumbnail,
  videoId,
  customVideoDescription,
}) => {
  return (
    <>
      <DDSVideoPlayerContainer
        aspectRatio={aspectRatio}
        caption={caption}
        hideCaption={hideCaption}
        thumbnail={thumbnail}
        videoId={videoId}
        videoDescription={customVideoDescription}
        playingMode="lightbox"
      />
      <DDSLightboxVideoPlayerContainer></DDSLightboxVideoPlayerContainer>
    </>
  );
};

withLightboxMediaViewer.story = {
  name: 'With lightbox media viewer',
  argTypes: {
    customVideoDescription: {
      control: { type: 'text' },
      name: 'Custom video description',
      defaultValue: 'This is a custom video description.',
    },
  },
};

export default {
  title: 'Components/Video Player',
  decorators: [
    (story) => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8">{story()}</div>
        </div>
      </div>
    ),
  ],
  argTypes: {
    caption: {
      control: { type: 'text' },
      name: 'Custom caption (caption):',
      defaultValue: '',
      description: '',
    },
    hideCaption: {
      control: { type: 'boolean' },
      name: 'Hide caption (hideCaption):',
      defaultValue: false,
    },
    thumbnail: {
      control: { type: 'text' },
      name: 'Custom thumbnail (thumbnail):',
      defaultValue: '',
    },
    videoId: {
      defaultValue: '1_9h94wo6b',
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
  },
};
