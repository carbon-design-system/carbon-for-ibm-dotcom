/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import '../video-player-container';
import '../../lightbox-media-viewer/lightbox-video-player-container';

export const Default = ({ caption, hideCaption, thumbnail, videoId }) => html`
  <dds-video-player-container
    playing-mode="inline"
    video-id=${videoId}
    caption=${caption}
    ?hide-caption=${hideCaption}
    thumbnail=${thumbnail}></dds-video-player-container>
`;

Default.story = {
  name: 'Default',
  argTypes: {
    customVideoDescription: {
      table: {
        disable: true,
      },
    },
  },
};

export const aspectRatio1x1 = ({
  aspectRatio,
  caption,
  hideCaption,
  thumbnail,
  videoId,
}) => html`
  <dds-video-player-container
    playing-mode="inline"
    video-id=${videoId}
    aspect-ratio=${aspectRatio}
    caption=${caption}
    ?hide-caption=${hideCaption}
    thumbnail=${thumbnail}></dds-video-player-container>
`;

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  argTypes: {
    aspectRatio: {
      defaultValue: '1x1',
      table: {
        disable: true,
      },
    },
    customVideoDescription: {
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
}) =>
  html`
    <dds-video-player-container
      playing-mode="inline"
      video-id=${videoId}
      aspect-ratio=${aspectRatio}
      caption=${caption}
      ?hide-caption=${hideCaption}
      thumbnail=${thumbnail}></dds-video-player-container>
  `;

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  argTypes: {
    aspectRatio: {
      defaultValue: '4x3',
      table: {
        disable: true,
      },
    },
    customVideoDescription: {
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
}) => html`
  <dds-video-player-container
    video-id=${videoId}
    aspect-ratio=${aspectRatio}
    caption=${caption}
    video-description="${ifNonNull(customVideoDescription)}"
    ?hide-caption=${hideCaption}
    thumbnail=${thumbnail}
    playing-mode="lightbox">
  </dds-video-player-container>
  <dds-lightbox-video-player-container></dds-lightbox-video-player-container>
`;

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
  title: 'Components/Video player',
  component: 'dds-video-player-composite',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8">${story()}</div>
        </div>
      </div>
    `,
  ],
  argTypes: {
    caption: {
      control: { type: 'text' },
      name: 'Custom caption (caption):',
      defaultValue: '',
    },
    hideCaption: {
      control: { type: 'boolean' },
      name: 'Hide caption (hide-caption):',
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
    'auto-play': {
      table: {
        disable: true,
      },
    },
    'video-description': {
      table: {
        disable: true,
      },
    },
    isPlaying: {
      table: {
        disable: true,
      },
    },
    autoPlay: {
      table: {
        disable: true,
      },
    },
    embeddedVideos: {
      table: {
        disable: true,
      },
    },
    formatCaption: {
      table: {
        disable: true,
      },
    },
    formatDuration: {
      table: {
        disable: true,
      },
    },
    backgroundMode: {
      table: {
        disable: true,
      },
    },
    mediaData: {
      table: {
        disable: true,
      },
    },
    aspectRatio: {
      table: {
        disable: true,
      },
    },
    playingMode: {
      table: {
        disable: true,
      },
    },
    videoThumbnailWidth: {
      table: {
        disable: true,
      },
    },
    'hide-caption': {
      table: {
        disable: true,
      },
    },
    'background-mode': {
      table: {
        disable: true,
      },
    },
    'video-thumbnail-width': {
      table: {
        disable: true,
      },
    },
    'playing-mode': {
      table: {
        disable: true,
      },
    },
    'video-id': {
      table: {
        disable: true,
      },
    },
    'aspect-ratio': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    percy: {
      skip: true,
    },
  },
};
