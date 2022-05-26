/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, text } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import React from 'react';
import inPercy from '@percy-io/in-percy';
import DDSVideoPlayerComposite from '../../../components-react/video-player/video-player-composite';
import DDSVideoPlayerContainer, { store } from '../../../components-react/video-player/video-player-container';
import readme from './README.stories.react.mdx';

const playingModes = {
  inline: 'inline',
  lightbox: 'lightbox',
};

export const Default = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, thumbnailUrl, customVideoDescription, videoId } =
    parameters?.props?.VideoPlayerComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return useMock ? (
    <DDSVideoPlayerComposite
      aspectRatio={aspectRatio}
      caption={caption}
      customVideoDescription={customVideoDescription}
      hideCaption={hideCaption}
      thumbnailUrl={thumbnailUrl}
      videoId={videoId}
      playingMode="inline"
    />
  ) : (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8">
          <DDSVideoPlayerContainer thumbnailUrl={thumbnailUrl} videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Components/Video Player',
  parameters: {
    ...readme.parameters,
    decorators: [story => <Provider store={store}>{story()}</Provider>],
    knobs: {
      VideoPlayerComposite: ({ groupId }) => ({
        caption: text('Custom caption (caption):', '', groupId),
        hideCaption: boolean('Hide caption (hideCaption):', false, groupId),
        thumbnailUrl: text('Custom thumbnail (thumbnail):', '', groupId),
        videoId: '1_9h94wo6b',
      }),
    },
    props: (() => {
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        VideoPlayerComposite: {
          thumbnail: '',
          videoId: '1_9h94wo6b',
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
