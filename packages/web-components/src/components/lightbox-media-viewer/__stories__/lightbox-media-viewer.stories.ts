/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import 'carbon-web-components/es/components/modal/modal-close-button.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../expressive-modal/expressive-modal';
import '../../expressive-modal/expressive-modal-close-button';
import '../lightbox-image-viewer';
import '../lightbox-video-player-container';
import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.mdx';

const images = {
  '512 x 512 (1:1)': 'https://fpoimg.com/512x512?text=1:1&bg_color=ee5396&text_color=161616',
  '1024 x 512 (2:1)': 'https://fpoimg.com/1024x512?text=2:1&bg_color=ee5396&text_color=161616',
  '1280 x 720 (16:9)': 'https://fpoimg.com/1280x720?text=16:9&bg_color=ee5396&text_color=161616',
  '3000 x 1200 (16:9)': 'https://fpoimg.com/3200x1200?text=16:9&bg_color=ee5396&text_color=161616',
  '200 x 750 (15:4)': 'https://fpoimg.com/200x750?text=15:4&bg_color=ee5396&text_color=161616',
  '600 x 550 (12:11)': 'https://fpoimg.com/600x550?text=12:11&bg_color=ee5396&text_color=161616',
};

export const Default = ({ parameters }) => {
  const { open, disableClose, onBeforeClose, onClose } = parameters?.props?.Modal ?? {};
  const { alt, defaultSrc, description, title } = parameters?.props?.LightboxImageViewer ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <dds-expressive-modal
      expressive-size="full-width"
      ?open="${open}"
      @dds-expressive-modal-beingclosed="${handleBeforeClose}"
      @dds-expressive-modal-closed="${onClose}"
    >
      <dds-expressive-modal-close-button></dds-expressive-modal-close-button>
      <dds-lightbox-image-viewer
        alt="${ifNonNull(alt)}"
        default-src="${ifNonNull(defaultSrc)}"
        description="${ifNonNull(description)}"
        title="${ifNonNull(title)}"
      >
      </dds-lightbox-image-viewer>
    </dds-expressive-modal>
  `;
};

Default.story = {
  parameters: {
    knobs: {
      LightboxImageViewer: ({ groupId }) => ({
        alt: textNullable('Image alt text (alt)', 'Image alt text', groupId),
        defaultSrc: select('Image (default-src)', images, images['1280 x 720 (16:9)'], groupId),
        description: textNullable(
          'Description (description)',
          `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.
            Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
          groupId
        ),
        title: textNullable('Title (title)', 'Curabitur malesuada varius mi eu posuere', groupId),
      }),
    },
  },
};

export const EmbeddedVideoPlayer = ({ parameters }) => {
  const { open, disableClose, onBeforeClose, onClose } = parameters?.props?.Modal ?? {};
  const { hideCaption, videoId } = parameters?.props?.LightboxVideoPlayerContainer ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <dds-lightbox-video-player-container
      ?hide-caption="${hideCaption}"
      ?open="${open}"
      video-id="${videoId}"
      @dds-expressive-modal-beingclosed="${handleBeforeClose}"
      @dds-expressive-modal-closed="${onClose}"
    >
    </dds-lightbox-video-player-container>
  `;
};

EmbeddedVideoPlayer.story = {
  parameters: {
    knobs: {
      LightboxVideoPlayerContainer: ({ groupId }) => ({
        hideCaption: boolean('hide caption (hide-caption)', false, groupId),
        videoId: textNullable('Video ID (video-id)', '1_9h94wo6b', groupId),
      }),
    },
  },
};

export default {
  title: 'Components/Lightbox media viewer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      Modal: ({ groupId }) => ({
        open: boolean('Open (open)', true, groupId),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in dds-expressive-modal-beingclosed event)',
          false,
          groupId
        ),
        onBeforeClose: action('dds-expressive-modal-beingclosed'),
        onClose: action('dds-expressive-modal-closed'),
      }),
    },
  },
};
