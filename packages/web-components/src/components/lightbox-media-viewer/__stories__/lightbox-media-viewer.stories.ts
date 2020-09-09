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
import '../../modal/modal';
import '../../modal/modal-close-button';
import '../lightbox-image-viewer';
import '../lightbox-video-player-container';
import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.mdx';

const images = {
  '512 x 512 (1:1)': 'https://dummyimage.com/512x512/ee5396/161616&text=1:1',
  '1024 x 512 (2:1)': 'https://dummyimage.com/1024x512/ee5396/161616&text=2:1',
  '1280 x 720 (16:9)': 'https://dummyimage.com/1280x720/ee5396/161616&text=16:9',
  '3000 x 1200 (16:9)': 'https://dummyimage.com/3000x1200/ee5396/161616&text=16:9',
  '200 x 750 (15:4)': 'https://dummyimage.com/200x750/ee5396/161616&text=15:4',
  '600 x 550 (12:11)': 'https://dummyimage.com/600x550/ee5396/161616&text=12:11',
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
    <dds-modal
      expressive-size="full-width"
      ?open="${open}"
      @dds-modal-beingclosed="${handleBeforeClose}"
      @dds-modal-closed="${onClose}"
    >
      <dds-modal-close-button></dds-modal-close-button>
      <dds-lightbox-image-viewer
        alt="${ifNonNull(alt)}"
        default-src="${ifNonNull(defaultSrc)}"
        description="${ifNonNull(description)}"
        title="${ifNonNull(title)}"
      >
      </dds-lightbox-image-viewer>
    </dds-modal>
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
      @dds-modal-beingclosed="${handleBeforeClose}"
      @dds-modal-closed="${onClose}"
    >
    </dds-lightbox-video-player-container>
  `;
};

EmbeddedVideoPlayer.story = {
  parameters: {
    knobs: {
      LightboxVideoPlayerContainer: ({ groupId }) => ({
        hideCaption: boolean('hide caption (hide-caption)', false, groupId),
        videoId: textNullable('Video ID (video-id)', '0_uka1msg4', groupId),
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
          'Disable user-initiated close action (Call event.preventDefault() in dds-modal-beingclosed event)',
          false,
          groupId
        ),
        onBeforeClose: action('dds-modal-beingclosed'),
        onClose: action('dds-modal-closed'),
      }),
    },
  },
};
