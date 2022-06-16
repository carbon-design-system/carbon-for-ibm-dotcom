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
import inPercy from '@percy-io/in-percy';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import readme from './README.stories.react.mdx';

export const Default = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, thumbnailUrl, customVideoDescription, videoId } =
    parameters?.props?.VideoPlayerComposite ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8">
          <DDSVideoPlayerContainer
            aspectRatio={aspectRatio}
            caption={caption}
            hideCaption={hideCaption}
            thumbnailUrl={thumbnailUrl}
            customVideoDescription={customVideoDescription}
            videoId={videoId}
          />
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Components/Video Player',
  parameters: {
    ...readme.parameters,
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
