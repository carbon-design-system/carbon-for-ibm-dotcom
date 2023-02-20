/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, videoId } = parameters?.props?.VideoPlayerContainer ?? {};
  return <DDSVideoPlayerContainer aspectRatio={aspectRatio} caption={caption} hideCaption={hideCaption} videoId={videoId} />;
};

export const aspectRatio1x1 = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, videoId } = parameters?.props?.VideoPlayerContainer ?? {};
  return <DDSVideoPlayerContainer aspectRatio={aspectRatio} caption={caption} hideCaption={hideCaption} videoId={videoId} />;
};

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    knobs: {
      VideoPlayerContainer: ({ groupId }) => {
        return {
          aspectRatio: '1x1',
          caption: text('Custom caption (caption):', '', groupId),
          hideCaption: boolean('Hide caption (hideCaption):', false, groupId),
          thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
          videoId: '1_9h94wo6b',
        };
      },
    },
  },
};

export const aspectRatio4x3 = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, videoId } = parameters?.props?.VideoPlayerContainer ?? {};
  return <DDSVideoPlayerContainer aspectRatio={aspectRatio} caption={caption} hideCaption={hideCaption} videoId={videoId} />;
};

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    knobs: {
      VideoPlayerContainer: ({ groupId }) => {
        return {
          aspectRatio: '4x3',
          caption: text('Custom caption (caption):', '', groupId),
          hideCaption: boolean('Hide caption (hideCaption):', false, groupId),
          thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
          videoId: '1_9h94wo6b',
        };
      },
    },
  },
};

export default {
  title: 'Components/Video Player',
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      VideoPlayerContainer: ({ groupId }) => ({
        caption: text('Custom caption (caption):', '', groupId),
        hideCaption: boolean('Hide caption (hideCaption):', false, groupId),
        thumbnailUrl: text('Custom thumbnail (thumbnail):', '', groupId),
        videoId: '1_9h94wo6b',
      }),
    },
  },
};
