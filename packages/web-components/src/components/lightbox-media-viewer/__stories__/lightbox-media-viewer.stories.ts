/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
import '../lightbox-image-viewer';
import '../lightbox-video-player-container';
import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.mdx';

import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';
import imgMax16x9 from '../../../../../storybook-images/assets/1584/fpo--16x9--1312x738--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';

const images = {
  '720 x 720 (1:1)': imgLg1x1,
  '1312 x 656 (2:1)': imgXlg2x1,
  '1312 x 738 (16:9)': imgXlg16x9,
  '1584 x 738 (16:9)': imgMax16x9,
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
      mode="lightbox"
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
        defaultSrc: select('Image (default-src)', images, images['1312 x 656 (2:1)'], groupId),
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
    propsSet: {
      default: {
        LightboxImageViewer: {
          alt: 'Image alt text',
          defaultSrc: imgXlg2x1,
          description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.
            Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
          `,
          title: 'Curabitur malesuada varius mi eu posuere',
        },
      },
    },
  },
};

export const EmbeddedVideoPlayer = ({ parameters }) => {
  const { open, disableClose, onBeforeClose, onClose } = parameters?.props?.Modal ?? {};
  const { hideCaption, videoId, customVideoName, customVideoDescription } = parameters?.props?.LightboxVideoPlayerContainer ?? {};
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
      custom-video-name="${ifNonNull(customVideoName)}"
      custom-video-description="${ifNonNull(customVideoDescription)}"
      @dds-expressive-modal-beingclosed="${handleBeforeClose}"
      @dds-expressive-modal-closed="${onClose}"
    >
    </dds-lightbox-video-player-container>
  `;
};

EmbeddedVideoPlayer.story = {
  name: 'Embedded video player',
  parameters: {
    knobs: {
      LightboxVideoPlayerContainer: ({ groupId }) => ({
        hideCaption: boolean('hide caption (hide-caption)', false, groupId),
        videoId: textNullable('Video ID (video-id)', '1_9h94wo6b', groupId),
        customVideoName: textNullable('Video custom name', 'Custom video name', groupId),
        customVideoDescription: textNullable('Video custom description', 'This is a custom video description', groupId),
      }),
    },
    propsSet: {
      default: {
        LightboxVideoPlayerContainer: {
          hideCaption: false,
          videoId: '1_9h94wo6b',
          customVideoName: 'Custom video name',
          customVideoDescription: 'This is a custom video description',
        },
      },
    },
  },
};

Default.story = {
  parameters: {
    knobs: {
      LightboxImageViewer: ({ groupId }) => ({
        alt: textNullable('Image alt text (alt)', 'Image alt text', groupId),
        defaultSrc: select('Image (default-src)', images, images['1312 x 656 (2:1)'], groupId),
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
    propsSet: {
      default: {
        LightboxImageViewer: {
          alt: 'Image alt text',
          defaultSrc: imgXlg2x1,
          description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean et ultricies est.Mauris iaculis eget dolor nec hendrerit.
            Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            `,
          title: 'Curabitur malesuada varius mi eu posuere',
        },
      },
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
    propsSet: {
      default: {
        Modal: {
          open: true,
          disableClose: false,
          onBeforeClose: 'dds-expressive-modal-beingclosed',
          onClose: 'dds-expressive-modal-closed',
        },
      },
    },
  },
};
