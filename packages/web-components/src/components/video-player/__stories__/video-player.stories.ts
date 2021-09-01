/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, text } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../video-player-container';
import '../../lightbox-media-viewer/lightbox-video-player-container';

export const Default = ({ parameters }) => {
  const { caption, hideCaption, thumbnail, videoId } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}
    ></dds-video-player-container>
  `;
};

export const aspectRatio1x1 = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, thumbnail, videoId } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}
    ></dds-video-player-container>
  `;
};

export const aspectRatio4x3 = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, thumbnail, videoId } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}
    ></dds-video-player-container>
  `;
};

export const withLightboxMediaViewer = ({ parameters }) => {
  const { aspectRatio, caption, hideCaption, thumbnail, videoId } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}
      playing-mode="lightbox"
    >
    </dds-video-player-container>
    <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
  `;
};

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => {
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

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => {
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

withLightboxMediaViewer.story = {
  name: 'With lightbox media viewer',
  parameters: {
    knobs: {
      VideoPlayer: ({ groupId }) => {
        return {
          aspectRatio: '16x9',
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
  title: 'Components/Video player',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch" style="marginTop: 1rem">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        caption: text('Custom caption (caption):', '', groupId),
        hideCaption: boolean('Hide caption (hideCaption):', false, groupId),
        thumbnail: text('Custom thumbnail (thumbnail):', '', groupId),
        videoId: '1_9h94wo6b',
      }),
    },
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    percy: {
      skip: true,
    },
  },
};
